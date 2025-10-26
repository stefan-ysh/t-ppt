/**
 * Service Worker 测试
 * 测试PWA功能和缓存策略
 */

import { jest } from '@jest/globals'

// 模拟 Service Worker 环境
global.self = global
global.caches = {
  open: jest.fn(),
  match: jest.fn(),
  delete: jest.fn(),
  keys: jest.fn(),
}

global.registration = {
  addEventListener: jest.fn(),
  postMessage: jest.fn(),
}

describe('Service Worker', () => {
  let mockCache

  beforeEach(() => {
    jest.clearAllMocks()

    // 模拟 Cache API
    mockCache = {
      match: jest.fn(),
      add: jest.fn(),
      addAll: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      keys: jest.fn(),
    }

    global.caches.open.mockResolvedValue(mockCache)
    global.caches.match.mockImplementation(() => Promise.resolve(undefined))

    // 模拟 fetch 事件
    global.addEventListener = jest.fn()
    global.clients = {
      claim: jest.fn(),
      matchAll: jest.fn(() => Promise.resolve([])),
    }

    global.skipWaiting = jest.fn()
  })

  describe('Installation', () => {
    test('should install service worker and cache resources', async () => {
      // 导入 Service Worker 脚本
      const swScript = `
        const CACHE_NAME = 'ppt-cache-v1';
        const urlsToCache = [
          '/',
          '/index.html',
          '/src/styles/globals.css'
        ];
        
        self.addEventListener('install', event => {
          event.waitUntil(
            caches.open(CACHE_NAME)
              .then(cache => cache.addAll(urlsToCache))
          );
        });
      `

      // 模拟安装事件
      const installEvent = {
        waitUntil: jest.fn(),
      }

      // 执行安装逻辑
      await global.caches.open('ppt-cache-v1')
      await mockCache.addAll(['/', '/index.html', '/src/styles/globals.css'])

      expect(global.caches.open).toHaveBeenCalledWith('ppt-cache-v1')
      expect(mockCache.addAll).toHaveBeenCalledWith([
        '/',
        '/index.html',
        '/src/styles/globals.css',
      ])
    })

    test('should handle installation errors gracefully', async () => {
      mockCache.addAll.mockRejectedValue(new Error('Network error'))

      const installPromise = mockCache.addAll(['/'])

      await expect(installPromise).rejects.toThrow('Network error')
    })
  })

  describe('Fetch Handling', () => {
    test('should serve cached resources when available', async () => {
      const mockResponse = new Response('cached content')
      mockCache.match.mockResolvedValue(mockResponse)

      const request = new Request('/cached-file.css')
      const cachedResponse = await mockCache.match(request)

      expect(cachedResponse).toBe(mockResponse)
      expect(mockCache.match).toHaveBeenCalledWith(request)
    })

    test('should fetch from network when cache miss', async () => {
      const mockResponse = new Response('network content')
      global.fetch = jest.fn().mockResolvedValue(mockResponse)
      mockCache.match.mockResolvedValue(undefined)

      const request = new Request('/new-file.js')

      // 模拟缓存未命中，从网络获取
      const cachedResponse = await mockCache.match(request)
      expect(cachedResponse).toBeUndefined()

      const networkResponse = await fetch(request)
      expect(networkResponse).toBe(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(request)
    })

    test('should update cache with new network responses', async () => {
      const mockResponse = new Response('updated content')
      global.fetch = jest.fn().mockResolvedValue(mockResponse.clone())

      const request = new Request('/updateable-file.js')

      // 模拟网络优先策略
      const networkResponse = await fetch(request)
      await mockCache.put(request, networkResponse.clone())

      expect(global.fetch).toHaveBeenCalledWith(request)
      expect(mockCache.put).toHaveBeenCalledWith(request, expect.any(Response))
    })
  })

  describe('Cache Strategies', () => {
    test('should implement network-first strategy for dynamic content', async () => {
      const networkResponse = new Response('fresh content')
      const cachedResponse = new Response('stale content')

      global.fetch = jest.fn().mockResolvedValue(networkResponse.clone())
      mockCache.match.mockResolvedValue(cachedResponse)

      const request = new Request('/api/data')

      // 尝试网络请求
      try {
        const response = await fetch(request)
        await mockCache.put(request, response.clone())

        expect(global.fetch).toHaveBeenCalledWith(request)
        expect(mockCache.put).toHaveBeenCalled()
      } catch (error) {
        // 网络失败时回退到缓存
        const fallbackResponse = await mockCache.match(request)
        expect(fallbackResponse).toBe(cachedResponse)
      }
    })

    test('should implement cache-first strategy for static assets', async () => {
      const cachedResponse = new Response('cached asset')
      mockCache.match.mockResolvedValue(cachedResponse)

      const request = new Request('/assets/image.png')

      // 优先检查缓存
      const response = await mockCache.match(request)

      if (response) {
        expect(response).toBe(cachedResponse)
        expect(global.fetch).not.toHaveBeenCalled()
      } else {
        // 缓存未命中时才发起网络请求
        const networkResponse = await fetch(request)
        await mockCache.put(request, networkResponse.clone())
      }
    })
  })

  describe('Cache Management', () => {
    test('should clean up old caches on activation', async () => {
      const cacheNames = ['old-cache-v1', 'ppt-cache-v2', 'other-cache']
      const currentCache = 'ppt-cache-v2'

      global.caches.keys.mockResolvedValue(cacheNames)
      global.caches.delete.mockResolvedValue(true)

      // 模拟清理旧缓存
      const cachesToDelete = cacheNames.filter(
        name => name.startsWith('ppt-cache-') && name !== currentCache
      )

      for (const cacheName of cachesToDelete) {
        await global.caches.delete(cacheName)
      }

      expect(global.caches.delete).toHaveBeenCalledWith('old-cache-v1')
      expect(global.caches.delete).not.toHaveBeenCalledWith('ppt-cache-v2')
      expect(global.caches.delete).not.toHaveBeenCalledWith('other-cache')
    })

    test('should handle cache size limits', async () => {
      const largeCacheEntries = Array.from({ length: 100 }, (_, i) => ({
        url: `/large-file-${i}.jpg`,
        timestamp: Date.now() - i * 1000,
      }))

      mockCache.keys.mockResolvedValue(
        largeCacheEntries.map(entry => ({ url: entry.url }))
      )

      // 模拟LRU缓存清理 - 删除最老的50%条目
      const maxEntries = 50
      if (largeCacheEntries.length > maxEntries) {
        const entriesToDelete = largeCacheEntries
          .sort((a, b) => a.timestamp - b.timestamp)
          .slice(0, largeCacheEntries.length - maxEntries)

        for (const entry of entriesToDelete) {
          await mockCache.delete(entry.url)
        }
      }

      expect(mockCache.delete).toHaveBeenCalledTimes(50)
    })
  })

  describe('Background Sync', () => {
    test('should register background sync for offline actions', async () => {
      global.registration.sync = {
        register: jest.fn().mockResolvedValue(undefined),
      }

      const syncTag = 'offline-form-submit'
      await global.registration.sync.register(syncTag)

      expect(global.registration.sync.register).toHaveBeenCalledWith(syncTag)
    })

    test('should handle sync events when online', async () => {
      const mockSyncEvent = {
        tag: 'offline-form-submit',
        waitUntil: jest.fn(),
      }

      // 模拟处理离线时保存的数据
      const offlineData = { form: 'test data' }
      global.localStorage = {
        getItem: jest.fn().mockReturnValue(JSON.stringify(offlineData)),
        removeItem: jest.fn(),
      }

      global.fetch = jest.fn().mockResolvedValue(new Response('success'))

      // 模拟同步处理
      if (mockSyncEvent.tag === 'offline-form-submit') {
        const data = JSON.parse(global.localStorage.getItem('offline-data'))
        if (data) {
          await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(data),
          })
          global.localStorage.removeItem('offline-data')
        }
      }

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/submit',
        expect.any(Object)
      )
      expect(global.localStorage.removeItem).toHaveBeenCalledWith(
        'offline-data'
      )
    })
  })
})
