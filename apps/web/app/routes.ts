import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('roadmaps', 'routes/roadmaps.tsx'),
  route('roadmaps/:slug', 'routes/roadmap.tsx'),
  route('roadmaps/:slug/:topicSlug', 'routes/topic.tsx'),
  route('search', 'routes/search.tsx'),
  route('progress', 'routes/progress.tsx'),
  route('about', 'routes/about.tsx'),
  route('contribute', 'routes/contribute.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
