import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { DomainConfig, ExtraNode } from '../overrides/catalog';
import { dedupeResources } from './classify';
import {
  cleanText,
  extractLinks,
  extractOutcomes,
  groupTitleFor,
  headingSections,
  isLevelFolder,
  isResourceFolder,
  slugify,
  summaryFromMarkdown,
  titleFromMarkdown,
} from './parse';
import type { ContentIssue, Group, Resource, Roadmap, TopicNode } from './schema';

type DraftNode = {
  slug: string;
  title: string;
  summary: string;
  groupId: string;
  order: number;
  optional: boolean;
  outcomes: string[];
  prerequisites: string[];
  resources: Resource[];
  content?: string;
  sourcePath: string;
};

export function readText(path: string): string {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

export function listDirectories(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function collectMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectMarkdownFiles(path));
    else if (entry.name.toLowerCase().endsWith('.md')) files.push(path);
  }
  return files;
}

function fallbackSummary(title: string, domain: string): string {
  return `Curated notes and resources for ${title} in the ${domain} library.`;
}

function makeNode(
  sourcePath: string,
  groupId: string,
  order: number,
  config: DomainConfig,
  options: {
    title?: string;
    slug?: string;
    optional?: boolean;
    body?: string;
  } = {},
): DraftNode {
  const markdown = readText(join(sourcePath, 'README.md'));
  const headingTitle = titleFromMarkdown(markdown);
  const title = (options.title ?? headingTitle).slice(0, 80);
  const folderKey = slugify(
    sourcePath.split(/[\\/]/).filter(Boolean).at(-1) ?? title,
  );
  const slug = options.slug ?? config.nodeSlugs?.[folderKey] ?? folderKey;

  const body = options.body ?? markdown;
  const resources = extractLinks(body);
  const summary = summaryFromMarkdown(markdown);

  return {
    slug,
    title,
    summary: summary.length >= 20 ? summary : fallbackSummary(title, config.title),
    groupId,
    order,
    optional: options.optional ?? false,
    outcomes: extractOutcomes(markdown),
    prerequisites: config.prerequisites?.[slug] ?? [],
    resources,
    sourcePath,
  };
}

function collectFolderResources(dir: string): Resource[] {
  const resources: Resource[] = [];
  const readme = join(dir, 'README.md');
  if (existsSync(readme)) resources.push(...extractLinks(readText(readme)));

  for (const child of listDirectories(dir)) {
    if (!isResourceFolder(child)) continue;
    const childReadme = join(dir, child, 'README.md');
    if (existsSync(childReadme)) {
      resources.push(...extractLinks(readText(childReadme)));
    }
  }
  return dedupeResources(resources);
}

function buildGroups(levelFolders: string[], config: DomainConfig): Group[] {
  return levelFolders.map((folder, index) => ({
    id: folder,
    title:
      config.groupTitles?.[folder.toLowerCase()] ??
      groupTitleFor(folder),
    order: index + 1,
  }));
}

function buildFolderNodes(
  root: string,
  config: DomainConfig,
  baseDir: string,
  groups: Group[],
  issues: ContentIssue[],
): DraftNode[] {
  const nodes: DraftNode[] = [];
  let order = 1;
  const extrasByGroup = new Map<string, ExtraNode[]>();

  for (const extra of config.extraNodes ?? []) {
    const extras = extrasByGroup.get(extra.group) ?? [];
    extras.push(extra);
    extrasByGroup.set(extra.group, extras);
  }

  const addExtraNodes = (groupId: string) => {
    for (const extra of extrasByGroup.get(groupId) ?? []) {
      const sourcePath = join(baseDir, extra.path);
      if (!existsSync(join(sourcePath, 'README.md'))) {
        issues.push({
          roadmap: config.slug,
          path: relative(root, sourcePath),
          message: 'Override node missing README',
        });
        continue;
      }
      const node = makeNode(sourcePath, extra.group, order, config, {
        title: extra.title,
        slug: extra.slug,
        optional: extra.optional,
      });
      node.resources = dedupeResources([
        ...node.resources,
        ...collectFolderResources(sourcePath),
      ]);
      nodes.push(node);
      order += 1;
    }
  };

  for (const group of groups) {
    const groupDir = join(baseDir, group.id);
    const children = listDirectories(groupDir);
    let found = false;

    for (const child of children) {
      if (isResourceFolder(child)) continue;
      const childDir = join(groupDir, child);
      const readme = join(childDir, 'README.md');
      if (!existsSync(readme)) {
        issues.push({
          roadmap: config.slug,
          path: relative(root, childDir),
          message: 'Skipped folder without README',
        });
        continue;
      }
      found = true;
      const node = makeNode(childDir, group.id, order, config);
      node.resources = dedupeResources([
        ...node.resources,
        ...collectFolderResources(childDir),
      ]);
      nodes.push(node);
      order += 1;
    }

    if (!found && existsSync(join(groupDir, 'README.md'))) {
      const node = makeNode(groupDir, group.id, order, config);
      nodes.push(node);
      order += 1;
    }

    addExtraNodes(group.id);
  }

  for (const groupId of extrasByGroup.keys()) {
    if (groups.some((group) => group.id === groupId)) continue;
    addExtraNodes(groupId);
  }

  return nodes;
}

