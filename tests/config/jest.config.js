export default {
  // 测试环境配置
  testEnvironment: 'jsdom',

  // 根目录配置
  rootDir: '../../',
  roots: ['<rootDir>/tests', '<rootDir>/src', '<rootDir>/tools'],

  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/tests/**/*.spec.js',
    '<rootDir>/**/__tests__/**/*.js',
  ],

  // 模块路径映射
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tools/(.*)$': '<rootDir>/tools/$1',
    '^@ppt/(.*)$': '<rootDir>/ppt/$1',
  },

  // 代码覆盖率配置
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    'tools/**/*.js',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/*.config.js',
  ],
  coverageDirectory: '<rootDir>/tests/coverage',
  coverageReporters: ['html', 'text', 'lcov', 'json'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // 设置和清理文件
  setupFilesAfterEnv: ['<rootDir>/tests/config/setup.js'],

  // 模块文件扩展名
  moduleFileExtensions: ['js', 'json', 'vue'],

  // 转换器配置
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },

  // 忽略转换的模块
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@vue/.*|vue-.*|@slidev/.*))',
  ],

  // 全局变量
  globals: {
    'vue-jest': {
      pug: {
        doctype: 'html',
      },
    },
  },

  // 测试超时
  testTimeout: 10000,

  // 详细输出
  verbose: true,

  // 监视文件模式下的忽略模式
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
    '<rootDir>/.git/',
  ],

  // 错误处理
  errorOnDeprecated: true,

  // 快照序列化器
  snapshotSerializers: ['jest-serializer-vue'],

  // 报告器
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './tests/coverage/html-report',
        filename: 'report.html',
        openReport: false,
      },
    ],
  ],
}
