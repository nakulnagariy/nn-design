import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: ['dist/**', 'storybook-static/**', 'coverage/**', 'node_modules/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      // The library re-exports types next to values; allow the `type` keyword to
      // be omitted where it reads more naturally, but flag unused code.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // forwardRef render functions and polymorphic `as` props legitimately need it.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Stories and tests: relax the rules that only make sense for shipped source.
  {
    files: ['**/*.stories.tsx', 'src/examples/**', '**/*.test.{ts,tsx}', 'src/test/**'],
    rules: {
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Node-context config and scripts.
  {
    files: ['*.{js,mjs,ts}', 'scripts/**/*.{js,mjs}', '.storybook/**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.node } },
  },

  ...storybook.configs['flat/recommended'],

  {
    // Prettier owns formatting; disable stylistic rules that would fight it.
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
    },
  },
)
