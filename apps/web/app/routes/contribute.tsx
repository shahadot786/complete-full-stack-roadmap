import { useTranslation } from 'react-i18next';
import { Button } from '@stackpath/ui';
import { JsonLd, webPage } from '../components/json-ld';
import i18n from '../i18n/i18n';
import { pageMeta } from '../lib/meta';

export function meta() {
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: i18n.t('contribute.title') }),
    description: i18n.t('contribute.body'),
    path: '/contribute',
  });
}

export default function Contribute() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        values={[
          webPage({
            title: t('meta.pageTitle', { title: t('contribute.title') }),
            description: t('contribute.body'),
            path: '/contribute',
          }),
        ]}
      />
      <h1 className="font-display text-4xl sm:text-5xl">
        {t('contribute.title')}
      </h1>
      <p className="mt-8 text-lg leading-relaxed text-muted">
        {t('contribute.body')}
      </p>
      <a
        href="https://github.com/shahadot786/complete-full-stack-roadmap/blob/master/CONTRIBUTING.md"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block"
      >
        <Button variant="outline">{t('contribute.cta')}</Button>
      </a>
    </div>
  );
}
