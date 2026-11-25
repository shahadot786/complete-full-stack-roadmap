import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const client = join(root, 'apps/web/build/client');
const source = join(client, '404', 'index.html');
const destination = join(client, '404.html');

if (!existsSync(source)) {
  console.error('prepare-static failed — missing prerendered /404 page');
  process.exit(1);
}

copyFileSync(source, destination);
console.log('prepare-static ok — 404.html written');