function buildHeadingNodes(
  root: string,
  contentDir: string,
  config: DomainConfig,
  baseDir: string,
  groups: Group[],
  issues: ContentIssue[],
): DraftNode[] {
  const nodes: DraftNode[] = [];
  let order = 1;
  const domainPool = dedupeResources(
    collectMarkdownFiles(join(contentDir, config.folder)).flatMap((path) =>
      extractLinks(readText(path)),
    ),
  );

  for (const group of groups) {
    const levelReadme = join(baseDir, group.id, 'README.md');
    const markdown = readText(levelReadme);
    if (!markdown) {
      issues.push({
        roadmap: config.slug,
        path: relative(root, levelReadme),
        message: 'Level README missing',
      });
      continue;
    }
    const levelPool = dedupeResources(
      extractLinks(readText(join(baseDir, group.id, 'Resources', 'README.md'))),
    );

    for (const section of headingSections(markdown)) {
      const slug = config.nodeSlugs?.[section.slug] ?? section.slug;
      const summary = cleanText(section.body.slice(0, 240)).slice(0, 200);
      nodes.push({
        slug,
        title: section.title,
        summary:
          summary.length >= 20
            ? summary
            : fallbackSummary(section.title, config.title),
        groupId: group.id,
        order,
        optional: false,
        outcomes: extractOutcomes(section.body),
        prerequisites: config.prerequisites?.[slug] ?? [],
        resources: dedupeResources([
          ...extractLinks(section.body),
          ...levelPool,
          ...domainPool,
        ]),
        sourcePath: relative(root, levelReadme),
      });
      order += 1;
    }
  }

  return nodes;
}

function finaliseNodes(nodes: DraftNode[], config: DomainConfig): TopicNode[] {
  const used = new Set<string>();
  return nodes.map((node) => {
    let slug = node.slug;
    if (used.has(slug)) slug = slugify(`${node.groupId}-${slug}`);
    let suffix = 2;
    while (used.has(slug)) {
      slug = `${node.slug}-${suffix}`;
      suffix += 1;
    }
    used.add(slug);

    return {
      id: slug,
      slug,
      title: node.title,
      summary: node.summary,
      groupId: node.groupId,
      order: node.order,
      optional: node.optional,
      outcomes: node.outcomes,
      prerequisites: node.prerequisites,
      resources: dedupeResources(node.resources),
      content:
        node.resources.length === 0
          ? `This ${node.title} topic is part of the ${config.title} outline. Open the source folder in the repository for the full material.`
          : undefined,
    };
  });
}

export function buildEdges(nodes: TopicNode[]): Roadmap['edges'] {
  const edges: Roadmap['edges'] = [];
  const ids = new Set(nodes.map((node) => node.id));
  const seen = new Set<string>();

  for (let index = 1; index < nodes.length; index += 1) {
    const previous = nodes[index - 1];
    const current = nodes[index];
    if (!previous || !current) continue;
    edges.push({ from: previous.id, to: current.id, kind: 'next' });
  }

  for (const node of nodes) {
    for (const prereq of node.prerequisites) {
      if (!ids.has(prereq) || prereq === node.id) continue;
      const key = `${prereq}->${node.id}:prereq`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: prereq, to: node.id, kind: 'prereq' });
    }
  }

  return edges;
}

export function generateRoadmap(
  root: string,
  config: DomainConfig,
  issues: ContentIssue[],
  contentDir: string = root,
): Roadmap {
  const domainDir = join(contentDir, config.folder);
  const baseDir = config.track ? join(domainDir, config.track) : domainDir;
  const levelFolders = listDirectories(baseDir).filter(isLevelFolder);
  const groupFolders = levelFolders.length > 0 ? levelFolders : listDirectories(baseDir);
  const groups = buildGroups(groupFolders, config);

  const draftNodes =
    config.shape === 'headings'
      ? buildHeadingNodes(root, contentDir, config, baseDir, groups, issues)
      : buildFolderNodes(root, config, baseDir, groups, issues);

  const nodes = finaliseNodes(draftNodes, config);
  const edges = buildEdges(nodes);

  return {
    slug: config.slug,
    title: config.title,
    description: config.description,
    level: config.level,
    estimatedWeeks: config.estimatedWeeks,
    status: config.status,
    icon: config.icon,
    accent: config.accent,
    sourceFolder: config.folder,
    groups,
    nodes,
    edges,
  };
}

export function countUniqueResources(roadmaps: Roadmap[]): number {
  const urls = new Set<string>();
  for (const roadmap of roadmaps) {
    for (const node of roadmap.nodes) {
      for (const resource of node.resources) {
        urls.add(resource.url);
      }
    }
  }
  return urls.size;
}
