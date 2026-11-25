import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = fileURLToPath(new URL('../', import.meta.url));
const client = join(root, 'apps/web/build/client');
const budgetBytes = 150 * 1024;
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function htmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(path, files);
    else if (entry.name === 'index.html') files.push(path);
  }
  return files;
}

const pages = htmlFiles(client).filter(
  (page) => !page.endsWith('/404/index.html'),
);
check(pages.length >= 150, `expected at least 150 prerendered pages, got ${pages.length}`);
const notFound = readFileSync(join(client, '404.html'), 'utf8');
const notFoundCanonical = notFound.match(
  /<link rel="canonical" href="([^"]+)"/,
)?.[1];
check(
  notFoundCanonical?.endsWith('/404') && notFoundCanonical.startsWith('https://'),
  'missing canonical on the static 404 page',
);

const home = readFileSync(join(client, 'index.html'), 'utf8');
const scriptPaths = [
  ...home.matchAll(/href="([^"]+\.js)"/g),
  ...home.matchAll(/src="([^"]+\.js)"/g),
].map((match) => match[1]);
let initialJs = 0;
for (const path of new Set(scriptPaths)) {
  const file = join(client, path.replace(/^\//, ''));
  initialJs += gzipSync(readFileSync(file)).length;
}
check(initialJs <= budgetBytes, `initial JS ${initialJs} exceeds ${budgetBytes} bytes gzip`);

const expectedAssets = [
  'robots.txt',
  'sitemap.xml',
  'favicon.svg',
  'favicon.ico',
  '_headers',
  'og/default.png',
  'og/frontend.png',
  'og/backend.png',
  'og/devops.png',
  'fonts/geist-latin.woff2',
  'fonts/geist-mono-latin.woff2',
  'fonts/instrument-serif-latin.woff2',
];
for (const asset of expectedAssets) {
  check(statSync(join(client, asset)).size > 0, `missing or empty ${asset}`);
}

const sitemap = readFileSync(join(client, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
check(sitemapUrls.length === pages.length, `sitemap has ${sitemapUrls.length} URLs for ${pages.length} pages`);
check(
  sitemapUrls.every((url) => url.startsWith('https://')),
  'sitemap contains a non-HTTPS URL',
);

const samplePaths = [
  '',
  'roadmaps',
  'roadmaps/frontend',
  'roadmaps/frontend/html-css',
  'search',
  'progress',
  'about',
  'contribute',
];
for (const path of samplePaths) {
  const html = readFileSync(join(client, path, 'index.html'), 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  check(Boolean(canonical), `missing canonical on /${path}`);
  check(
    html.includes('<meta property="og:title"'),
    `missing Open Graph title on /${path}`,
  );
  check(
    html.includes('<meta name="twitter:card"'),
    `missing Twitter card on /${path}`,
  );
  check(
    html.includes('application/ld+json'),
    `missing structured data on /${path}`,
  );
  check(
    !html.includes('<link rel="canonical" href="http://'),
    `non-HTTPS canonical on /${path}`,
  );
  check(html.includes('rel="icon"'), `missing favicon on /${path}`);
  check(!html.includes('"mode":"lazy"'), `lazy route discovery on /${path}`);
}

const og = readFileSync(join(client, 'og/frontend.png'));
check(og.subarray(1, 4).toString() === 'PNG', 'OG image is not a PNG');

const targets = new Set(
  pages.map((page) => `/${relative(client, dirname(page)).replace(/\/$/, '')}`),
);
const internal = new Set();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    internal.add(match[1].replace(/\/$/, '') || '/');
  }
}
for (const href of internal) {
  if (
    href.startsWith('/assets/') ||
    href.startsWith('/fonts/') ||
    href.startsWith('/og/') ||
    href === '/favicon.ico' ||
    href === '/favicon.svg'
  ) {
    continue;
  }
  check(targets.has(href), `broken internal link in built output: ${href}`);
}

if (failures.length > 0) {
  console.error(`site check failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(
  `site check ok — ${pages.length} pages, ${sitemapUrls.length} sitemap URLs, ${internal.size} internal targets, ${(initialJs / 1024).toFixed(1)} KiB initial JS`,
);
