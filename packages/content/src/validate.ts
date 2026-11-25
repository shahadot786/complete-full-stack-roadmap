import {
  contentReportSchema,
  roadmapSchema,
  type Roadmap,
  type RoadmapIndexEntry,
  type ContentReport,
} from './schema';

export class ContentValidationError extends Error {
  constructor(roadmap: string, message: string) {
    super(`${roadmap}: ${message}`);
    this.name = 'ContentValidationError';
  }
}

function hasCycle(roadmap: Roadmap): boolean {
  const indegree = new Map<string, number>(
    roadmap.nodes.map((node) => [node.id, 0]),
  );
  const outgoing = new Map<string, string[]>(
    roadmap.nodes.map((node) => [node.id, []]),
  );

  for (const edge of roadmap.edges) {
    indegree.set(edge.to, (indegree.get(edge.to) ?? 0) + 1);
    outgoing.get(edge.from)?.push(edge.to);
  }

  const queue = [...indegree.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([id]) => id);
  let visited = 0;

  while (queue.length > 0) {
    const id = queue.shift();
    if (!id) continue;
    visited += 1;
    for (const next of outgoing.get(id) ?? []) {
      const degree = (indegree.get(next) ?? 0) - 1;
      indegree.set(next, degree);
      if (degree === 0) queue.push(next);
    }
  }

  return visited !== roadmap.nodes.length;
}

export function validateRoadmap(roadmap: Roadmap): Roadmap {
  const parsed = roadmapSchema.parse(roadmap);
  const slugs = parsed.nodes.map((node) => node.slug);
  if (new Set(slugs).size !== slugs.length) {
    throw new ContentValidationError(parsed.slug, 'Duplicate topic slugs');
  }

  const groupIds = new Set(parsed.groups.map((group) => group.id));
  for (const node of parsed.nodes) {
    if (!groupIds.has(node.groupId)) {
      throw new ContentValidationError(
        parsed.slug,
        `Node ${node.slug} references unknown group ${node.groupId}`,
      );
    }
    if (node.resources.length === 0 && !node.content) {
      throw new ContentValidationError(
        parsed.slug,
        `Node ${node.slug} has neither resources nor content`,
      );
    }
  }

  const ids = new Set(slugs);
  for (const edge of parsed.edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) {
      throw new ContentValidationError(
        parsed.slug,
        `Edge references unknown node: ${edge.from} -> ${edge.to}`,
      );
    }
  }
  if (hasCycle(parsed)) {
    throw new ContentValidationError(parsed.slug, 'Prerequisite edges contain a cycle');
  }

  if (parsed.status === 'full') {
    if (parsed.nodes.length < 10) {
      throw new ContentValidationError(parsed.slug, 'Fewer than 10 nodes');
    }
    const urls = new Set(
      parsed.nodes.flatMap((node) => node.resources.map((resource) => resource.url)),
    );
    if (urls.size < 40) {
      throw new ContentValidationError(parsed.slug, 'Fewer than 40 unique resources');
    }
  }

  return parsed;
}

export function validateReport(report: ContentReport): ContentReport {
  return contentReportSchema.parse(report);
}

export function validateIndexConsistency(
  roadmaps: Roadmap[],
  index: RoadmapIndexEntry[],
): void {
  const bySlug = new Map(index.map((entry) => [entry.slug, entry]));
  if (bySlug.size !== index.length) {
    throw new ContentValidationError('index', 'Duplicate index slugs');
  }
  for (const roadmap of roadmaps) {
    const entry = bySlug.get(roadmap.slug);
    if (!entry) {
      throw new ContentValidationError(roadmap.slug, 'Missing index entry');
    }
    for (const key of [
      'title',
      'description',
      'level',
      'estimatedWeeks',
      'status',
      'icon',
      'accent',
      'sourceFolder',
    ] as const) {
      if (entry[key] !== roadmap[key]) {
        throw new ContentValidationError(roadmap.slug, `Index mismatch on ${key}`);
      }
    }
    const resources = new Set(
      roadmap.nodes.flatMap((node) => node.resources.map((resource) => resource.url)),
    ).size;
    if (entry.topics !== roadmap.nodes.length || entry.resources !== resources) {
      throw new ContentValidationError(roadmap.slug, 'Index count mismatch');
    }
  }
}
