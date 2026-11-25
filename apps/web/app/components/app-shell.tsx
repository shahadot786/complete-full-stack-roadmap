import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router';
import { Logo, ProgressRing } from '@stackpath/ui';
import { roadmapIndex } from '../data/catalog';
import { progressSummary, useProgress } from '../lib/progress';

const navigation = [
  { to: '/roadmaps', key: 'nav.roadmaps' },
  { to: '/search', key: 'nav.search' },
  { to: '/progress', key: 'nav.progress' },
  { to: '/about', key: 'nav.about' },
  { to: '/contribute', key: 'nav.contribute' },
] as const;

function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const next =
      document.documentElement.dataset.theme === 'blueprint'
        ? 'paper'
        : 'blueprint';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('stackpath:theme', next);
    } catch {
      // Storage may be unavailable in private browsing; the toggle still works.
    }
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={toggle}
      className="inline-flex size-9 items-center justify-center rounded text-muted hover:bg-raised hover:text-ink"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
    </button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { state } = useProgress();
  const overall = progressSummary(state, roadmapIndex);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        navigate('/search?focus=1');
      }
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <header className="relative border-b border-line bg-canvas">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
          <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo label={t('brand.name')} />
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setOpen((value) => !value)}
            className="ms-auto inline-flex size-9 items-center justify-center rounded text-ink md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <nav
            id="site-nav"
            aria-label={t('a11y.mainNav')}
            className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-16 flex-col gap-1 border-b border-line bg-canvas p-4 md:static md:ms-8 md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:p-0`}
          >
            {navigation.map((item) => {
              const active =
                pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  title={
                    item.to === '/search'
                      ? t('a11y.searchShortcut')
                      : undefined
                  }
                  className={`border-b-2 pb-1 text-sm transition ${
                    active
                      ? 'border-accent text-accent-text'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {t(item.key)}
                  {item.to === '/search' && (
                    <kbd className="ms-2 hidden rounded border border-line px-1 font-mono text-xs text-muted lg:inline">
                      {t('a11y.searchShortcutKey')}
                    </kbd>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto hidden items-center gap-3 md:flex">
            <span
              aria-live="polite"
              className="inline-flex items-center gap-2 rounded border border-line px-2 py-1 font-mono text-xs text-muted"
            >
              <ProgressRing
                value={overall.percent}
                label={t('a11y.progressChip')}
              />
              <span className="hidden lg:inline">
                {`${overall.completed} of ${overall.total} · ${overall.percent}%`}
              </span>
            </span>
            <ThemeToggle label={t('common.toggleTheme')} />
            <a
              href="https://github.com/shahadot786/complete-full-stack-roadmap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-ink"
            >
              {t('common.github')}
            </a>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="mt-24 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>{t('common.license')}</span>
          <span className="font-display text-base normal-case tracking-normal text-ink">
            {t('brand.tagline')}
          </span>
          <span>{t('common.footerCredit')}</span>
        </div>
      </footer>
    </div>
  );
}
