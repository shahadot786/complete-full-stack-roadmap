import { describe, expect, it } from 'vitest';
import {
  contentReport,
  roadmapIndex,
  roadmapStats as catalogStats,
  sourceUrl,
  totalTopics,
} from './catalog';
import {
  getRoadmap,
  getTopic,
  groupResources,
  roadmapStats,
  roadmaps,
  topicPosition,
} from './roadmaps';

describe('generated roadmap data', () => {
  it('resolves every index entry to one generated roadmap', () => {
    expect(roadmapIndex).toHaveLength(12);
    expect(roadmaps).toHaveLength(12);
    expect(new Set(roadmaps.map((roadmap) => roadmap.slug)).size).toBe(12);

    for (const entry of roadmapIndex) {
      const roadmap = getRoadmap(entry.slug);
      expect(roadmap).toBeDefined();
      expect(roadmap?.title).toBe(entry.title);
      expect(roadmap?.status).toBe(entry.status);
    }
  });

  it('derives full badges from generated status only', () => {
    expect(
      roadmapIndex.filter((entry) => entry.status === 'full').map((entry) => entry.slug),
    ).toEqual(['frontend', 'backend', 'devops']);
    expect(roadmapIndex.filter((entry) => entry.status === 'outline')).toHaveLength(9);
  });

  it('computes stats from topic ids', () => {
    for (const roadmap of roadmaps) {
      const first = roadmap.nodes[0];
      const completed = new Set(first ? [first.id] : []);
      const stats = roadmapStats(roadmap, completed);

      expect(stats.total).toBe(roadmap.nodes.length);
      expect(stats.completed).toBe(completed.size);
      expect(stats.percent).toBe(
        stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100),
      );
    }

    expect(totalTopics).toBe(
      roadmaps.reduce((sum, roadmap) => sum + roadmap.nodes.length, 0),
    );
  });

  it('matches the lightweight catalog counts against generated roadmaps', () => {
    for (const entry of roadmapIndex) {
      const roadmap = getRoadmap(entry.slug)!;
      const resources = new Set(
        roadmap.nodes.flatMap((node) => node.resources.map((resource) => resource.url)),
      ).size;

      expect(entry.topics).toBe(roadmap.nodes.length);
      expect(entry.resources).toBe(resources);
      expect(sourceUrl(entry.sourceFolder)).toContain(entry.sourceFolder);
      expect(catalogStats(entry, new Set()).total).toBe(roadmap.nodes.length);
      expect(
        catalogStats(entry, new Set(roadmap.nodes.map((node) => node.id))).percent,
      ).toBe(100);
    }
    expect(contentReport.corpus.markdownFiles).toBe(397);
  });

  it('positions topics once and groups their resources', () => {
    for (const roadmap of roadmaps) {
      roadmap.nodes.forEach((node, index) => {
        expect(topicPosition(roadmap, node)).toBe(index + 1);
        expect(getTopic(roadmap, node.slug)?.id).toBe(node.id);
        expect(roadmap.groups.some((group) => group.id === node.groupId)).toBe(true);
        expect(
          groupResources(node).flatMap(([, resources]) => resources),
        ).toHaveLength(node.resources.length);
      });
    }
  });
});
