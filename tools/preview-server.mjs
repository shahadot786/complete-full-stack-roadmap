import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
export const clientDir = join(root, 'apps/web/build/client');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.data': 'application/json; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

export function createPreviewServer(port = 4173) {
  const server = createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = normalize(pathname).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]+/, '');
    let file = resolve(clientDir, relative);

    if (file !== clientDir && !file.startsWith(`${clientDir}${sep}`)) {
      response.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) {
      file = join(file, 'index.html');
    } else if (!existsSync(file) && !extname(file)) {
      const withSlash = join(file, 'index.html');
      if (existsSync(withSlash)) file = withSlash;
    }
    if (!existsSync(file)) file = join(clientDir, '404.html');

    const status = file.endsWith('404.html') ? 404 : 200;
    response.writeHead(status, {
      'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    createReadStream(file).pipe(response);
  });

  return new Promise((resolveReady) => {
    server.listen(port, '127.0.0.1', () => {
      const address = server.address();
      const activePort = typeof address === 'object' && address ? address.port : port;
      resolveReady({
        url: `http://127.0.0.1:${activePort}`,
        close: () => new Promise((done) => server.close(done)),
      });
    });
  });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const port = Number(process.env.PORT ?? 4173);
  const server = await createPreviewServer(port);
  console.log(`preview server ready — ${server.url}`);
}
