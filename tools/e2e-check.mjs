import { spawn } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createPreviewServer } from './preview-server.mjs';

const root = new URL('../', import.meta.url).pathname;
const candidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chrome = candidates.find((path) => {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
});
if (!chrome) {
  console.error('e2e check failed — set CHROME_PATH to a Chrome/Chromium binary');
  process.exit(1);
}

const cdpPort = Number(process.env.E2E_CDP_PORT ?? 9333);
const profile = join(root, 'node_modules/.cache/chrome-e2e');
mkdirSync(profile, { recursive: true });
const preview = await createPreviewServer(Number(process.env.PORT ?? 0));
const browser = spawn(
  chrome,
  [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1440,900',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

async function connect() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const targets = await (
        await fetch(`http://127.0.0.1:${cdpPort}/json/list`)
      ).json();
      const page = targets.find((target) => target.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error('Chrome did not start');
}

let cdp;
try {
  const socket = new WebSocket(await connect());
  const pending = new Map();
  const consoleErrors = [];
  let nextId = 1;
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(' '));
    }
    if (message.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(message.params.exceptionDetails.text);
    }
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });
  cdp = {
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = nextId;
        nextId += 1;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close: () => socket.close(),
  };

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  const evaluate = async (expression) => {
    const result = await cdp.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const setViewport = (width, height, mobile = false) =>
    cdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile,
    });
  const settle = () => new Promise((resolve) => setTimeout(resolve, 250));
  const navigate = async (path) => {
    await cdp.send('Page.navigate', { url: `${preview.url}${path}` });
    await evaluate(
      'document.fonts.ready.then(() => new Promise(resolve => requestAnimationFrame(() => resolve(document.readyState))))',
    );
    await settle();
  };
  const clickText = (text) =>
    evaluate(`(() => {
      const button = [...document.querySelectorAll('button')].find(
        element => element.textContent?.trim() === ${JSON.stringify(text)},
      );
      if (!button) return false;
      button.click();
      return true;
    })()`);
  const headerText = () =>
    evaluate(`document.querySelector('header')?.textContent?.replace(/\\s+/g, ' ').trim()`);

  const checks = {};

  await setViewport(1440, 900);
  await navigate('/');
  await evaluate('localStorage.clear()');
  await navigate('/');
  checks.discovery = await evaluate(
    `document.title.includes('StackPath') &&
      [...document.querySelectorAll('a')].some(anchor => (anchor.getAttribute('href') ?? '').startsWith('/roadmaps/'))`,
  );
  checks.skipLinkFirst = await evaluate(
    `document.querySelector('a[href="#main"]')?.textContent?.trim() === 'Skip to content'`,
  );

  await navigate('/roadmaps/frontend/');
  checks.graphNodes = await evaluate(
    `document.querySelectorAll('[data-graph-node]').length >= 10`,
  );
  await evaluate(`document.querySelector('[data-graph-node]')?.focus()`);
  const focusedBefore = await evaluate(
    `document.activeElement?.getAttribute('data-graph-node')`,
  );
  for (const type of ['keyDown', 'keyUp']) {
    await cdp.send('Input.dispatchKeyEvent', {
      type,
      key: 'ArrowRight',
      code: 'ArrowRight',
      windowsVirtualKeyCode: 39,
      nativeVirtualKeyCode: 39,
    });
  }
  checks.graphArrowKey = Boolean(focusedBefore) &&
    (await evaluate(`document.activeElement?.getAttribute('data-graph-node')`)) !== focusedBefore;

  await navigate('/roadmaps/frontend/html-css/');
  const chipBefore = await headerText();
  checks.completeClicked = await clickText('Mark complete');
  await settle();
  const chipAfter = await headerText();
  const stored = await evaluate(`localStorage.getItem('stackpath:progress:v1')`);
  checks.progressChipUpdated = chipBefore !== chipAfter;
  checks.progressPersisted = Boolean(stored?.includes('html-css'));

  await navigate('/roadmaps/frontend/html-css/');
  checks.reloadKeepsState =
    (await evaluate(
      `[...document.querySelectorAll('button')].some(button => button.textContent?.trim() === 'Undo completion')`,
    )) && (await headerText()) === chipAfter;

  await navigate('/progress/');
  checks.progressListsTopic = await evaluate(
    `document.querySelector('main')?.textContent?.includes('HTML5')`,
  );

  await navigate('/');
  await evaluate('localStorage.clear()');
  await navigate('/progress/');
  await evaluate(`(() => {
    const field = document.querySelector('#progress-import');
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
    setter.call(field, ${JSON.stringify(stored)});
    field.dispatchEvent(new Event('input', { bubbles: true }));
  })()`);
  await settle();
  checks.importClicked = await clickText('Import progress');
  await settle();
  checks.importRestored = await evaluate(
    `localStorage.getItem('stackpath:progress:v1')?.includes('html-css')`,
  );

  await navigate('/search/?q=html5');
  checks.searchDeepLink = await evaluate(
    `document.querySelector('input[type="search"]')?.value === 'html5' &&
      document.querySelectorAll('li a').length > 0`,
  );

  await setViewport(390, 844, true);
  await navigate('/roadmaps/frontend/');
  checks.mobileNoOverflow = await evaluate(
    `document.documentElement.scrollWidth <= window.innerWidth`,
  );
  await setViewport(1440, 900);

  const notFoundResponse = await fetch(`${preview.url}/definitely-not-a-route`);
  await navigate('/definitely-not-a-route');
  checks.notFoundPage =
    notFoundResponse.status === 404 &&
    (await evaluate(`document.body.textContent?.includes('Off the map')`));
  checks.noConsoleErrors = consoleErrors.length === 0;

  console.log(JSON.stringify({ checks, consoleErrors }, null, 2));
  if (Object.values(checks).some((value) => value !== true)) process.exitCode = 1;
} finally {
  cdp?.close();
  browser.kill();
  await preview.close();
}
