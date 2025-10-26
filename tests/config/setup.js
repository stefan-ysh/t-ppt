/**
 * 测试环境设置文件
 * 在所有测试运行前进行全局配置
 */

// 扩展 Jest 匹配器
require('@testing-library/jest-dom')

// 全局测试工具
global.testUtils = {
  // 等待函数
  wait: ms => new Promise(resolve => setTimeout(resolve, ms)),

  // 模拟用户事件
  mockUserEvent: {
    click: jest.fn(),
    type: jest.fn(),
    hover: jest.fn(),
  },

  // 模拟 API 响应
  mockApi: {
    success: data =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(data) }),
    error: message => Promise.reject(new Error(message)),
  },
}

// 模拟浏览器 API
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // 废弃的方法
    removeListener: jest.fn(), // 废弃的方法
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// 模拟 ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// 模拟 IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// 模拟 localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// 模拟 sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// 模拟 fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    status: 200,
    statusText: 'OK',
  })
)

// 控制台错误处理
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// 测试前后清理
beforeEach(() => {
  // 清理模拟函数调用历史
  jest.clearAllMocks()

  // 重置 localStorage 和 sessionStorage
  localStorage.clear()
  sessionStorage.clear()

  // 重置 fetch 模拟
  fetch.mockClear()
})

afterEach(() => {
  // 清理 DOM
  document.body.innerHTML = ''

  // 清理定时器（如果使用了假定时器）
  if (jest.isMockFunction(setTimeout)) {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  }
})
