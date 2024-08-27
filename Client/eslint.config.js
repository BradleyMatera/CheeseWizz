import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPromise from 'eslint-plugin-promise';

export default [
  { ignores: ['dist', 'node_modules'] }, // Ignore distribution and node_modules folders
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
      'jsx-a11y': eslintPluginJsxA11y,
      promise: eslintPluginPromise,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...eslintPluginImport.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...eslintPluginPromise.configs.recommended.rules,

      // Custom rules
      'react/jsx-no-target-blank': 'off', // Disable warning for target="_blank" without rel="noopener noreferrer"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': 'warn', // Warn on console.log statements
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Error on unused variables except those starting with _
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ], // Enforce a specific order for imports
      'jsx-a11y/anchor-is-valid': 'off', // Disable warning for invalid anchor elements (can adjust based on your usage)
      'promise/always-return': 'off', // Disable requirement for return in promise chains
      'promise/catch-or-return': 'error', // Enforce catch or return in promise chains
    },
  },
];