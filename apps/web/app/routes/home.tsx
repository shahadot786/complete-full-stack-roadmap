import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  Badge,
  Card,
  Contour,
  NumberedMarker,
  ProgressRing,
  buttonClasses,
} from '@stackpath/ui';
import {
  contentReport,
  roadmapIndex,
  roadmapStats,
  sourceUrl,
} from '../data/catalog';
import i18n from '../i18n/i18n';
import { JsonLd, webSite } from '../components/json-ld';
import { pageMeta } from '../lib/meta';
import { completedFor, useProgress } from '../lib/progress';
import {
  recommendRoadmap,
  type ExperienceKey,
  type GoalKey,
  type TimeKey,
} from '../lib/recommend';

const steps = [
  { titleKey: 'home.step1Title', bodyKey: 'home.step1Body' },
  { titleKey: 'home.step2Title', bodyKey: 'home.step2Body' },
  { titleKey: 'home.step3Title', bodyKey: 'home.step3Body' },
] as const;

const goalOptions: Array<{ value: GoalKey; labelKey: string }> = [
  { value: 'frontend', labelKey: 'home.goalInterface' },
  { value: 'backend', labelKey: 'home.goalServices' },
  { value: 'devops', labelKey: 'home.goalInfrastructure' },
];

const experienceOptions: Array<{ value: ExperienceKey; labelKey: string }> = [
  { value: 'beginner', labelKey: 'common.beginner' },
  { value: 'intermediate', labelKey: 'common.intermediate' },
  { value: 'advanced', labelKey: 'common.advanced' },
];

const timeOptions: Array<{ value: TimeKey; labelKey: string }> = [
  { value: 'light', labelKey: 'home.timeLight' },
  { value: 'steady', labelKey: 'home.timeSteady' },
  { value: 'intense', labelKey: 'home.timeIntense' },
];

const featured = roadmapIndex.filter((entry) => entry.status === 'full');

export function meta() {
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: i18n.t('home.title') }),
    description: i18n.t('home.subtitle'),
    path: '/',
  });
}

