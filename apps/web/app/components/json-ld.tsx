import { SITE_URL, absoluteUrl } from '../lib/site';

export type JsonValue = Record<string, unknown>;

export function organization() {
  return { '@type': 'Organization', name: 'StackPath', url: SITE_URL };
}

export function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function course({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description,
    url: absoluteUrl(path),
    isAccessibleForFree: true,
    provider: organization(),
  };
}

export function topicCourse({
  title,
  description,
  path,
  roadmapTitle,
  roadmapPath,
}: {
  title: string;
  description: string;
  path: string;
  roadmapTitle: string;
  roadmapPath: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description,
    url: absoluteUrl(path),
    isAccessibleForFree: true,
    provider: organization(),
    isPartOf: {
      '@type': 'Course',
      name: roadmapTitle,
      url: absoluteUrl(roadmapPath),
    },
  };
}

export function roadmapsItemList(
  items: Array<{ title: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'StackPath learning expeditions',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: absoluteUrl(item.path),
    })),
  };
}

export function webSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'StackPath',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPage({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: webSite(),
  };
}

export function JsonLd({ values }: { values: JsonValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(values).replace(/</g, '\\u003c'),
      }}
    />
  );
}
