import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint, { plugin } from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

// Removendo "extends" e "plugins" dos configs recomendados
const { extends: _, plugins: __, ...jsRecommended } = js.configs.recommended

const tsRecommended = tseslint.configs.recommended.map(conf => {
  const { extends: _e, plugins: _p, ...rest } = conf
  return { plugins: { '@typescript-eslint': plugin }, ...rest }
})

const { extends: _p, plugins: _pp, ...prettierRecommended } = eslintPluginPrettier.configs.recommended

const { extends: _plugin, plugins: _pluginPlugins, ...pluginRecommendedWithoutPlugins } = plugin.configs.recommended
const pluginRecommended = { plugins: { '@typescript-eslint': plugin }, ...pluginRecommendedWithoutPlugins }

export default [
  jsRecommended,
  ...tsRecommended,
  prettierRecommended,
  pluginRecommended,
  {
    ignores: ['dist', 'vite.config.ts'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // Alteração aqui: defina a chave como "prettier" e não "eslint-plugin-prettier"
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': plugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
