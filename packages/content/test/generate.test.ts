import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { domains } from '../overrides/catalog';
import { collectMarkdownFiles, countUniqueResources, generateRoadmap } from '../src/generate';
import {
  roadmapIndexSchema,
  type ContentIssue,
  type Roadmap,
} from '../src/schema';
import {
  ContentValidationError,
  validateIndexConsistency,
  validateReport,
  validateRoadmap,
} from '../src/validate';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const corpusDir = join(root, 'packages/content/domains');
const fixture = (name: string) =>
  readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');
const tempDirs: string[] = [];

function tempRoot(): string {
  const dir = mkdtempSync(join(tmpdir(), 'stackpath-content-'));
  tempDirs.push(dir);
  return dir;
}

function write(path: string, content: string): void {
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, content);
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

describe('roadmap generation', () => {
  it('builds heading-shape nodes from level README sections', () => {
    const base = tempRoot();
    write(
      join(base, '02-Backend-Development/Node.js/01-Beginner/README.md'),
      fixture('shape-a-level.md'),
    );
    const config = {
      ...domains[1]!,
      folder: '02-Backend-Development',
      track: 'Node.js',
    };
    const issues: ContentIssue[] = [];
    const roadmap = generateRoadmap(base, config, issues);

    expect(roadmap.nodes.map((node) => node.slug)).toEqual([
      'what-is-node',
      'setup',
    ]);
    expect(roadmap.nodes[0]?.resources.map((resource) => resource.url)).toContain(
      'https://nodejs.org/en/docs',
    );
    expect(roadmap.edges).toEqual([
      { from: 'what-is-node', to: 'setup', kind: 'next' },
    ]);
    expect(issues).toEqual([]);
  });

  it('builds folder-shape nodes, resource pools and override nodes', () => {
    const base = tempRoot();
    const domain = join(base, '01-Frontend-Development');
    write(join(domain, '01-Beginner/HTML-CSS/README.md'), fixture('shape-b-topic.md'));
    write(join(domain, '01-Beginner/Books/README.md'), fixture('table-links.md'));
    write(join(domain, '01-Beginner/Projects/README.md'), fixture('shape-b-topic.md'));
    mkdirSync(join(domain, '01-Beginner/NoReadme'), { recursive: true });
    const config = {
      ...domains[0]!,
      extraNodes: [
        {
          path: '01-Beginner/Projects',
          group: '03-Advanced',
          slug: 'frontend-projects',
          title: 'Frontend projects',
          optional: true,
        },
        {
          path: '01-Beginner/Missing',
          group: '03-Advanced',
          slug: 'missing',
          title: 'Missing',
        },
      ],
    };
    const issues: ContentIssue[] = [];
    const roadmap = generateRoadmap(base, config, issues);

    expect(roadmap.nodes.map((node) => node.slug)).toEqual([
      'html-css',
      'frontend-projects',
    ]);
    expect(roadmap.nodes[0]?.optional).toBe(false);
    expect(roadmap.nodes[1]?.optional).toBe(true);
    expect(roadmap.nodes[1]?.groupId).toBe('03-Advanced');
    expect(issues.map((issue) => issue.message)).toEqual([
      'Skipped folder without README',
      'Override node missing README',
    ]);
  });

  it('falls back to a group README when there are no child folders', () => {
    const base = tempRoot();
    write(
      join(base, '05-Data-Science/Statistics/README.md'),
      fixture('shape-b-topic.md'),
    );
    const config = {
      ...domains[4]!,
      folder: '05-Data-Science',
    };
    const issues: ContentIssue[] = [];
    const roadmap = generateRoadmap(base, config, issues);
    expect(roadmap.nodes).toHaveLength(1);
    expect(roadmap.nodes[0]?.content).toBeUndefined();
    expect(issues).toEqual([]);
  });

  it('uses a fallback summary for a short heading section', () => {
    const base = tempRoot();
    write(
      join(base, '02-Backend-Development/Node.js/01-Beginner/README.md'),
      '# Level\n\n## Tiny\n\nOk.\n',
    );
    const config = {
      ...domains[1]!,
      nodeSlugs: undefined,
      prerequisites: undefined,
    };
    const roadmap = generateRoadmap(base, config, []);
    expect(roadmap.nodes[0]?.summary).toContain('Curated notes');
  });

  it('keeps slugs unique when overrides collide', () => {
    const base = tempRoot();
    const domain = join(base, '01-Frontend-Development');
    for (const folder of ['Topic', 'ExtraA', 'ExtraB']) {
      write(join(domain, '01-Beginner', folder, 'README.md'), fixture('shape-b-topic.md'));
    }
    const config = {
      ...domains[0]!,
      nodeSlugs: undefined,
      extraNodes: [
        {
          path: '01-Beginner/ExtraA',
          group: '01-Beginner',
          slug: 'topic',
          title: 'Extra A',
        },
        {
          path: '01-Beginner/ExtraB',
          group: '01-Beginner',
          slug: 'topic',
          title: 'Extra B',
        },
      ],
    };
    const roadmap = generateRoadmap(base, config, []);
    expect(roadmap.nodes.map((node) => node.slug)).toEqual([
      'extraa',
      'extrab',
      'topic',
      '01-beginner-topic',
      'topic-2',
    ]);
  });

  it('adds outline content when a node has no resources', () => {
    const base = tempRoot();
    write(join(base, '12-Tools-Setup/Editor/README.md'), '# Editor\n\nA short note.');
    const roadmap = generateRoadmap(base, domains[11]!, []);
    expect(roadmap.nodes[0]?.content).toContain('part of the Tools and setup outline');
    expect(collectMarkdownFiles(join(base, '12-Tools-Setup'))).toHaveLength(1);
    expect(countUniqueResources([roadmap])).toBe(0);
  });
});

