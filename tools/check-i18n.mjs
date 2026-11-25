import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const locale = JSON.parse(
  readFileSync(join(root, 'apps/web/app/i18n/en.json'), 'utf8'),
);

const keys = new Set();
function collect(value, prefix = '') {
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child)) {
      collect(child, path);
    } else {
      keys.add(path);
    }
  }
}
collect(locale);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (/\.tsx?$/.test(path)) files.push(path);
  }
  return files;
}

const used = new Set();
const missing = [];
for (const file of walk(join(root, 'apps/web/app'))) {
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/(['"])([^'"\r\n]+)\1/g)) {
    const key = match[2];
    if (keys.has(key)) used.add(key);
  }
  for (const match of source.matchAll(/\bt\(\s*['"]([^'"]+)['"]/g)) {
    const key = match[1];
    if (!keys.has(key)) {
      missing.push(`${relative(root, file)}: ${key}`);
    }
  }
}

const unused = [...keys].filter((key) => !used.has(key));

if (missing.length > 0 || unused.length > 0) {
  if (missing.length > 0) {
    console.error('Missing translation keys:');
    for (const item of missing) console.error(`  ${item}`);
  }
  if (unused.length > 0) {
    console.error('Unused translation keys:');
    for (const key of unused) console.error(`  ${key}`);
  }
  process.exit(1);
}

console.log(`i18n ok: ${keys.size} keys, all used, none missing`);
