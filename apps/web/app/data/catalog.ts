import type { ContentReport, RoadmapIndexEntry } from '@stackpath/content';
import indexData from '@stackpath/content/index';
import reportData from '@stackpath/content/report';

export const roadmapIndex = indexData as RoadmapIndexEntry[];
export const contentReport = reportData as ContentReport;

export const REPO_URL =
  'https://github.com/shahadot786/complete-full-stack-roadmap';

export const totalTopics = roadmapIndex.reduce(
  (sum, entry) => sum + entry.topics,
  0,
);

export function sourceUrl(sourceFolder: string): string {
  return `${REPO_URL}/tree/master/${sourceFolder}`;
}

export function roadmapStats(
  entry: RoadmapIndexEntry,
  completed: ReadonlySet<string>,
) {
  const total = entry.topics;
  const done = Math.min(completed.size, total);
  return {
    total,
    completed: done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}
