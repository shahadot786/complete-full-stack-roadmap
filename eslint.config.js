import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { noLiteralText } from './tools/eslint-no-literal-text.mjs';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/generated/**',
      '**/.react-router/**',
      'docs/**',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['tools/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['apps/web/app/**/*.{ts,tsx}', 'packages/ui/src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      'stackpath-i18n': { rules: { 'no-literal-text': noLiteralText } },
    },
    rules: {
      'stackpath-i18n/no-literal-text': 'error',
    },
  },
);
