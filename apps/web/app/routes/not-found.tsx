import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { buttonClasses } from '@stackpath/ui';
import { JsonLd, webPage } from '../components/json-ld';
import i18n from '../i18n/i18n';
import { pageMeta } from '../lib/meta';

export function meta() {
  return pageMeta({
    title: i18n.t('meta.pageTitle', { title: i18n.t('errors.notFoundTitle') }),
    description: i18n.t('errors.notFoundBody'),
    path: '/404',
  });
}

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        values={[
          webPage({
            title: t('meta.pageTitle', { title: t('errors.notFoundTitle') }),
            description: t('errors.notFoundBody'),
            path: '/404',
          }),
        ]}
      />
      <p className="font-mono text-5xl text-accent-text">404</p>
      <h1 className="mt-6 font-display text-4xl">{t('errors.notFoundTitle')}</h1>
      <p className="mt-4 text-muted">{t('errors.notFoundBody')}</p>
      <Link to="/" className={`${buttonClasses('primary', 'md')} mt-8`}>
        {t('errors.backHome')}
      </Link>
    </div>
  );
}
