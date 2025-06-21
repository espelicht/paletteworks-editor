import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'
// import noArrayConcat from 'eslint-plugin-no-array-concat'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  {
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  },
  {
    // root: true,
    // parser: '@typescript-eslint/parser',
    // plugins: {
    //   'no-array-concat': noArrayConcat,
    // },
    // languageOptions: {
    //   parserOptions: {
    //     sourceType: 'module',
    //     project: './tsconfig.json',
    //   },
    // },
    // ignorePatterns: ['*.cjs'],
    // overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
    // settings: {
    //   'svelte3/typescript': () => require('typescript'),
    // },
    // parserOptions: {
    //   sourceType: 'module',
    //   ecmaVersion: 2019,
    //   project: './tsconfig.json',
    // },
    // env: {
    //   browser: true,
    //   es2017: true,
    //   node: true,
    // },
    rules: {
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-restricted-globals': [
        'error',
        'closed',
        'event',
        'fdescribe',
        'name',
        'length',
        'location',
        'parent',
        'top',
      ],
      'no-redeclare': 'off',
      'no-import-assign': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'array-callback-return': 'error',
      // 'no-array-concat/no-array-concat': 'error',
    },
  },
)
