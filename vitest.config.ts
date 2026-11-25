import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['apps/**/*.test.ts', 'packages/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/generated/**'],
    coverage: {
      provider: 'v8',
      include: [
        'packages/content/src/schema.ts',
        'packages/content/src/parse.ts',
        'packages/content/src/classify.ts',
        'packages/content/src/generate.ts',
        'packages/content/src/validate.ts',
      ],
      reporter: ['text', 'json-summary'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
  },
});
