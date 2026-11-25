import { readFileSync } from 'node:fs';

const roadmaps = JSON.parse(
  readFileSync(new URL('../packages/content/generated/roadmaps.json', import.meta.url), 'utf8'),
);
const resources = roadmaps.flatMap((roadmap) =>
  roadmap.nodes.flatMap((node) =>
    (node.resources ?? []).map((resource) => ({
      roadmap: roadmap.slug,
      topic: node.slug,
      url: resource.url,
    })),
  ),
);
const failures = [];
const domains = new Set();
for (const { roadmap, topic, url } of resources) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') failures.push(`${roadmap}/${topic}: non-HTTPS ${url}`);
    if (!parsed.hostname.includes('.')) failures.push(`${roadmap}/${topic}: invalid host ${url}`);
    domains.add(parsed.hostname.replace(/^www\./, ''));
  } catch {
    failures.push(`${roadmap}/${topic}: unparseable ${url}`);
  }
}

if (failures.length > 0) {
  console.error(`content links failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(
  `content links ok — ${resources.length} resource links, ${domains.size} unique domains, all HTTPS`,
);
