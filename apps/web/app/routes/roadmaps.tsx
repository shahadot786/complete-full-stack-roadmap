import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Badge, Card, ProgressRing } from '@stackpath/ui';
import {
  roadmapIndex,
  roadmapStats,
  sourceUrl,
} from '../data/catalog';
import i18n from '../i18n/i18n';
import { completedFor, useProgress } from '../lib/progress';
import {
  JsonLd,
  roadmapsItemList,
} from '../components/json-ld';
import { pageMeta } from '../lib/meta';

const levelOptions = [
  { value: 'all', labelKey: 'roadmaps.filterAll' },
  { value: 'beginner', labelKey: 'common.beginner' },
  { value: 'intermediate', labelKey: 'common.intermediate' },
  { value: 'advanced', labelKey: 'common.advanced' },
  { value: 'mixed', labelKey: 'common.mixed' },
] as const;

export function meta() {
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: i18n.t('roadmaps.title') }),
    description: i18n.t('roadmaps.subtitle'),
    path: '/roadmaps',
  });
}

export default function Roadmaps() {
  const { t } = useTranslation();
  const { state } = useProgress();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [domain, setDomain] = useState('all');
  const [sort, setSort] = useState('recommended');

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = roadmapIndex.filter((entry) => {
      const matchesQuery =
        !needle ||
        entry.title.toLowerCase().includes(needle) ||
        entry.description.toLowerCase().includes(needle);
      const matchesLevel = level === 'all' || entry.level === level;
      const matchesDomain = domain === 'all' || entry.slug === domain;
      return matchesQuery && matchesLevel && matchesDomain;
    });

    if (sort === 'az') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === 'shortest') {
      return [...filtered].sort(
        (a, b) => a.estimatedWeeks - b.estimatedWeeks,
      );
    }
    return filtered;
  }, [query, level, domain, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <JsonLd
        values={[
          roadmapsItemList(
            roadmapIndex.map((entry) => ({
              title: entry.title,
              path: `/roadmaps/${entry.slug}`,
            })),
          ),
        ]}
      />
      <h1 className="font-display text-4xl sm:text-5xl">
        {t('roadmaps.title')}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{t('roadmaps.subtitle')}</p>

      <div className="mt-10 border-y border-line py-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('roadmaps.searchPlaceholder')}
            aria-label={t('roadmaps.searchPlaceholder')}
            className="h-10 flex-1 rounded border border-line bg-surface px-3 text-sm"
          />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label={t('roadmaps.sortRecommended')}
            className="h-10 rounded border border-line bg-surface px-3 text-sm"
          >
            <option value="recommended">{t('roadmaps.sortRecommended')}</option>
            <option value="az">{t('roadmaps.sortAZ')}</option>
            <option value="shortest">{t('roadmaps.sortShortest')}</option>
          </select>
        </div>

        <div
          role="group"
          aria-label={t('roadmaps.filterAll')}
          className="mt-5 flex flex-wrap gap-2"
        >
          {levelOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setLevel(option.value)}
              aria-pressed={level === option.value}
              className={`rounded border px-3 py-1 text-xs transition ${
                level === option.value
                  ? 'border-accent bg-active text-accent-text'
                  : 'border-line text-muted hover:text-ink'
              }`}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>

        <div
          role="group"
          aria-label={t('roadmaps.allDomains')}
          className="mt-3 flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setDomain('all')}
            aria-pressed={domain === 'all'}
            className={`rounded border px-3 py-1 text-xs transition ${
              domain === 'all'
                ? 'border-accent bg-active text-accent-text'
                : 'border-line text-muted hover:text-ink'
            }`}
          >
            {t('roadmaps.allDomains')}
          </button>
          {roadmapIndex.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              onClick={() => setDomain(entry.slug)}
              aria-pressed={domain === entry.slug}
              className={`rounded border px-3 py-1 text-xs transition ${
                domain === entry.slug
                  ? 'border-accent bg-active text-accent-text'
                  : 'border-line text-muted hover:text-ink'
              }`}
            >
              {entry.title}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-muted">{t('roadmaps.empty')}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((entry) => {
            const stats = roadmapStats(entry, completedFor(state, entry.slug));
            const resources = entry.resources;

            return (
              <Card
                key={entry.slug}
                rule={entry.status === 'full' ? 'accent' : 'ink'}
                className="flex h-full flex-col p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    tone={entry.status === 'full' ? 'accent' : 'outline'}
                  >
                    {entry.status === 'full'
                      ? t('common.full')
                      : t('common.outline')}
                  </Badge>
                  <ProgressRing
                    value={stats.percent}
                    label={`${entry.title} ${t('a11y.progressChip')}`}
                  />
                </div>
                <h2 className="mt-5 font-display text-2xl">{entry.title}</h2>
                <p className="mt-2 text-sm text-muted">{entry.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
                  <span>{t(`common.${entry.level}`)}</span>
                  <span>{t('common.weeks', { count: entry.estimatedWeeks })}</span>
                  <span>{t('common.topics', { count: stats.total })}</span>
                  <span>{t('common.resources', { count: resources })}</span>
                </div>
                <div className="mt-6 flex items-end justify-between gap-3 border-t border-line pt-4">
                  {entry.status === 'full' ? (
                    <>
                      <Link
                        to={`/roadmaps/${entry.slug}`}
                        className="text-sm text-accent-text underline underline-offset-4"
                      >
                        {t('roadmaps.openPath')}
                      </Link>
                      <a
                        href={sourceUrl(entry.sourceFolder)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('roadmaps.cardAria')} ${entry.title}`}
                        className="font-mono text-xs text-muted hover:text-accent-text"
                      >
                        {t('common.source')}
                        <span aria-label={t('common.externalLink')}> ↗</span>
                      </a>
                    </>
                  ) : (
                    <a
                      href={sourceUrl(entry.sourceFolder)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent-text underline underline-offset-4"
                    >
                      {t('roadmaps.openSource')}
                      <span aria-label={t('common.externalLink')}> ↗</span>
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
