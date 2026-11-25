import type { Resource } from './schema';
import { isExternalHttpUrl, toResource } from './classify';

const EXCLUDED_HEADINGS =
  /^(resources?|table of contents?|what you'?ll learn|learning objectives?|next steps?|learning roadmap|overview|key takeaways?|conclusion|summary|prerequisites?)$/i;

export const RESOURCE_FOLDERS = new Set([
  'books',
  'videos',
  'projects',
  'exercises',
  'resources',
  'cheatsheets',
  'tools',
  'assets',
  'images',
]);

export function stripEmoji(value: string): string {
  return value
    .replace(/^[\p{Extended_Pictographic}\p{Emoji_Presentation}\s]+/u, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function cleanText(value: string): string {
  return stripEmoji(
    value
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
      .replace(/[*_`~]/g, '')
      .replace(/^\s*>\s*/gm, '')
      .replace(/\s+/g, ' '),
  );
}

export function stripCodeBlocks(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '');
}

export function stripTocSections(markdown: string): string {
  return markdown.replace(
    /^##[^\n]*table of contents[^\n]*\n[\s\S]*?(?=^##\s|\s*$)/gim,
    '',
  );
}

export function stripBadges(markdown: string): string {
  return markdown
    .split('\n')
    .filter((line) => !/^\s*\[!\[/.test(line))
    .join('\n');
}

export function prepareMarkdown(markdown: string): string {
  return stripBadges(stripTocSections(stripCodeBlocks(markdown)));
}

export function titleFromMarkdown(markdown: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1] ?? '';
  return cleanText(heading);
}

export function summaryFromMarkdown(markdown: string): string {
  const prepared = prepareMarkdown(markdown);
  const quote = prepared.match(/^>\s*(.+)$/m)?.[1];
  const paragraph = prepared
    .split('\n')
    .map((line) => line.trim())
    .find(
      (line) =>
        line.length > 0 &&
        !/^#{1,6}\s/.test(line) &&
        !/^\|/.test(line) &&
        !/^[-*]\s/.test(line) &&
        !/^\d+\.\s/.test(line) &&
        !/^---+$/.test(line),
    );

  const candidate = cleanText(quote ?? paragraph ?? '');
  if (candidate.length >= 20) return candidate.slice(0, 200);
  return 'Curated notes and resources for this topic from the StackPath library.';
}

export function slugify(value: string): string {
  return cleanText(value)
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

export type HeadingSection = {
  title: string;
  slug: string;
  body: string;
};

export function headingSections(markdown: string): HeadingSection[] {
  const prepared = prepareMarkdown(markdown);
  const matches = [...prepared.matchAll(/^##\s+(.+)$/gm)];
  const sections: HeadingSection[] = [];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    if (!match) continue;
    const title = cleanText(match[1] ?? '');
    if (!title || EXCLUDED_HEADINGS.test(title)) continue;
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? prepared.length;
    sections.push({
      title,
      slug: slugify(title),
      body: prepared.slice(start, end),
    });
  }

  return sections;
}

export function extractLinks(markdown: string): Resource[] {
  const prepared = prepareMarkdown(markdown);
  const found: Resource[] = [];

  const push = (title: string, url: string, fallback = '') => {
    if (!isExternalHttpUrl(url)) return;
    const cleaned = cleanText(title);
    const resolved =
      !cleaned || cleaned.toLowerCase() === 'link'
        ? cleanText(fallback)
        : cleaned;
    if (!resolved) return;
    found.push(toResource(resolved, url));
  };

  for (const line of prepared.split('\n')) {
    const labelled = [
      ...line.matchAll(/\*\*Link:\*\*\s*\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/gi),
    ];
    if (labelled.length > 0) {
      for (const match of labelled) push(match[1] ?? '', match[2] ?? '');
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/i);
    if (bullet) {
      push(bullet[1] ?? '', bullet[2] ?? '');
      continue;
    }

    const firstCell = line.split('|')[1] ?? '';
    for (const match of line.matchAll(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/gi)) {
      push(match[1] ?? '', match[2] ?? '', firstCell);
    }
  }

  return found;
}

export function extractOutcomes(markdown: string): string[] {
  const prepared = prepareMarkdown(markdown);
  const outcomes = new Set<string>();
  let inOutcomes = false;

  for (const line of prepared.split('\n')) {
    if (/^#{2,3}\s/.test(line)) {
      inOutcomes = /what you'?ll learn|learning objectives?|outcomes?/i.test(line);
    }
    const checkbox = line.match(/^\s*[-*]\s+\[[ x]\]\s+(.+)$/i);
    const bullet = inOutcomes
      ? line.match(/^\s*(?:[-*]\s+|\d+\.\s+)(.+)$/)
      : null;
    const match = checkbox ?? bullet;
    if (!match) continue;
    const value = cleanText(match[1] ?? '');
    if (value.length >= 8 && value.length <= 120) outcomes.add(value);
  }

  return [...outcomes].slice(0, 5);
}

export function groupTitleFor(levelFolder: string): string {
  const names: Record<string, string> = {
    '01-beginner': 'Foundations',
    '02-intermediate': 'Core',
    '03-advanced': 'Production',
  };
  const key = levelFolder.toLowerCase();
  if (names[key]) return names[key];
  return cleanText(levelFolder.replace(/^\d+-/, '').replace(/-/g, ' '));
}

export function isLevelFolder(name: string): boolean {
  return /^\d{2}-/.test(name);
}

export function isResourceFolder(name: string): boolean {
  return RESOURCE_FOLDERS.has(name.toLowerCase());
}
