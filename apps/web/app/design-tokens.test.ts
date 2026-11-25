import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('./app.css', import.meta.url), 'utf8');

function tokens(block: string) {
  return [...block.matchAll(/--sp-[a-z-]+:/g)]
    .map((match) => match[0])
    .filter((token) => !token.includes('font'));
}

describe('design tokens', () => {
  it('defines paper as the default theme', () => {
    expect(css).toContain(':root {');
  });

  it('gives blueprint the same tokens as paper', () => {
    const paperBlock = css.slice(
      css.indexOf(':root {'),
      css.indexOf("[data-theme='blueprint']"),
    );
    const blueprintBlock = css.slice(
      css.indexOf("[data-theme='blueprint']"),
      css.indexOf('@theme inline'),
    );
    expect(tokens(blueprintBlock).sort()).toEqual(tokens(paperBlock).sort());
  });

  it('maps every token into the Tailwind theme', () => {
    const themeBlock = css.slice(css.indexOf('@theme inline'));
    const paperBlock = css.slice(
      css.indexOf(':root {'),
      css.indexOf("[data-theme='blueprint']"),
    );
    for (const token of tokens(paperBlock)) {
      expect(themeBlock).toContain(token.slice(0, -1));
    }
  });
});
