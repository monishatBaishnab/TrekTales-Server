import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin'; // Correct import for the plugin
import parser from '@typescript-eslint/parser'; // Import the parser
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    files: ['src/**/*.ts'], // Specify TypeScript files
    ignores: ['node_modules/**', 'dist/**'], // Add your ignore patterns here

    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: parser, // Specify the parser
      parserOptions: {
        project: './tsconfig.json', // Specify your TypeScript config
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin, // Register the TypeScript ESLint plugin
      'unused-imports': unusedImports,
    },
    rules: {
      // Your custom rules or extend recommended configurations
      ...pluginJs.configs.recommended.rules,
      ...tseslintPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      'unused-imports/no-unused-imports-ts': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
