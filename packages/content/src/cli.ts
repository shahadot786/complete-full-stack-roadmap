import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { domains } from '../overrides/catalog';
import { collectMarkdownFiles, countUniqueResources, generateRoadmap, readText } from './generate';
import { extractLinks } from './parse';
import {
  roadmapIndexSchema,
  type ContentIssue,
  type ContentReport,
  type Roadmap,
  type RoadmapIndexEntry,
} from './schema';
import {
  validateIndexConsistency,
  validateReport,
  validateRoadmap,
} from './validate';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..', '..');
const corpusDir = join(root, 'packages/content/domains');
const outDir = join(here, '..', 'generated');

type Generated = {
  roadmaps: Roadmap[];
  index: RoadmapIndexEntry[];
  report: ContentReport;
};

function indexEntry(roadmap: Roadmap): RoadmapIndexEntry {
  return roadmapIndexSchema.parse({
    ...roadmap,
    topics: roadmap.nodes.length,
    resources: new Set(
      roadmap.nodes.flatMap((node) => node.resources.map((resource) => resource.url)),
    ).size,
  });
}

export function generateAll(): Generated {
  const issues: ContentIssue[] = [];
  const roadmaps = domains.map((domain) =>
    validateRoadmap(generateRoadmap(root, domain, issues, corpusDir)),
  );
  const index = roadmaps.map(indexEntry);
  validateIndexConsistency(roadmaps, index);

  const domainFiles = [
    ...domains.flatMap((domain) =>
      collectMarkdownFiles(join(corpusDir, domain.folder)),
    ),
    ...collectMarkdownFiles(join(root, 'packages/content/extra')),
  ];
  const resourceLinks = domainFiles.reduce(
    (total, path) => total + extractLinks(readText(path)).length,
    0,
  );

  const report = validateReport({
    corpus: {
      markdownFiles: domainFiles.length,
      resourceLinks,
      uniqueResources: countUniqueResources(roadmaps),
    },
    roadmaps: roadmaps.map((roadmap) => ({
      slug: roadmap.slug,
      status: roadmap.status,
      groups: roadmap.groups.length,
      nodes: roadmap.nodes.length,
      resources: new Set(
        roadmap.nodes.flatMap((node) =>
          node.resources.map((resource) => resource.url),
        ),
      ).size,
    })),
    issues,
  });

  return { roadmaps, index, report };
}

function serialise(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function targets(): Array<{ path: string; value: unknown }> {
  const generated = generateAll();
  return [
    { path: join(outDir, 'roadmaps.json'), value: generated.roadmaps },
    { path: join(outDir, 'index.json'), value: generated.index },
    { path: join(outDir, 'content-report.json'), value: generated.report },
  ];
}

function build(): void {
  mkdirSync(outDir, { recursive: true });
  for (const target of targets()) {
    writeFileSync(target.path, serialise(target.value));
  }
  const { report } = generateAll();
  console.log(
    `content:build ok — ${report.roadmaps.length} roadmaps, ${report.corpus.markdownFiles} markdown files, ${report.issues.length} issues`,
  );
}

function check(): void {
  for (const target of targets()) {
    let actual: string;
    try {
      actual = readFileSync(target.path, 'utf8');
    } catch {
      throw new Error(`Missing generated file: ${target.path}`);
    }
    if (actual !== serialise(target.value)) {
      throw new Error(`Generated file is stale: ${target.path}`);
    }
  }
  console.log('content:check ok — generated files match the Markdown corpus');
}

const command = process.argv[2];
if (command === 'build') build();
else if (command === 'check') check();
else {
  console.error('Usage: tsx src/cli.ts <build|check>');
  process.exitCode = 1;
}
