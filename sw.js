// Service Worker for PPT Showcase
// 提供静态资源缓存和离线体验

const CACHE_NAME = 'ppt-showcase-v1.0.0'
const CACHE_URLS = [
  '/',
  '/index.html',
  '/src/styles/globals.css',
  // 动态添加 PPT 相关资源
]

// 安装事件 - 预缓存核心资源
self.addEventListener('install', event => {
  console.log('[SW] Installing...')

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching core resources')
        return cache.addAll(CACHE_URLS)
      })
      .then(() => self.skipWaiting())
  )
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('[SW] Activating...')

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// 拦截请求 - 缓存策略
self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)

  // 跳过非 HTTP(S) 请求
  if (!url.protocol.startsWith('http')) {
    return
  }

  event.respondWith(handleRequest(request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  try {
    // 策略1: PPT HTML文件 - 网络优先，缓存备用
    if (pathname.includes('/ppt/') && pathname.endsWith('.html')) {
      return await networkFirst(request)
    }

    // 策略2: 图片和媒体文件 - 缓存优先
    if (isStaticAsset(pathname)) {
      return await cacheFirst(request)
    }

    // 策略3: API 和动态内容 - 网络优先
    if (pathname.startsWith('/api/') || pathname.includes('?')) {
      return await networkFirst(request)
    }

    // 策略4: 其他静态资源 - 缓存优先，网络备用
    return await cacheFirst(request)
  } catch (error) {
    console.warn('[SW] Request failed:', pathname, error)

    // 离线回退页面
    if (request.mode === 'navigate') {
      return await getOfflinePage()
    }

    // 返回网络响应或错误
    throw error
  }
}

// 缓存优先策略
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    // 后台更新缓存
    updateCache(request)
    return cachedResponse
  }

  // 从网络获取并缓存
  const networkResponse = await fetch(request)
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone())
  }

  return networkResponse
}

// 网络优先策略
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      // 更新缓存
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    // 网络失败，尝试从缓存获取
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    throw error
  }
}

// 后台更新缓存
async function updateCache(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      await cache.put(request, networkResponse)
      console.log('[SW] Cache updated:', request.url)
    }
  } catch (error) {
    // 静默失败
  }
}

// 判断是否为静态资源
function isStaticAsset(pathname) {
  const staticExtensions = [
    '.css',
    '.js',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
    '.svg',
    '.ico',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.mp4',
    '.webm',
    '.ogg',
    '.mp3',
    '.wav',
  ]

  return staticExtensions.some(ext => pathname.endsWith(ext))
}

// 获取离线页面
async function getOfflinePage() {
  const cache = await caches.open(CACHE_NAME)

  // 尝试返回首页
  const response = await cache.match('/index.html')
  if (response) return response

  // 创建简单的离线页面
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>离线模式 - PPT展示站</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
            }
            .offline-content {
                max-width: 400px;
                padding: 2rem;
            }
            .emoji { font-size: 3rem; margin-bottom: 1rem; }
            h1 { margin-bottom: 1rem; }
            p { opacity: 0.9; line-height: 1.6; }
            button {
                margin-top: 1rem;
                padding: 0.8rem 1.5rem;
                background: rgba(255,255,255,0.2);
                border: 2px solid rgba(255,255,255,0.3);
                color: white;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
            }
            button:hover {
                background: rgba(255,255,255,0.3);
                transform: translateY(-1px);
            }
        </style>
    </head>
    <body>
        <div class="offline-content">
            <div class="emoji">📱</div>
            <h1>当前处于离线模式</h1>
            <p>网络连接似乎有问题，但不用担心！我们已经缓存了一些内容供您离线浏览。</p>
            <button onclick="window.location.reload()">重新连接</button>
        </div>
    </body>
    </html>
  `

  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' },
  })
}

// 消息处理
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    getCacheInfo().then(info => {
      event.ports[0].postMessage(info)
    })
  }
})

// 获取缓存信息
async function getCacheInfo() {
  const cache = await caches.open(CACHE_NAME)
  const keys = await cache.keys()

  let totalSize = 0
  const items = []

  for (const request of keys) {
    const response = await cache.match(request)
    if (response) {
      const size = await getResponseSize(response)
      totalSize += size
      items.push({
        url: request.url,
        size: size,
      })
    }
  }

  return {
    name: CACHE_NAME,
    itemCount: items.length,
    totalSize: totalSize,
    items: items.slice(0, 10), // 只返回前10个项目
  }
}

// 获取响应大小
async function getResponseSize(response) {
  try {
    const cloned = response.clone()
    const blob = await cloned.blob()
    return blob.size
  } catch {
    return 0
  }
}

console.log('[SW] Service Worker loaded successfully')
