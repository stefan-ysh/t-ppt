module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // Vue特定规则
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    
    // TypeScript规则  
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    
    // 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': 'warn',
    'no-case-declarations': 'warn',
    'no-useless-escape': 'warn'
  },
  overrides: [
    // 测试文件配置
    {
      files: ['tests/**/*.js', '**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
        node: true
      },
      globals: {
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly'
      }
    },
    // Service Worker文件配置
    {
      files: ['sw.js', 'src/sw-*.js'],
      env: {
        serviceworker: true
      },
      globals: {
        self: 'readonly',
        caches: 'readonly',
        clients: 'readonly',
        registration: 'readonly',
        skipWaiting: 'readonly'
      }
    },
    // Node.js工具文件配置
    {
      files: ['tools/**/*.js', 'scripts/**/*.js', 'build.js'],
      env: {
        node: true
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-case-declarations': 'off',
        'no-useless-escape': 'off'
      }
    }
  ]
}