describe('validation', () => {
  const flagship = validateRoadmap(
    generateRoadmap(
      root,
      domains[0]!,
      [] satisfies ContentIssue[],
      corpusDir,
    ),
  );

  it('accepts real flagship roadmaps and checks count helpers', () => {
    expect(flagship.nodes).toHaveLength(13);
    expect(countUniqueResources([flagship])).toBeGreaterThanOrEqual(40);
    expect(
      validateReport({
        corpus: { markdownFiles: 397, resourceLinks: 1284, uniqueResources: 563 },
        roadmaps: [
          {
            slug: flagship.slug,
            status: flagship.status,
            groups: flagship.groups.length,
            nodes: flagship.nodes.length,
            resources: countUniqueResources([flagship]),
          },
        ],
        issues: [],
      }).roadmaps,
    ).toHaveLength(1);
  });

  it('numbers nodes once, in order, with contiguous groups', () => {
    for (const slug of ['frontend', 'backend', 'devops']) {
      const roadmap = validateRoadmap(
        generateRoadmap(
          root,
          domains.find((domain) => domain.slug === slug)!,
          [],
          corpusDir,
        ),
      );
      expect(roadmap.nodes.map((node) => node.order)).toEqual(
        roadmap.nodes.map((_, index) => index + 1),
      );
      const groupOrder = roadmap.groups.map((group) => group.id);
      const nodeGroups = roadmap.nodes.map((node) => node.groupId);
      const lastIndex = new Map(groupOrder.map((id, index) => [id, index]));
      const positions = nodeGroups.map((id) => lastIndex.get(id));
      expect(positions).toEqual([...positions].sort((a, b) => (a ?? 0) - (b ?? 0)));
    }
  });

  it('checks index entries against roadmaps', () => {
    const entry = roadmapIndexSchema.parse({
      ...flagship,
      topics: flagship.nodes.length,
      resources: countUniqueResources([flagship]),
    });
    expect(entry.topics).toBe(flagship.nodes.length);
    expect(entry.resources).toBe(countUniqueResources([flagship]));
    expect(() => validateIndexConsistency([flagship], [entry])).not.toThrow();
    expect(() =>
      validateIndexConsistency([flagship], [{ ...entry, title: 'Wrong' }]),
    ).toThrow(ContentValidationError);
    expect(() =>
      validateIndexConsistency([flagship], [{ ...entry, topics: entry.topics + 1 }]),
    ).toThrow(ContentValidationError);
    expect(() =>
      validateIndexConsistency([flagship], [{ ...entry, resources: 0 }]),
    ).toThrow(ContentValidationError);
    expect(() =>
      validateIndexConsistency([flagship], [entry, entry]),
    ).toThrow(ContentValidationError);
    expect(() => validateIndexConsistency([flagship], [])).toThrow(
      ContentValidationError,
    );
  });

  it('rejects duplicate slugs, unknown groups, bad edges, cycles and small full roadmaps', () => {
    const duplicate: Roadmap = {
      ...flagship,
      nodes: flagship.nodes.map((node, index) =>
        index === 1 ? { ...node, slug: flagship.nodes[0]!.slug } : node,
      ),
    };
    expect(() => validateRoadmap(duplicate)).toThrow('Duplicate topic slugs');

    const unknownGroup: Roadmap = {
      ...flagship,
      nodes: flagship.nodes.map((node, index) =>
        index === 0 ? { ...node, groupId: 'missing' } : node,
      ),
    };
    expect(() => validateRoadmap(unknownGroup)).toThrow('unknown group');

    const badEdge: Roadmap = {
      ...flagship,
      edges: [...flagship.edges, { from: 'ghost', to: 'html-css', kind: 'next' }],
    };
    expect(() => validateRoadmap(badEdge)).toThrow('unknown node');

    const cycle: Roadmap = {
      ...flagship,
      edges: [
        ...flagship.edges,
        { from: flagship.nodes.at(-1)!.id, to: flagship.nodes[0]!.id, kind: 'prereq' },
      ],
    };
    expect(() => validateRoadmap(cycle)).toThrow('cycle');

    const smallNodes = flagship.nodes.slice(0, 2);
    const smallIds = new Set(smallNodes.map((node) => node.id));
    const small: Roadmap = {
      ...flagship,
      nodes: smallNodes,
      edges: flagship.edges.filter(
        (edge) => smallIds.has(edge.from) && smallIds.has(edge.to),
      ),
    };
    expect(() => validateRoadmap(small)).toThrow('Fewer than 10 nodes');

    const fewResources: Roadmap = {
      ...flagship,
      nodes: flagship.nodes.map((node) => ({
        ...node,
        resources: [],
        content: 'Kept for validation tests.',
      })),
    };
    expect(() => validateRoadmap(fewResources)).toThrow(
      'Fewer than 40 unique resources',
    );
  });
});
