import type {
  Resource,
  ResourceType,
  Roadmap,
  TopicNode,
} from '@stackpath/content';
import roadmapData from '@stackpath/content/roadmaps';

export const roadmaps = roadmapData as Roadmap[];

export const levelKeys = [
  'common.beginner',
  'common.intermediate',
  'common.advanced',
  'common.mixed',
] as const;

export function getRoadmap(slug: string | undefined): Roadmap | undefined {
  return roadmaps.find((roadmap) => roadmap.slug === slug);
}

export function getTopic(
  roadmap: Roadmap,
  topicSlug: string | undefined,
): TopicNode | undefined {
  return roadmap.nodes.find((node) => node.slug === topicSlug);
}

export function getGroup(roadmap: Roadmap, node: TopicNode) {
  return roadmap.groups.find((group) => group.id === node.groupId);
}

export function roadmapStats(
  roadmap: Roadmap,
  completed: ReadonlySet<string>,
) {
  const total = roadmap.nodes.length;
  const done = roadmap.nodes.filter((node) => completed.has(node.id)).length;
  return {
    total,
    completed: done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}

export function topicPosition(roadmap: Roadmap, node: TopicNode) {
  return roadmap.nodes.findIndex((item) => item.id === node.id) + 1;
}

export function groupResources(
  node: TopicNode,
): Array<[ResourceType, Resource[]]> {
  const groups = new Map<ResourceType, Resource[]>();
  for (const resource of node.resources) {
    const list = groups.get(resource.type) ?? [];
    list.push(resource);
    groups.set(resource.type, list);
  }
  return [...groups.entries()];
}
