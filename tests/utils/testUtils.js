/**
 * 测试工具类库
 * 提供常用的测试辅助函数和模拟工具
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { nextTick } from 'vue'

/**
 * Vue 组件测试工具
 */
export class VueTestUtils {
  /**
   * 渲染 Vue 组件并提供测试工具
   * @param {Component} component - Vue 组件
   * @param {Object} options - 渲染选项
   * @returns {Object} 测试工具对象
   */
  static renderComponent(component, options = {}) {
    const wrapper = render(component, {
      global: {
        plugins: options.plugins || [],
        mocks: options.mocks || {},
      },
      props: options.props || {},
    })

    return {
      wrapper,
      // 查找元素的便捷方法
      findByTestId: testId => screen.findByTestId(testId),
      findByText: text => screen.findByText(text),
      findByRole: role => screen.findByRole(role),

      // 事件触发
      click: async element => {
        await fireEvent.click(element)
        await nextTick()
      },

      type: async (element, text) => {
        await fireEvent.update(element, text)
        await nextTick()
      },

      // 等待异步操作
      waitFor: waitFor,
      nextTick: nextTick,
    }
  }

  /**
   * 创建模拟的 Vue Router
   */
  static createMockRouter(routes = []) {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      currentRoute: {
        value: {
          path: '/',
          params: {},
          query: {},
          hash: '',
        },
      },
      resolve: jest.fn(to => ({ href: to })),
    }
  }
}

/**
 * Slidev 特定测试工具
 */
export class SlidevTestUtils {
  /**
   * 模拟 Slidev 上下文
   */
  static createSlidevContext() {
    return {
      $slidev: {
        nav: {
          currentPage: 1,
          total: 10,
          go: jest.fn(),
          next: jest.fn(),
          prev: jest.fn(),
        },
        configs: {
          title: 'Test Presentation',
          theme: 'default',
        },
      },
    }
  }

  /**
   * 模拟幻灯片导航
   */
  static mockSlideNavigation() {
    return {
      goToSlide: jest.fn(),
      nextSlide: jest.fn(),
      prevSlide: jest.fn(),
      isFirstSlide: jest.fn(() => false),
      isLastSlide: jest.fn(() => false),
    }
  }
}

/**
 * 性能测试工具
 */
export class PerformanceTestUtils {
  /**
   * 测量函数执行时间
   * @param {Function} fn - 要测量的函数
   * @returns {Promise<{result: any, duration: number}>}
   */
  static async measureExecutionTime(fn) {
    const start = performance.now()
    const result = await fn()
    const duration = performance.now() - start

    return { result, duration }
  }

  /**
   * 测试内存使用情况
   */
  static getMemoryUsage() {
    if (performance.memory) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
      }
    }
    return null
  }

  /**
   * 模拟慢网络条件
   */
  static simulateSlowNetwork(delay = 1000) {
    const originalFetch = global.fetch
    global.fetch = jest.fn((...args) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(originalFetch(...args))
        }, delay)
      })
    })

    return () => {
      global.fetch = originalFetch
    }
  }
}

/**
 * 模拟数据生成器
 */
export class MockDataGenerator {
  /**
   * 生成随机字符串
   */
  static randomString(length = 10) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * 生成模拟的幻灯片数据
   */
  static generateSlideData(count = 5) {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: `Slide ${index + 1}`,
      content: `Content for slide ${index + 1}`,
      layout: 'default',
      frontmatter: {
        layout: 'default',
        title: `Slide ${index + 1}`,
      },
    }))
  }

  /**
   * 生成模拟的用户数据
   */
  static generateUserData() {
    return {
      id: Math.floor(Math.random() * 1000),
      name: this.randomString(8),
      email: `${this.randomString(5)}@example.com`,
      avatar: `https://via.placeholder.com/64`,
      createdAt: new Date().toISOString(),
    }
  }
}

/**
 * 文件系统测试工具
 */
export class FileSystemTestUtils {
  /**
   * 模拟文件读取
   */
  static mockFileRead(filename, content) {
    const fs = require('fs')
    jest.spyOn(fs, 'readFileSync').mockImplementation(file => {
      if (file.includes(filename)) {
        return content
      }
      return fs.readFileSync.mockRestore() && fs.readFileSync(file)
    })
  }

  /**
   * 模拟文件写入
   */
  static mockFileWrite() {
    const fs = require('fs')
    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {})
    return writeFileSyncSpy
  }

  /**
   * 模拟文件存在检查
   */
  static mockFileExists(filename, exists = true) {
    const fs = require('fs')
    jest.spyOn(fs, 'existsSync').mockImplementation(file => {
      if (file.includes(filename)) {
        return exists
      }
      return true
    })
  }
}

// 导出默认工具集合
export default {
  VueTestUtils,
  SlidevTestUtils,
  PerformanceTestUtils,
  MockDataGenerator,
  FileSystemTestUtils,
}
