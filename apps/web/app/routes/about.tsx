import { useTranslation } from 'react-i18next';
import { JsonLd, webPage } from '../components/json-ld';
import i18n from '../i18n/i18n';
import { pageMeta } from '../lib/meta';

export function meta() {
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: i18n.t('about.title') }),
    description: i18n.t('about.body'),
    path: '/about',
  });
}

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        values={[
          webPage({
            title: t('meta.pageTitle', { title: t('about.title') }),
            description: t('about.body'),
            path: '/about',
          }),
        ]}
      />
      <h1 className="font-display text-4xl sm:text-5xl">{t('about.title')}</h1>
      <p className="mt-8 text-lg leading-relaxed text-muted">{t('about.body')}</p>
    </div>
  );
}
