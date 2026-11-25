import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { Badge, Card } from '@stackpath/ui';
import { roadmaps } from '../data/roadmaps';
import { SearchResults } from '../features/search/search-results';
import { JsonLd, webPage } from '../components/json-ld';
import i18n from '../i18n/i18n';
import { pageMeta } from '../lib/meta';
import { buildSearchIndex, searchIndex, type SearchType } from '../lib/search';

const STORAGE_KEY = 'stackpath:recent-searches';
const index = buildSearchIndex(roadmaps);
const filters: Array<{ value: SearchType | 'all'; labelKey: string }> = [
  { value: 'all', labelKey: 'search.filterAll' },
  { value: 'roadmap', labelKey: 'search.typeRoadmap' },
  { value: 'topic', labelKey: 'search.typeTopic' },
  { value: 'resource', labelKey: 'search.typeResource' },
];

function readRecent(): string[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

export function meta() {
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: i18n.t('search.title') }),
    description: i18n.t('search.subtitle'),
    path: '/search',
  });
}

export default function Search() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [type, setType] = useState<SearchType | 'all'>('all');
  const [recent, setRecent] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sharedQuery = searchParams.get('q') ?? '';
    setQuery(sharedQuery);
    setDebounced(sharedQuery);
  }, [searchParams]);

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query), 200);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (searchParams.get('focus') === '1') input.current?.focus();
  }, [searchParams]);

  const results = useMemo(
    () => searchIndex(index, debounced, type),
    [debounced, type],
  );

  function submit(value: string) {
    const next = [value, ...recent.filter((item) => item !== value)].slice(0, 5);
    setRecent(next);
    setSearchParams({ q: value });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage may be unavailable; recent searches are optional.
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        values={[
          webPage({
            title: t('meta.pageTitle', { title: t('search.title') }),
            description: t('search.subtitle'),
            path: '/search',
          }),
        ]}
      />
      <h1 className="font-display text-4xl sm:text-5xl">{t('search.title')}</h1>
      <p className="mt-4 text-muted">{t('search.subtitle')}</p>

      <form
        className="mt-10"
        onSubmit={(event) => {
          event.preventDefault();
          if (query.trim()) submit(query.trim());
        }}
      >
        <input
          ref={input}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          aria-label={t('search.placeholder')}
          className="h-12 w-full rounded border border-line bg-surface px-4 text-base"
        />
      </form>

      <div
        role="group"
        aria-label={t('search.filterAll')}
        className="mt-5 flex flex-wrap gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setType(filter.value)}
            aria-pressed={type === filter.value}
            className={`rounded border px-3 py-1 text-xs transition ${
              type === filter.value
                ? 'border-accent bg-active text-accent-text'
                : 'border-line text-muted hover:text-ink'
            }`}
          >
            {t(filter.labelKey)}
          </button>
        ))}
      </div>

      {recent.length > 0 && (
        <div className="mt-8">
          <Badge tone="outline">{t('search.recentTitle')}</Badge>
          <div className="mt-3 flex flex-wrap gap-2">
            {recent.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className="rounded border border-line px-3 py-1 font-mono text-xs text-muted hover:text-accent-text"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        {debounced.trim() ? (
          <>
            <h2 className="font-display text-2xl">
              {t(
                results.length === 1
                  ? 'search.resultsTitleOne'
                  : 'search.resultsTitle',
                { count: results.length },
              )}
            </h2>
            {results.length === 0 ? (
              <Card className="mt-6 p-8">
                <h3 className="font-display text-xl">
                  {t('search.noResultsTitle')}
                </h3>
                <p className="mt-2 text-muted">{t('search.noResultsBody')}</p>
              </Card>
            ) : (
              <div className="mt-6">
                <SearchResults results={results} query={debounced} />
              </div>
            )}
          </>
        ) : (
          <Card className="p-8">
            <h2 className="font-display text-2xl">{t('search.emptyTitle')}</h2>
            <p className="mt-2 text-muted">{t('search.emptyBody')}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
