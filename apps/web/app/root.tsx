import { useTranslation } from 'react-i18next';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { AppShell } from './components/app-shell';
import i18n from './i18n/i18n';
import { ProgressProvider } from './lib/progress';
import './app.css';

const themeScript = `try{var t=localStorage.getItem('stackpath:theme');if(t==='blueprint'||t==='paper')document.documentElement.dataset.theme=t}catch(e){}`;

export function meta() {
  return [
    { title: i18n.t('meta.siteTitle') },
    { name: 'description', content: i18n.t('meta.siteDescription') },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/instrument-serif-latin.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/geist-latin.woff2"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          {t('common.skipToContent')}
        </a>
        <ProgressProvider>
          <AppShell>{children}</AppShell>
        </ProgressProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const { t } = useTranslation();

  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl">{t('errors.boundaryTitle')}</h1>
      <p className="mt-4 text-muted">{t('errors.boundaryBody')}</p>
      <button
        type="button"
        className="mt-8 rounded-lg bg-accent px-4 py-2 text-white"
        onClick={() => window.location.reload()}
      >
        {t('errors.retry')}
      </button>
    </main>
  );
}
