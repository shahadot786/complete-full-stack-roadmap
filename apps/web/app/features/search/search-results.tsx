import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { queryTokens, type SearchEntry, type SearchType } from '../../lib/search';

const typeKeys: Record<SearchType, string> = {
  roadmap: 'search.typeRoadmap',
  topic: 'search.typeTopic',
  resource: 'search.typeResource',
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function Highlight({
  text,
  query,
}: {
  text: string;
  query: string;
}): ReactNode {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return text;
  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi');
  return text
    .split(pattern)
    .map((part, index) =>
      tokens.includes(part.toLowerCase()) ? (
        <mark key={index} className="bg-active text-accent-text">
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      ),
    );
}

export function breadcrumbFor(entry: SearchEntry, roadmapsLabel: string): string {
  const parts = [roadmapsLabel, entry.roadmapTitle];
  if (entry.type !== 'roadmap') parts.push(entry.topicTitle);
  return parts.join(' / ');
}

export function SearchResults({
  results,
  query,
  compact = false,
}: {
  results: readonly SearchEntry[];
  query: string;
  compact?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <ul className={compact ? 'divide-y divide-line' : 'divide-y divide-line border-y border-line'}>
      {results.map((entry) => {
        const body = (
          <>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {t(typeKeys[entry.type])}
            </span>
            <span className="mt-1 block font-medium">
              <Highlight text={entry.title} query={query} />
            </span>
            <span className="mt-1 block truncate text-xs text-muted">
              <Highlight text={entry.detail} query={query} />
            </span>
            <span className="mt-1 block truncate font-mono text-xs text-muted">
              {breadcrumbFor(entry, t('nav.roadmaps'))}
            </span>
          </>
        );
        const className = 'block py-3 hover:text-accent-text';
        return (
          <li key={entry.id}>
            {entry.external ? (
              <a
                href={entry.path}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {body}
                <span className="sr-only">{t('common.externalLink')}</span>
              </a>
            ) : (
              <Link to={entry.path} className={className}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
