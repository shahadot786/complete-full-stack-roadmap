import type { Resource, ResourceType } from './schema';

const VIDEO_HOSTS = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'bilibili.com',
  'ted.com',
];
const BOOK_HOSTS = [
  'amazon.com',
  'oreilly.com',
  'packtpub.com',
  'leanpub.com',
  'manning.com',
  'pragprog.com',
  'apress.com',
];
const COURSE_HOSTS = [
  'udemy.com',
  'coursera.org',
  'edx.org',
  'pluralsight.com',
  'frontendmasters.com',
  'egghead.io',
  'codecademy.com',
  'kodeco.com',
  'scrimba.com',
];
const PRACTICE_HOSTS = [
  'leetcode.com',
  'hackerrank.com',
  'codewars.com',
  'exercism.org',
  'stackblitz.com',
  'codesandbox.io',
  'replit.com',
];
const TOOL_HOSTS = ['npmjs.com', 'github.com', 'docker.com', 'terraform.io'];

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

export function classifyResource(url: string): ResourceType {
  const host = hostOf(url);
  if (VIDEO_HOSTS.some((value) => host.endsWith(value))) return 'video';
  if (BOOK_HOSTS.some((value) => host.endsWith(value))) return 'book';
  if (COURSE_HOSTS.some((value) => host.endsWith(value))) return 'course';
  if (PRACTICE_HOSTS.some((value) => host.endsWith(value))) return 'practice';
  if (TOOL_HOSTS.some((value) => host.endsWith(value))) return 'tool';
  return 'doc';
}

export function providerOf(url: string): string | undefined {
  const host = hostOf(url);
  if (!host) return undefined;
  const name = host.split('.')[0] ?? host;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function normaliseUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.searchParams.forEach((_, key) => {
      if (key.startsWith('utm_')) parsed.searchParams.delete(key);
    });
    const path = parsed.pathname.replace(/\/+$/, '');
    return `${parsed.protocol}//${parsed.hostname.toLowerCase()}${path}${parsed.search}`;
  } catch {
    return url.trim().toLowerCase();
  }
}

export function isExternalHttpUrl(url: string): boolean {
  return /^https:\/\//i.test(url);
}

export function dedupeResources(resources: Resource[]): Resource[] {
  const seen = new Set<string>();
  const result: Resource[] = [];
  for (const resource of resources) {
    const key = normaliseUrl(resource.url);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(resource);
  }
  return result;
}

export function toResource(title: string, url: string): Resource {
  return {
    type: classifyResource(url),
    title: title.trim().slice(0, 120) || providerOf(url) || 'Resource',
    url: url.trim(),
    provider: providerOf(url),
  };
}
