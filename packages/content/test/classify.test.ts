import { describe, expect, it } from 'vitest';
import {
  classifyResource,
  dedupeResources,
  isExternalHttpUrl,
  normaliseUrl,
  providerOf,
  toResource,
} from '../src/classify';

describe('resource classification', () => {
  it('classifies by host', () => {
    expect(classifyResource('https://youtube.com/watch?v=1')).toBe('video');
    expect(classifyResource('https://www.oreilly.com/library/x')).toBe('book');
    expect(classifyResource('https://www.udemy.com/course/node')).toBe('course');
    expect(classifyResource('https://leetcode.com/problems/two-sum')).toBe('practice');
    expect(classifyResource('https://github.com/nodejs/node')).toBe('tool');
    expect(classifyResource('https://developer.mozilla.org/en-US/docs')).toBe('doc');
    expect(classifyResource('not a url')).toBe('doc');
  });

  it('reads a provider and normalises URLs', () => {
    expect(providerOf('https://www.youtube.com/watch?v=1')).toBe('Youtube');
    expect(providerOf('not a url')).toBeUndefined();
    expect(normaliseUrl('https://EXAMPLE.com/docs/?utm_source=x#intro')).toBe(
      'https://example.com/docs',
    );
    expect(normaliseUrl('not a url')).toBe('not a url');
  });

  it('keeps only https links', () => {
    expect(isExternalHttpUrl('https://example.com')).toBe(true);
    expect(isExternalHttpUrl('http://example.com')).toBe(false);
    expect(isExternalHttpUrl('#anchor')).toBe(false);
  });

  it('deduplicates by normalised URL', () => {
    const resources = [
      toResource('Docs', 'https://example.com/docs/'),
      toResource('Docs again', 'https://example.com/docs?utm_source=x'),
      toResource('Video', 'https://youtube.com/watch?v=1'),
    ];
    expect(dedupeResources(resources).map((resource) => resource.title)).toEqual([
      'Docs',
      'Video',
    ]);
  });

  it('falls back to a provider title when the link text is empty', () => {
    expect(toResource('', 'https://example.com/docs').title).toBe('Example');
  });
});
