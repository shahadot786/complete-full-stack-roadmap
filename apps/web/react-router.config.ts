import type { Config } from '@react-router/dev/config';
import roadmapData from '@stackpath/content/roadmaps';

const staticPaths = [
  '/',
  '/roadmaps',
  '/about',
  '/contribute',
  '/progress',
  '/search',
  '/404',
];

const contentPaths = roadmapData.flatMap((roadmap) => [
  `/roadmaps/${roadmap.slug}`,
  ...roadmap.nodes.map((node) => `/roadmaps/${roadmap.slug}/${node.slug}`),
]);

export default {
  ssr: true,
  routeDiscovery: { mode: 'initial' },
  prerender: {
    concurrency: 4,
    paths: [...staticPaths, ...contentPaths],
  },
} satisfies Config;
