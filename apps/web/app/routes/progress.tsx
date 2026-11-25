import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Card, Contour, ProgressRing, buttonClasses } from '@stackpath/ui';
import { RouteStrip } from '../components/route-strip';
import { JsonLd, webPage } from '../components/json-ld';
import { roadmaps, roadmapStats } from '../data/roadmaps';
import { roadmapIndex } from '../data/catalog';
import i18n from '../i18n/i18n';
import { pageMeta } from '../lib/meta';
import {
  completedFor,
  progressSummary,
  useProgress,
} from '../lib/progress';

export function meta() {
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: i18n.t('progress.title') }),
    description: i18n.t('progress.subtitle'),
    path: '/progress',
  });
}

export default function Progress() {
  const { t } = useTranslation();
  const { state, exportJson, importJson, reset } = useProgress();
  const [draft, setDraft] = useState('');
  const [exportedText, setExportedText] = useState('');
  const [messageKey, setMessageKey] = useState('');

  const summary = progressSummary(state, roadmapIndex);
  const completedTopics = roadmaps
    .flatMap((roadmap) =>
      Object.entries(state.completed[roadmap.slug] ?? {}).flatMap(
        ([topicId, date]) => {
          const node = roadmap.nodes.find((item) => item.id === topicId);
          return node ? [{ roadmap, node, date }] : [];
        },
      ),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  async function copyExport() {
    const json = exportJson();
    try {
      await navigator.clipboard.writeText(json);
      setExportedText('');
      setMessageKey('progress.exported');
    } catch {
      setExportedText(json);
      setMessageKey('progress.exportFailed');
    }
  }

  function importDraft() {
    const imported = importJson(draft);
    setMessageKey(
      imported ? 'progress.imported' : 'progress.importFailed',
    );
    if (imported) setDraft('');
  }

  function resetAll() {
    if (window.confirm(t('progress.resetConfirm'))) {
      reset();
      setDraft('');
      setExportedText('');
      setMessageKey('progress.resetDone');
    }
  }

  return (
    <div className="relative overflow-hidden">
      <JsonLd
        values={[
          webPage({
            title: t('meta.pageTitle', { title: t('progress.title') }),
            description: t('progress.subtitle'),
            path: '/progress',
          }),
        ]}
      />
      <Contour />
      <div className="relative mx-auto max-w-5xl px-6 py-16">
        <h1 className="font-display text-4xl sm:text-5xl">
          {t('progress.title')}
        </h1>
        <p className="mt-4 text-muted">{t('progress.subtitle')}</p>

        <Card rule="accent" className="mt-10 p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl">
                {t('progress.summaryTitle')}
              </h2>
              <p className="mt-2 text-muted">{t('progress.summaryBody')}</p>
            </div>
            <div aria-live="polite" className="flex items-center gap-4">
              <ProgressRing
                value={summary.percent}
                label={t('a11y.progressChip')}
              />
              <p className="font-display text-4xl">
                {`${summary.completed} / ${summary.total}`}
              </p>
            </div>
          </div>
        </Card>

        <section className="mt-12">
          <h2 className="font-display text-2xl">
            {t('progress.routesTitle')}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {roadmaps.map((roadmap) => {
              const routeCompleted = completedFor(state, roadmap.slug);
              const stats = roadmapStats(roadmap, routeCompleted);
              return (
                <Link
                  key={roadmap.slug}
                  to={`/roadmaps/${roadmap.slug}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4 hover:border-accent"
                >
                  <div>
                    <p className="font-medium">{roadmap.title}</p>
                    <RouteStrip
                      roadmap={roadmap}
                      completed={routeCompleted}
                      label={`${roadmap.title}: ${stats.completed} of ${stats.total}`}
                    />
                    <p className="mt-2 font-mono text-xs text-muted">
                      {`${stats.completed} of ${stats.total} · ${stats.percent}%`}
                    </p>
                  </div>
                  <ProgressRing
                    value={stats.percent}
                    label={roadmap.title}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl">
            {t('progress.completedTitle')}
          </h2>
          {completedTopics.length === 0 ? (
            <Card className="mt-6 p-8">
              <h3 className="font-display text-xl">
                {t('progress.emptyTitle')}
              </h3>
              <p className="mt-2 text-muted">{t('progress.emptyBody')}</p>
            </Card>
          ) : (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {completedTopics.map(({ roadmap, node, date }) => (
                <li key={`${roadmap.slug}:${node.id}`} className="py-3">
                  <Link
                    to={`/roadmaps/${roadmap.slug}/${node.slug}`}
                    className="text-sm font-medium text-accent-text underline underline-offset-4"
                  >
                    {node.title}
                  </Link>
                  <p className="font-mono text-xs text-muted">
                    {`${roadmap.title} · ${t('topic.completedAt', { date: date.slice(0, 10) })}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Card className="mt-12 p-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyExport}
              className={buttonClasses('secondary', 'sm')}
            >
              {t('progress.export')}
            </button>
            <button
              type="button"
              onClick={resetAll}
              className={buttonClasses('ghost', 'sm')}
            >
              {t('progress.reset')}
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="progress-import"
                className="font-mono text-xs uppercase tracking-widest text-muted"
              >
                {t('progress.pasteLabel')}
              </label>
              <textarea
                id="progress-import"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={5}
                className="mt-2 w-full rounded border border-line bg-surface p-3 font-mono text-xs"
              />
              <button
                type="button"
                onClick={importDraft}
                disabled={draft.trim().length === 0}
                className={`${buttonClasses('outline', 'sm')} mt-3`}
              >
                {t('progress.import')}
              </button>
            </div>
            {exportedText && (
              <textarea
                readOnly
                value={exportedText}
                rows={5}
                aria-label={t('progress.export')}
                className="w-full rounded border border-line bg-raised p-3 font-mono text-xs"
              />
            )}
          </div>
          <p role="status" className="mt-4 min-h-6 text-sm text-muted">
            {messageKey ? t(messageKey) : ''}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
            {t('progress.localNote')}
          </p>
        </Card>
      </div>
    </div>
  );
}
