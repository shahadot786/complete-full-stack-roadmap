import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const publicDir = join(root, 'apps/web/public');
const ogDir = join(publicDir, 'og');
const siteUrl = (
  process.env.VITE_SITE_URL ??
  process.env.SITE_URL ??
  'https://stackpath.pages.dev'
).replace(/\/+$/, '');
const roadmaps = JSON.parse(
  readFileSync(join(root, 'packages/content/generated/roadmaps.json'), 'utf8'),
);

mkdirSync(ogDir, { recursive: true });

const staticPaths = [
  { path: '/', priority: '1.0' },
  { path: '/roadmaps', priority: '0.9' },
  { path: '/search', priority: '0.7' },
  { path: '/progress', priority: '0.6' },
  { path: '/about', priority: '0.4' },
  { path: '/contribute', priority: '0.4' },
];

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (char) => {
    const entities = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
    };
    return entities[char];
  });
}

const urls = [
  ...staticPaths,
  ...roadmaps.flatMap((roadmap) => [
    { path: `/roadmaps/${roadmap.slug}`, priority: '0.8' },
    ...roadmap.nodes.map((node) => ({
      path: `/roadmaps/${roadmap.slug}/${node.slug}`,
      priority: '0.5',
    })),
  ]),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
writeFileSync(
  join(publicDir, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=86400

/*.data
  Cache-Control: public, max-age=0, must-revalidate
`,
);

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
]
  .filter(Boolean)
  .find(existsSync);
if (!chrome) {
  console.log('site assets ok — Chrome not found, kept existing OG images');
  process.exit(0);
}

const port = 9227;
const profile = join(root, 'node_modules/.cache/chrome-og-assets');
mkdirSync(profile, { recursive: true });
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
    'about:blank',
  ],
  { stdio: 'ignore' },
);

async function waitForChrome() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const targets = await (
        await fetch(`http://127.0.0.1:${port}/json/list`)
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

async function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  let nextId = 1;
  await new Promise((res, rej) => {
    socket.addEventListener('open', res, { once: true });
    socket.addEventListener('error', rej, { once: true });
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message.result);
      pending.delete(message.id);
    }
  });
  return {
    send(method, params = {}) {
      return new Promise((done) => {
        const id = nextId;
        nextId += 1;
        pending.set(id, done);
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() {
      socket.close();
    },
  };
}

function ogHtml({ title, description, eyebrow, marker, stat, statLabel }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    html, body { margin: 0; height: 100%; }
    body {
      background: #f7f4ec;
      color: #1d1c19;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      padding: 64px 72px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .contour { position: absolute; inset: 0; opacity: 0.16; }
    .content { position: relative; z-index: 1; }
    .eyebrow { font: 600 20px/1 sans-serif; letter-spacing: 0.22em; color: #a83a22; text-transform: uppercase; }
    h1 { font: 400 82px/1.02 Georgia, serif; letter-spacing: -0.02em; margin: 26px 0 20px; max-width: 940px; }
    p { font: 400 24px/1.5 sans-serif; color: #54524b; max-width: 880px; margin: 0; }
    .footer { position: relative; z-index: 1; display: flex; align-items: center; gap: 24px; border-top: 2px solid #c8452d; padding-top: 24px; }
    .marker { width: 56px; height: 56px; border-radius: 10px; background: #c8452d; color: #fff; display: grid; place-items: center; font: 600 22px/1 monospace; }
    .brand { font: 400 30px/1 Georgia, serif; }
    .stat { margin-left: auto; text-align: right; }
    .stat strong { font: 600 26px/1 monospace; color: #c8452d; }
    .stat span { display: block; margin-top: 6px; font: 500 16px/1 sans-serif; letter-spacing: 0.14em; color: #54524b; text-transform: uppercase; }
  </style></head><body>
    <svg class="contour" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-40 500C160 380 300 560 520 430S860 250 1240 360" stroke="#c8452d" stroke-width="2"/>
      <path d="M-40 548C170 428 310 608 530 478S870 298 1240 408" stroke="#c8452d" stroke-width="2"/>
      <path d="M-40 596C180 476 320 656 540 526S880 346 1240 456" stroke="#c8452d" stroke-width="2"/>
    </svg>
    <div class="content">
      <div class="eyebrow">${escapeHtml(eyebrow)}</div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
    </div>
    <div class="footer">
      <div class="marker">${escapeHtml(marker)}</div>
      <div class="brand">StackPath</div>
      <div class="stat"><strong>${escapeHtml(stat)}</strong><span>${escapeHtml(statLabel)}</span></div>
    </div>
  </body></html>`;
}

function escapeHtml(value) {
  return value.replace(/[<>&]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char]);
}

function templatePath(html) {
  const path = join(profile, 'og-template.html');
  writeFileSync(path, html);
  return `file://${path}`;
}

try {
  const wsUrl = await waitForChrome();
  const cdp = await connect(wsUrl);
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
    mobile: false,
  });

  const pages = [
    {
      slug: 'default',
      eyebrow: 'The Field Atlas',
      title: 'Pick a path. Track it. Ship it.',
      description: 'Twelve learning expeditions drawn from a real, maintained roadmap library.',
      marker: 'SP',
      stat: '12',
      statLabel: 'expeditions',
    },
    ...roadmaps.map((roadmap) => ({
      slug: roadmap.slug,
      eyebrow: 'StackPath expedition',
      title: roadmap.title,
      description: roadmap.description,
      marker: roadmap.slug.slice(0, 2).toUpperCase(),
      stat: `${roadmap.nodes.length}`,
      statLabel: 'stops',
    })),
  ];

  for (const page of pages) {
    await cdp.send('Page.navigate', {
      url: templatePath(ogHtml(page)),
    });
    await new Promise((resolve) => setTimeout(resolve, 250));
    await cdp.send('Runtime.evaluate', {
      expression: 'document.fonts.ready',
      awaitPromise: true,
    });
    const { data } = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
      fromSurface: true,
    });
    writeFileSync(join(ogDir, `${page.slug}.png`), Buffer.from(data, 'base64'));
  }
  cdp.close();
  console.log(`site assets ok — sitemap, robots, headers and ${pages.length} OG images`);
} finally {
  child.kill();
}
