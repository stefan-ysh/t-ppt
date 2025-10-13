/**
 * Playwright E2E 测试配置
 * 用于端到端测试PPT演示功能
 */

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // 测试目录
  testDir: './tests/e2e',

  // 全局超时
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  // 测试运行器配置
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // 报告器
  reporter: [
    ['html', { outputFolder: 'tests/coverage/playwright-report' }],
    ['json', { outputFile: 'tests/coverage/test-results.json' }],
    ['junit', { outputFile: 'tests/coverage/junit-results.xml' }],
  ],

  // 全局设置
  use: {
    baseURL: 'http://localhost:3030',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // 项目配置 - 不同浏览器和设备
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],

  // 本地开发服务器
  webServer: {
    command: 'npm run dev',
    port: 3030,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
