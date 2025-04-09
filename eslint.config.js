import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import vuePlugin from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,vue}'],
    ignores: ['dist/**', 'node_modules/**', 'unpackage/**', '.git/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        // Node.js 环境
        process: 'readonly',
        // UniApp 环境
        uni: 'readonly',
        wx: 'readonly',
        plus: 'readonly',
        getApp: 'readonly',
        getCurrentPages: 'readonly'
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {}
  },
  prettier
]
