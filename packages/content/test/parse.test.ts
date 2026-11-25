import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  cleanText,
  extractLinks,
  extractOutcomes,
  groupTitleFor,
  headingSections,
  isLevelFolder,
  isResourceFolder,
  prepareMarkdown,
  slugify,
  stripEmoji,
  summaryFromMarkdown,
  titleFromMarkdown,
} from '../src/parse';

const fixture = (name: string) =>
  readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

describe('markdown parsing', () => {
  it('cleans headings, emoji and markdown formatting', () => {
    expect(titleFromMarkdown(fixture('shape-b-topic.md'))).toBe(
      'HTML and CSS Foundations',
    );
    expect(stripEmoji('🚀 Testing')).toBe('Testing');
    expect(cleanText('**Bold** and `code` [link](https://example.com)')).toBe(
      'Bold and code link',
    );
  });

  it('summarises the blockquote and falls back when text is short', () => {
    expect(summaryFromMarkdown(fixture('shape-b-topic.md'))).toContain(
      'Master the foundation',
    );
    expect(summaryFromMarkdown('# Tiny\n\nShort.')).toContain('Curated notes');
  });

  it('splits level headings and drops meta headings', () => {
    const sections = headingSections(fixture('shape-a-level.md'));
    expect(sections.map((section) => section.slug)).toEqual([
      'what-is-nodejs',
      'setup',
    ]);
    expect(prepareMarkdown(fixture('shape-a-level.md'))).not.toContain(
      'ignored.example.com',
    );
    expect(prepareMarkdown(fixture('shape-a-level.md'))).not.toContain(
      'Table of Contents',
    );
  });

  it('extracts bullet, table and labelled links without code links', () => {
    const bullet = extractLinks(fixture('shape-b-topic.md'));
    expect(bullet.map((resource) => resource.url)).toEqual([
      'https://developer.mozilla.org/en-US/docs/Web/HTML',
      'https://webaim.org/resources/contrastchecker/',
      'https://html.spec.whatwg.org/',
    ]);

    const table = extractLinks(fixture('table-links.md'));
    expect(table).toHaveLength(3);
    expect(table[0]?.provider).toBe('Youtube');

    const labelled = extractLinks(fixture('labelled-links.md'));
    expect(labelled.map((resource) => resource.title)).toEqual([
      'LeetCode #23',
      'LeetCode #215',
    ]);

    expect(
      extractLinks(fixture('shape-a-level.md')).some((resource) =>
        resource.url.includes('ignored.example.com'),
      ),
    ).toBe(false);
  });

  it('extracts checkbox and numbered outcomes', () => {
    const outcomes = extractOutcomes(fixture('shape-a-level.md'));
    expect(outcomes).toEqual([
      'Explain the event loop',
      'Run a script with node',
    ]);
  });

  it('classifies folders and normalises labels', () => {
    expect(isLevelFolder('01-Beginner')).toBe(true);
    expect(isLevelFolder('Resources')).toBe(false);
    expect(isResourceFolder('Books')).toBe(true);
    expect(isResourceFolder('HTML-CSS')).toBe(false);
    expect(groupTitleFor('02-Intermediate')).toBe('Core');
    expect(groupTitleFor('Data-Structures')).toBe('Data Structures');
    expect(slugify('Express.js Basics')).toBe('expressjs-basics');
  });
});
