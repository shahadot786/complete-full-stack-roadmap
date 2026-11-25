import { useTranslation } from 'react-i18next';
import {
  Link,
  useParams,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import { Badge, Card, Contour, NumberedMarker } from '@stackpath/ui';
import { getRoadmap, roadmapStats } from '../data/roadmaps';
import { roadmapIndex, sourceUrl } from '../data/catalog';
import i18n from '../i18n/i18n';
import { pageMeta } from '../lib/meta';
import { completedFor, useProgress } from '../lib/progress';
import {
  breadcrumbs,
  course,
  JsonLd,
} from '../components/json-ld';
import { stateMarkers, stateRules, statusFor } from '../components/topic-state';
import { RoadmapGraph } from '../components/roadmap-graph';

export function loader({ params }: LoaderFunctionArgs) {
  const roadmap = getRoadmap(params.slug);
  if (!roadmap) throw new Response('Not found', { status: 404 });
  return { slug: roadmap.slug };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const roadmap = getRoadmap(data?.slug);
  if (!roadmap || !data) return [];
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: roadmap.title }),
    description: roadmap.description,
    path: `/roadmaps/${roadmap.slug}`,
    image: `/og/${roadmap.slug}.png`,
    imageAlt: roadmap.title,
  });
};

export default function RoadmapRoute() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { state } = useProgress();
  const roadmap = getRoadmap(slug);
  if (!roadmap) return null;

  const completed = completedFor(state, roadmap.slug);
  const stats = roadmapStats(roadmap, completed);
  const numbers = new Map(
    roadmap.nodes.map((node, index) => [node.id, index + 1]),
  );
  const resources = new Set(
    roadmap.nodes.flatMap((node) => node.resources.map((resource) => resource.url)),
  ).size;
  const related = roadmapIndex
    .filter(
      (entry) => entry.status === 'full' && entry.slug !== roadmap.slug,
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd
        values={[
          course({
            title: roadmap.title,
            description: roadmap.description,
            path: `/roadmaps/${roadmap.slug}`,
          }),
          breadcrumbs([
            { name: t('nav.roadmaps'), path: '/roadmaps' },
            { name: roadmap.title, path: `/roadmaps/${roadmap.slug}` },
          ]),
        ]}
      />
      <section className="relative overflow-hidden border-b border-line">
        <Contour />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <Link to="/roadmaps" className="hover:text-accent-text">
              {t('nav.roadmaps')}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{t('roadmap.eyebrow')}</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone={roadmap.status === 'full' ? 'accent' : 'outline'}>
              {roadmap.status === 'full'
                ? t('common.full')
                : t('common.outline')}
            </Badge>
            <span className="font-mono text-xs text-muted">
              {`${stats.completed} of ${stats.total} · ${stats.percent}%`}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">
            {roadmap.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {roadmap.description}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
            {`${t('common.level')} · ${t(`common.${roadmap.level}`)} · ${t('common.time')} · ${t('common.weeks', { count: roadmap.estimatedWeeks })} · ${t('common.topics', { count: stats.total })} · ${t('common.levels', { count: roadmap.groups.length })}`}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
            <div>
              <p className="font-display text-2xl">{stats.total}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {t('common.topics', { count: stats.total })}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl">{resources}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {t('common.resources', { count: resources })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {roadmap.status === 'full' ? (
        <div className="mx-auto max-w-6xl px-6">
          <RoadmapGraph roadmap={roadmap} completed={completed} />
        </div>
      ) : (
        <section className="mx-auto max-w-6xl px-6 pt-12">
          <Card rule="ink" className="p-6">
            <h2 className="font-display text-2xl">{t('common.outline')}</h2>
            <p className="mt-2 text-muted">{t('roadmap.outlineNote')}</p>
            <a
              href={sourceUrl(roadmap.sourceFolder)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-accent-text underline underline-offset-4"
            >
              {t('roadmap.sourceCta')}
              <span aria-label={t('common.externalLink')}> ↗</span>
            </a>
          </Card>
        </section>
      )}

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl">
            {t('roadmap.itineraryTitle')}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            {t('roadmap.itineraryBody')}
          </p>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {roadmap.groups.map((group, groupIndex) => (
              <div key={group.id}>
                <div className="flex items-baseline gap-3 border-b border-line pb-3">
                  <NumberedMarker index={groupIndex + 1} />
                  <h3 className="font-display text-xl">{group.title}</h3>
                </div>
                <ol className="mt-4 space-y-3">
                  {roadmap.nodes
                    .filter((node) => node.groupId === group.id)
                    .map((node) => {
                      const status = statusFor(roadmap, node, completed);
                      return (
                        <li key={node.id}>
                          <Link
                            to={`/roadmaps/${roadmap.slug}/${node.slug}`}
                            className={`${stateRules[status]} flex items-center gap-3 rounded p-3 transition hover:brightness-95`}
                          >
                            <span
                              className={`font-mono text-xs ${stateMarkers[status]}`}
                              aria-hidden="true"
                            >
                              {status === 'completed'
                                ? '✓'
                                : status === 'current'
                                  ? '→'
                                  : '○'}
                            </span>
                            <span className="flex-1 text-sm">
                              {node.title}
                            </span>
                            <span className="font-mono text-xs text-muted">
                              {String(numbers.get(node.id) ?? 0).padStart(2, '0')}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl">{t('roadmap.relatedTitle')}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((entry) => (
            <Card key={entry.slug} rule="ink" className="p-6">
              <Badge tone="accent">{t('common.full')}</Badge>
              <h3 className="mt-4 font-display text-xl">{entry.title}</h3>
              <Link
                to={`/roadmaps/${entry.slug}`}
                className="mt-4 inline-block text-sm text-accent-text underline underline-offset-4"
              >
                {t('roadmaps.openPath')}
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
