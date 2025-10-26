/**
 * PPT演示功能 E2E 测试
 * 测试完整的演示流程和用户交互
 */

import { test, expect } from '@playwright/test'

test.describe('PPT Presentation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should load presentation home page', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/T-PPT/)

    // 检查主要导航元素
    await expect(
      page.getByRole('heading', { name: /演示文稿制作工具/ })
    ).toBeVisible()

    // 检查演示列表
    const presentationLinks = page.getByRole('link', { name: /演示/ })
    await expect(presentationLinks.first()).toBeVisible()
  })

  test('should navigate to presentation', async ({ page }) => {
    // 点击进入演示
    await page.getByRole('link', { name: /luminescent-materials/ }).click()

    // 等待演示加载
    await page.waitForLoadState('networkidle')

    // 检查演示内容
    await expect(page.getByRole('main')).toBeVisible()

    // 检查导航控件
    await expect(page.getByRole('button', { name: /下一页/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /上一页/ })).toBeVisible()
  })

  test('should support slide navigation', async ({ page }) => {
    await page.goto('/ppt/luminescent-materials/')
    await page.waitForLoadState('networkidle')

    // 获取初始幻灯片信息
    const initialSlideInfo = await page.textContent(
      '[data-testid="slide-info"]'
    )

    // 点击下一页
    await page.getByRole('button', { name: /下一页/ }).click()
    await page.waitForTimeout(500) // 等待动画

    // 检查幻灯片是否改变
    const newSlideInfo = await page.textContent('[data-testid="slide-info"]')
    expect(newSlideInfo).not.toBe(initialSlideInfo)

    // 使用键盘导航
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(500)

    // 使用键盘返回
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(500)
  })

  test('should support full screen mode', async ({ page }) => {
    await page.goto('/ppt/luminescent-materials/')

    // 进入全屏模式
    await page.getByRole('button', { name: /全屏/ }).click()

    // 检查全屏状态
    await expect(page.locator('body')).toHaveClass(/fullscreen/)

    // 退出全屏（ESC键）
    await page.keyboard.press('Escape')

    // 检查退出全屏状态
    await expect(page.locator('body')).not.toHaveClass(/fullscreen/)
  })

  test('should support presenter mode', async ({ page, context }) => {
    await page.goto('/ppt/luminescent-materials/')

    // 点击演讲者模式
    await page.getByRole('button', { name: /演讲者模式/ }).click()

    // 等待新窗口打开
    const presenterPage = await context.waitForEvent('page')
    await presenterPage.waitForLoadState()

    // 检查演讲者窗口内容
    await expect(presenterPage.getByText(/当前幻灯片/)).toBeVisible()
    await expect(presenterPage.getByText(/下一幻灯片/)).toBeVisible()
    await expect(presenterPage.getByText(/演讲备注/)).toBeVisible()

    // 在演讲者窗口中导航
    await presenterPage.getByRole('button', { name: /下一页/ }).click()

    // 检查主窗口是否同步
    await page.waitForTimeout(500)
    // 这里可以添加更多同步检查逻辑

    await presenterPage.close()
  })
})

test.describe('Template System E2E', () => {
  test('should create new presentation from template', async ({ page }) => {
    await page.goto('/')

    // 点击创建新演示
    await page.getByRole('button', { name: /创建新演示/ }).click()

    // 选择模板
    await page.getByRole('button', { name: /学术演示模板/ }).click()

    // 填写项目信息
    await page.getByLabel(/项目名称/).fill('test-presentation')
    await page.getByLabel(/演示标题/).fill('测试演示')

    // 提交创建
    await page.getByRole('button', { name: /创建演示/ }).click()

    // 等待跳转到新演示
    await expect(page).toHaveURL(/\/ppt\/test-presentation\//)

    // 检查演示内容
    await expect(page.getByText(/测试演示/)).toBeVisible()
  })

  test('should apply different themes', async ({ page }) => {
    await page.goto('/ppt/luminescent-materials/')

    // 打开主题选择器
    await page.getByRole('button', { name: /主题设置/ }).click()

    // 选择深色主题
    await page.getByRole('button', { name: /深色主题/ }).click()

    // 检查主题是否应用
    await expect(page.locator('body')).toHaveClass(/theme-dark/)

    // 切换回浅色主题
    await page.getByRole('button', { name: /浅色主题/ }).click()
    await expect(page.locator('body')).toHaveClass(/theme-light/)
  })
})

test.describe('PWA Features', () => {
  test('should work offline', async ({ page, context }) => {
    await page.goto('/ppt/luminescent-materials/')
    await page.waitForLoadState('networkidle')

    // 模拟离线状态
    await context.setOffline(true)

    // 刷新页面，检查是否仍能访问
    await page.reload()
    await page.waitForLoadState('networkidle')

    // 检查离线提示
    await expect(page.getByText(/离线模式/)).toBeVisible()

    // 检查基本功能仍可用
    await expect(page.getByRole('main')).toBeVisible()

    // 恢复在线状态
    await context.setOffline(false)
  })

  test('should show install prompt', async ({ page, context }) => {
    // 模拟PWA安装条件
    await page.goto('/')

    // 等待Service Worker注册
    await page.waitForTimeout(2000)

    // 检查安装按钮（如果支持）
    const installButton = page.getByRole('button', { name: /安装应用/ })
    if (await installButton.isVisible()) {
      await installButton.click()

      // 这里可以添加更多PWA安装逻辑检查
    }
  })

  test('should cache resources for offline use', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 检查Service Worker注册
    const swRegistered = await page.evaluate(() => {
      return 'serviceWorker' in navigator && navigator.serviceWorker.controller
    })

    expect(swRegistered).toBeTruthy()

    // 检查缓存是否工作
    const cacheNames = await page.evaluate(async () => {
      const names = await caches.keys()
      return names
    })

    expect(cacheNames).toContain('ppt-cache-v1')
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    // 设置移动设备视口
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/ppt/luminescent-materials/')

    // 检查移动端布局
    await expect(page.getByRole('button', { name: /菜单/ })).toBeVisible()

    // 检查触摸导航
    await page.touchscreen.swipeLeft(200, 300, 100, 300)
    await page.waitForTimeout(500)

    // 检查响应式导航控件
    const mobileNavControls = page.locator('[data-testid="mobile-nav"]')
    await expect(mobileNavControls).toBeVisible()
  })

  test('should adapt to different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' },
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto('/ppt/luminescent-materials/')

      // 检查布局适应
      const mainContent = page.getByRole('main')
      await expect(mainContent).toBeVisible()

      // 检查字体大小适应
      const headingSize = await page
        .locator('h1')
        .first()
        .evaluate(el => {
          return window.getComputedStyle(el).fontSize
        })

      expect(parseFloat(headingSize)).toBeGreaterThan(0)
    }
  })
})

test.describe('Performance', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/ppt/luminescent-materials/')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    // 页面应在3秒内加载完成
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/ppt/luminescent-materials/')

    // 测量性能指标
    const metrics = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          const vitals = {}

          entries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              vitals.fcp = entry.startTime
            }
            if (entry.entryType === 'largest-contentful-paint') {
              vitals.lcp = entry.startTime
            }
          })

          resolve(vitals)
        }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] })

        // 超时保护
        setTimeout(() => resolve({}), 5000)
      })
    })

    // FCP 应小于 1.8s
    if (metrics.fcp) {
      expect(metrics.fcp).toBeLessThan(1800)
    }

    // LCP 应小于 2.5s
    if (metrics.lcp) {
      expect(metrics.lcp).toBeLessThan(2500)
    }
  })
})
