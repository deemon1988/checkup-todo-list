// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    ignores: ['node_modules', 'dist', 'products/bootstrap'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-var': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginPrettier.configs['recommended'].rules,
    },
  },
]);
