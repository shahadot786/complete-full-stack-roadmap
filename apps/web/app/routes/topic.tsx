import { useTranslation } from 'react-i18next';
import {
  Link,
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import { Badge, Card, Contour, buttonClasses } from '@stackpath/ui';
import {
  getGroup,
  getRoadmap,
  getTopic,
  groupResources,
  topicPosition,
} from '../data/roadmaps';
import { sourceUrl } from '../data/catalog';
import i18n from '../i18n/i18n';
import { pageMeta } from '../lib/meta';
import {
  completedFor,
  useProgress,
} from '../lib/progress';
import {
  breadcrumbs,
  JsonLd,
  topicCourse,
} from '../components/json-ld';
import { TopicStateBadge, statusFor } from '../components/topic-state';

const resourceTypeKeys = {
  doc: 'topic.resourceTypes.doc',
  video: 'topic.resourceTypes.video',
  book: 'topic.resourceTypes.book',
  course: 'topic.resourceTypes.course',
  practice: 'topic.resourceTypes.practice',
  tool: 'topic.resourceTypes.tool',
} as const;

export function loader({ params }: LoaderFunctionArgs) {
  const roadmap = getRoadmap(params.slug);
  const node = roadmap ? getTopic(roadmap, params.topicSlug) : undefined;
  if (!roadmap || !node) throw new Response('Not found', { status: 404 });
  return { slug: roadmap.slug, topicSlug: node.slug };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const roadmap = getRoadmap(data?.slug);
  const node = roadmap ? getTopic(roadmap, data?.topicSlug) : undefined;
  if (!roadmap || !node || !data) return [];
  return pageMeta({
    title: i18n.t('meta.topicTitle', {
      topic: node.title,
      roadmap: roadmap.title,
    }),
    description: node.summary,
    path: `/roadmaps/${roadmap.slug}/${node.slug}`,
    image: `/og/${roadmap.slug}.png`,
    imageAlt: `${node.title} · ${roadmap.title}`,
  });
};

export default function TopicRoute() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { state, toggle } = useProgress();
  const roadmap = getRoadmap(slug);
  if (!roadmap) return null;

  const { topicSlug } = useLoaderData() as { topicSlug: string };
  const node = getTopic(roadmap, topicSlug);
  if (!node) return null;

  const completed = completedFor(state, roadmap.slug);
  const status = statusFor(roadmap, node, completed);
  const position = topicPosition(roadmap, node);
  const group = getGroup(roadmap, node);
  const completedAt = state.completed[roadmap.slug]?.[node.id];
  const prerequisites = node.prerequisites
    .map((id) => roadmap.nodes.find((item) => item.id === id))
    .filter((item) => item !== undefined);
  const resourceGroups = groupResources(node);
  const previous = roadmap.nodes[position - 2];
  const next = roadmap.nodes[position];

  return (
    <>
      <JsonLd
        values={[
          topicCourse({
            title: node.title,
            description: node.summary,
            path: `/roadmaps/${roadmap.slug}/${node.slug}`,
            roadmapTitle: roadmap.title,
            roadmapPath: `/roadmaps/${roadmap.slug}`,
          }),
          breadcrumbs([
            { name: t('nav.roadmaps'), path: '/roadmaps' },
            { name: roadmap.title, path: `/roadmaps/${roadmap.slug}` },
            {
              name: node.title,
              path: `/roadmaps/${roadmap.slug}/${node.slug}`,
            },
          ]),
        ]}
      />
      <section className="relative overflow-hidden border-b border-line">
        <Contour />
        <div className="relative mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <Link to="/roadmaps" className="hover:text-accent-text">
              {t('nav.roadmaps')}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              to={`/roadmaps/${roadmap.slug}`}
              className="hover:text-accent-text"
            >
              {roadmap.title}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{t('topic.eyebrow')}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <TopicStateBadge status={status} />
            {node.optional && (
              <Badge tone="outline">{t('common.optional')}</Badge>
            )}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">
            {node.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{node.summary}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
            {`${t('common.level')} · ${t(`common.${roadmap.level}`)} · ${t('common.time')} · ${t('common.weeks', { count: roadmap.estimatedWeeks })} · ${t('common.topics', { count: roadmap.nodes.length })} · ${t('common.levels', { count: roadmap.groups.length })} · ${t('topic.position', { current: position, total: roadmap.nodes.length })}`}
          </p>
          {completedAt && (
            <p role="status" className="mt-3 text-sm text-success">
              {t('topic.completedAt', { date: completedAt.slice(0, 10) })}
            </p>
          )}
          <button
            type="button"
            onClick={() => toggle(roadmap.slug, node.id)}
            className={`${buttonClasses(status === 'completed' ? 'outline' : 'primary', 'md')} mt-8`}
          >
            {status === 'completed'
              ? t('topic.undoAction')
              : t('topic.completeAction')}
          </button>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <Card rule={status === 'completed' ? 'success' : status === 'current' ? 'accent' : 'ink'} className="p-8">
            {group && (
              <Badge tone="neutral">{group.title}</Badge>
            )}
            {node.outcomes.length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-2xl">
                  {t('topic.outcomesTitle')}
                </h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {node.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <span aria-hidden="true" className="text-accent-text">
                        →
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section className="mt-8 border-t border-line pt-6">
              <h2 className="font-display text-2xl">
                {t('topic.aboutTitle')}
              </h2>
              <p className="mt-3 text-muted">
                {node.content ?? t('topic.aboutSource')}
              </p>
            </section>
          </Card>

          <nav
            aria-label={t('nav.roadmaps')}
            className="mt-8 flex flex-wrap justify-between gap-4 border-t border-line pt-6"
          >
            {previous ? (
              <Link
                to={`/roadmaps/${roadmap.slug}/${previous.slug}`}
                className="text-sm text-accent-text underline underline-offset-4"
              >
                ← {t('common.previous')} · {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/roadmaps/${roadmap.slug}/${next.slug}`}
                className="text-sm text-accent-text underline underline-offset-4"
              >
                {t('common.next')} · {next.title} →
              </Link>
            )}
          </nav>
        </article>

        <aside className="lg:col-span-4">
          <Card className="p-6">
            <h2 className="font-display text-2xl">{t('topic.notesTitle')}</h2>
            <p className="mt-2 text-sm text-muted">{t('topic.notesBody')}</p>

            <section className="mt-6 border-t border-line pt-5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                {t('topic.prereqsTitle')}
              </h3>
              {prerequisites.length === 0 ? (
                <p className="mt-3 text-sm text-muted">
                  {t('topic.noPrereqs')}
                </p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {prerequisites.map((prerequisite) => (
                    <li key={prerequisite.id}>
                      <Link
                        to={`/roadmaps/${roadmap.slug}/${prerequisite.slug}`}
                        className="text-accent-text underline underline-offset-4"
                      >
                        {prerequisite.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="mt-6 border-t border-line pt-5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                {t('topic.resourcesTitle')}
              </h3>
              {resourceGroups.length === 0 ? (
                <p className="mt-3 text-sm text-muted">
                  {t('topic.emptyResources')}
                </p>
              ) : (
                <div className="mt-3 max-h-80 space-y-4 overflow-y-auto pr-1">
                  {resourceGroups.map(([type, resources]) => (
                    <div key={type}>
                      <p className="font-mono text-xs uppercase tracking-widest text-muted">
                        {t(resourceTypeKeys[type])}
                      </p>
                      <ul className="mt-2 space-y-2 text-sm">
                        {resources.map((resource) => (
                          <li key={resource.url}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-text underline underline-offset-4"
                            >
                              {resource.title}
                              {resource.provider && ` · ${resource.provider}`}
                              <span aria-label={t('common.externalLink')}>
                                {' '}
                                ↗
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-6 border-t border-line pt-5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                {t('common.source')}
              </h3>
              <p className="mt-3 text-sm text-muted">{t('topic.aboutSource')}</p>
              <a
                href={sourceUrl(roadmap.sourceFolder)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-accent-text underline underline-offset-4"
              >
                {t('topic.sourceCta')}
                <span aria-label={t('common.externalLink')}> ↗</span>
              </a>
            </section>
          </Card>
        </aside>
      </div>
    </>
  );
}
