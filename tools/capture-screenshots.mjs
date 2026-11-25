import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9223;
const url = process.argv[2] ?? 'http://127.0.0.1:5173/';
const outDir =
  process.argv[3] ?? 'docs/plans/roadmap-platform/screenshots';
const prefix = process.argv[4] ?? 'phase1';
const widths = [390, 768, 1440];

const profile = join(process.cwd(), 'node_modules/.cache/chrome-screenshot');
mkdirSync(profile, { recursive: true });
mkdirSync(outDir, { recursive: true });

const child = spawn(
  chrome,
  [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1440,900',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

async function waitForChrome() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error('Chrome did not start');
}

function connect(wsUrl, onError) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    const pending = new Map();
    let nextId = 1;

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.method === 'Runtime.exceptionThrown') {
        onError(message.params?.exceptionDetails?.text ?? 'runtime exception');
      }
      if (message.method === 'Log.entryAdded' && message.params?.entry?.level === 'error') {
        onError(message.params.entry.text);
      }
      if (message.id && pending.has(message.id)) {
        const { resolve: done, reject: fail } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) fail(new Error(message.error.message));
        else done(message.result);
      }
    });
    socket.addEventListener('open', () => {
      resolve({
        send(method, params = {}) {
          return new Promise((done, fail) => {
            const id = nextId;
            nextId += 1;
            pending.set(id, { resolve: done, reject: fail });
            socket.send(JSON.stringify({ id, method, params }));
          });
        },
        close() {
          socket.close();
        },
      });
    });
    socket.addEventListener('error', reject);
  });
}

const errors = [];

try {
  const wsUrl = await waitForChrome();
  const cdp = await connect(wsUrl, (message) => errors.push(message));
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');

  for (const width of widths) {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 768,
      screenWidth: width,
      screenHeight: 900,
    });
    await cdp.send('Page.navigate', { url });
    await cdp.send('Runtime.evaluate', {
      expression: "document.fonts.ready.then(() => document.readyState)",
      awaitPromise: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const metrics = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1');
        const nav = document.querySelector('#site-nav');
        const toggle = document.querySelector('[aria-controls="site-nav"]');
        return {
          viewport: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          title: document.title,
          h1: h1?.textContent,
          h1Width: Math.round(h1?.getBoundingClientRect().width ?? 0),
          navDisplay: nav ? getComputedStyle(nav).display : null,
          toggleDisplay: toggle ? getComputedStyle(toggle).display : null,
          bg: getComputedStyle(document.documentElement).backgroundColor,
          font: getComputedStyle(document.querySelector('h1')).fontFamily,
        };
      })()`,
      returnByValue: true,
    });
    console.log(width, JSON.stringify(metrics.result.value));
    const { data } = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      fromSurface: true,
    });
    const route = url
      .replace(/^https?:\/\/[^/]+/, '')
      .replace(/^\/|\/$/g, '')
      .replace(/[^a-z0-9]+/gi, '-')
      .toLowerCase();
    const path = join(outDir, `${prefix}-${route || 'home'}-${width}.png`);
    writeFileSync(path, Buffer.from(data, 'base64'));
    console.log(`saved ${path}`);
  }
  console.log('console errors', JSON.stringify(errors));
  cdp.close();
} finally {
  child.kill();
}
