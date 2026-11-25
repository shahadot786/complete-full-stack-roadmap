import { describe, expect, it } from 'vitest';
import { roadmapIndex } from '../data/catalog';
import en from './en.json';

describe('en.json', () => {
  it('contains every namespace the shell needs', () => {
    for (const namespace of [
      'common',
      'brand',
      'nav',
      'home',
      'roadmaps',
      'progress',
      'search',
      'about',
      'contribute',
      'errors',
      'a11y',
      'meta',
    ]) {
      expect(en).toHaveProperty(namespace);
    }
  });

  it('has no empty values', () => {
    const check = (value: unknown): boolean => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (value && typeof value === 'object') {
        return Object.values(value).every(check);
      }
      return false;
    };
    expect(check(en)).toBe(true);
  });

  it('keeps roadmap names in generated content, not UI copy', () => {
    expect(en).not.toHaveProperty('roadmapNames');
    expect(roadmapIndex).toHaveLength(12);
  });
});