export default function Home() {
  const { t } = useTranslation();
  const { state } = useProgress();
  const [goal, setGoal] = useState<GoalKey>('frontend');
  const [experience, setExperience] = useState<ExperienceKey>('beginner');
  const [time, setTime] = useState<TimeKey>('light');

  const recommendation = useMemo(
    () => recommendRoadmap(roadmapIndex, goal, experience, time),
    [goal, experience, time],
  );

  function choiceGroup<T extends string>(
    name: string,
    legendKey: string,
    options: Array<{ value: T; labelKey: string }>,
    value: T,
    onChange: (next: T) => void,
  ) {
    return (
      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-widest text-muted">
          {t(legendKey)}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {options.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span className="block rounded border border-line px-3 py-2 text-sm text-muted peer-checked:border-accent peer-checked:bg-active peer-checked:text-accent-text peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {t(option.labelKey)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <>
      <JsonLd values={[webSite()]} />
      <section className="relative overflow-hidden border-b border-line">
        <Contour className="top-0" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text">
              <span className="h-px w-8 bg-accent" />
              {t('home.eyebrow')}
            </div>
            <h1 className="mt-6 max-w-2xl font-display text-5xl leading-tight tracking-tight sm:text-6xl">
              {t('home.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {t('home.subtitle')}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
              {t('home.meta', {
                paths: roadmapIndex.length,
                lessons: contentReport.corpus.markdownFiles,
              })}
            </p>
            <Link
              to="/roadmaps"
              className={`${buttonClasses('primary', 'md')} mt-10`}
            >
              {t('home.primaryCta')}
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-lg border border-line bg-surface p-6">
              <div className="space-y-3">
                {featured.map((entry, index) => (
                  <div
                    key={entry.slug}
                    className="flex items-center gap-4 border-l-2 border-ink p-3"
                  >
                    <NumberedMarker index={index + 1} />
                    <div>
                      <p className="font-display text-xl">{entry.title}</p>
                      <p className="text-sm text-muted">{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-line pt-4 font-mono text-xs text-muted">
                {t('home.mapCaption')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl">{t('home.pickerTitle')}</h2>
            <p className="mt-2 max-w-xl text-muted">{t('home.pickerBody')}</p>
            <div className="mt-8 space-y-6">
              {choiceGroup(
                'goal',
                'home.goalLabel',
                goalOptions,
                goal,
                setGoal,
              )}
              {choiceGroup(
                'experience',
                'home.experienceLabel',
                experienceOptions,
                experience,
                setExperience,
              )}
              {choiceGroup('time', 'home.timeLabel', timeOptions, time, setTime)}
            </div>
          </div>
          <div className="lg:col-span-5">
            {recommendation && (
              <Card rule="accent" className="h-full p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-accent-text">
                  {t('home.recommendedLabel')}
                </p>
                <h3 className="mt-4 font-display text-3xl">
                  {recommendation.title}
                </h3>
                <p className="mt-3 text-muted">
                  {t('home.recommendedBody', { title: recommendation.title })}
                </p>
                <Link
                  to={`/roadmaps/${recommendation.slug}`}
                  className={`${buttonClasses('primary', 'md')} mt-8`}
                >
                  {t('common.startHere')}
                </Link>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl">{t('home.featuredTitle')}</h2>
        <p className="mt-2 max-w-2xl text-muted">{t('home.featuredBody')}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((entry) => {
            const stats = roadmapStats(
              entry,
              completedFor(state, entry.slug),
            );
            return (
              <Card key={entry.slug} rule="accent" className="flex h-full flex-col p-6">
                <Badge tone="accent">{t('common.full')}</Badge>
                <h3 className="mt-4 font-display text-2xl">{entry.title}</h3>
                <p className="mt-2 text-sm text-muted">{entry.description}</p>
                <div className="mt-5 flex items-center gap-4 border-y border-line py-4">
                  <ProgressRing
                    value={stats.percent}
                    label={`${entry.title} ${t('a11y.progressChip')}`}
                  />
                  <div className="font-mono text-xs text-muted">
                    <p>{t('common.topics', { count: stats.total })}</p>
                    <p>{t('common.weeks', { count: entry.estimatedWeeks })}</p>
                  </div>
                </div>
                <Link
                  to={`/roadmaps/${entry.slug}`}
                  className="mt-6 inline-block text-sm text-accent-text underline underline-offset-4"
                >
                  {t('common.browseRoadmaps')}
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl">{t('home.allPathsTitle')}</h2>
          <div className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {roadmapIndex.map((entry) => {
              const badge =
                entry.status === 'full' ? t('common.full') : t('common.outline');

              return entry.status === 'full' ? (
                <Link
                  key={entry.slug}
                  to={`/roadmaps/${entry.slug}`}
                  className="flex items-center justify-between gap-3 border-b border-line py-3 text-sm hover:text-accent-text"
                >
                  <span>{entry.title}</span>
                  <span className="font-mono text-xs text-muted">{badge}</span>
                </Link>
              ) : (
                <a
                  key={entry.slug}
                  href={sourceUrl(entry.sourceFolder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 border-b border-line py-3 text-sm hover:text-accent-text"
                >
                  <span>{entry.title}</span>
                  <span className="font-mono text-xs text-muted">
                    {badge}
                    <span aria-label={t('common.externalLink')}> ↗</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl">{t('home.statsTitle')}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            { value: roadmapIndex.length, labelKey: 'home.statsPaths' },
            {
              value: contentReport.corpus.markdownFiles,
              labelKey: 'home.statsLessons',
            },
            {
              value: contentReport.corpus.uniqueResources,
              labelKey: 'home.statsResources',
            },
          ].map((stat) => (
            <div key={stat.labelKey} className="border-t-2 border-ink pt-4">
              <p className="font-display text-5xl">{stat.value}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl">{t('home.howTitle')}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.titleKey}>
                <NumberedMarker index={index + 1} tone="accent" />
                <h3 className="mt-4 font-display text-xl">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-muted">{t(step.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
