/**
 * Service Worker 注册和管理工具
 * 提供缓存管理、离线体验和性能监控
 */

class ServiceWorkerManager {
  constructor() {
    this.swRegistration = null
    this.isOnline = navigator.onLine
    this.cacheInfo = null

    this.init()
  }

  async init() {
    // 检查 Service Worker 支持
    if ('serviceWorker' in navigator) {
      try {
        await this.registerServiceWorker()
        this.setupEventListeners()
        this.showInstallPrompt()
      } catch (error) {
        console.warn('Service Worker registration failed:', error)
      }
    }
  }

  async registerServiceWorker() {
    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      })

      console.log('🚀 Service Worker registered successfully')

      // 监听更新
      this.swRegistration.addEventListener('updatefound', () => {
        this.handleUpdate()
      })

      // 检查是否有等待中的 SW
      if (this.swRegistration.waiting) {
        this.showUpdateNotification()
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      throw error
    }
  }

  setupEventListeners() {
    // 网络状态监听
    window.addEventListener('online', () => {
      this.isOnline = true
      this.hideOfflineNotification()
      console.log('📶 Network restored')
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
      this.showOfflineNotification()
      console.log('📵 Network offline')
    })

    // Service Worker 消息监听
    navigator.serviceWorker.addEventListener('message', event => {
      this.handleServiceWorkerMessage(event)
    })
  }

  handleUpdate() {
    const newWorker = this.swRegistration.installing

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          // 有新版本可用
          this.showUpdateNotification()
        }
      }
    })
  }

  handleServiceWorkerMessage(event) {
    const { type, data } = event.data

    switch (type) {
      case 'CACHE_UPDATED':
        console.log('📦 Cache updated:', data.url)
        break
      case 'OFFLINE_FALLBACK':
        console.log('🔌 Serving offline content')
        break
    }
  }

  showInstallPrompt() {
    // 只在首次访问时显示
    if (!localStorage.getItem('sw-install-prompted')) {
      setTimeout(() => {
        this.createNotification({
          type: 'install',
          title: '🚀 离线功能已启用',
          message: '现在您可以离线浏览 PPT 内容了！',
          actions: ['知道了'],
          duration: 5000,
        })
        localStorage.setItem('sw-install-prompted', 'true')
      }, 2000)
    }
  }

  showUpdateNotification() {
    this.createNotification({
      type: 'update',
      title: '🔄 发现新版本',
      message: '点击更新以获取最新功能',
      actions: ['更新', '稍后'],
      persistent: true,
      onAction: action => {
        if (action === '更新') {
          this.updateServiceWorker()
        }
      },
    })
  }

  showOfflineNotification() {
    if (!this.isOnline) {
      this.createNotification({
        type: 'offline',
        title: '📵 当前离线',
        message: '正在使用缓存内容，部分功能可能受限',
        actions: ['了解'],
        duration: 4000,
      })
    }
  }

  hideOfflineNotification() {
    const notification = document.querySelector(
      '.sw-notification[data-type="offline"]'
    )
    if (notification) {
      notification.remove()
    }
  }

  updateServiceWorker() {
    if (this.swRegistration && this.swRegistration.waiting) {
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }

  createNotification({
    type,
    title,
    message,
    actions = [],
    duration = 0,
    persistent = false,
    onAction,
  }) {
    // 移除现有的相同类型通知
    const existing = document.querySelector(
      `.sw-notification[data-type="${type}"]`
    )
    if (existing) {
      existing.remove()
    }

    const notification = document.createElement('div')
    notification.className = 'sw-notification'
    notification.setAttribute('data-type', type)

    notification.innerHTML = `
      <div class="sw-notification-content">
        <div class="sw-notification-title">${title}</div>
        <div class="sw-notification-message">${message}</div>
        ${
          actions.length > 0
            ? `
          <div class="sw-notification-actions">
            ${actions
              .map(
                action => `
              <button class="sw-notification-action" data-action="${action}">
                ${action}
              </button>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }
      </div>
      ${!persistent ? '<button class="sw-notification-close">&times;</button>' : ''}
    `

    // 添加样式
    this.addNotificationStyles()

    // 添加事件监听
    notification.querySelectorAll('.sw-notification-action').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.getAttribute('data-action')
        if (onAction) onAction(action)
        if (!persistent) notification.remove()
      })
    })

    const closeButton = notification.querySelector('.sw-notification-close')
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        notification.remove()
      })
    }

    // 添加到页面
    document.body.appendChild(notification)

    // 自动隐藏
    if (duration > 0 && !persistent) {
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.opacity = '0'
          setTimeout(() => notification.remove(), 300)
        }
      }, duration)
    }

    // 显示动画
    setTimeout(() => {
      notification.classList.add('show')
    }, 100)
  }

  addNotificationStyles() {
    if (document.querySelector('#sw-notification-styles')) return

    const styles = document.createElement('style')
    styles.id = 'sw-notification-styles'
    styles.textContent = `
      .sw-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 350px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        border-left: 4px solid #4CAF50;
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10000;
        opacity: 0;
      }
      
      .sw-notification.show {
        transform: translateX(0);
        opacity: 1;
      }
      
      .sw-notification[data-type="update"] {
        border-left-color: #2196F3;
      }
      
      .sw-notification[data-type="offline"] {
        border-left-color: #FF9800;
      }
      
      .sw-notification-content {
        padding: 16px;
        padding-right: 40px;
      }
      
      .sw-notification-title {
        font-weight: 600;
        margin-bottom: 4px;
        color: #333;
        font-size: 14px;
      }
      
      .sw-notification-message {
        font-size: 13px;
        color: #666;
        line-height: 1.4;
        margin-bottom: 12px;
      }
      
      .sw-notification-actions {
        display: flex;
        gap: 8px;
      }
      
      .sw-notification-action {
        padding: 6px 12px;
        border: 1px solid #ddd;
        background: #f5f5f5;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .sw-notification-action:hover {
        background: #e0e0e0;
      }
      
      .sw-notification-action:first-child {
        background: #2196F3;
        color: white;
        border-color: #2196F3;
      }
      
      .sw-notification-action:first-child:hover {
        background: #1976D2;
      }
      
      .sw-notification-close {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #999;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .sw-notification-close:hover {
        color: #666;
      }
      
      @media (max-width: 480px) {
        .sw-notification {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
          transform: translateY(-100px);
        }
        
        .sw-notification.show {
          transform: translateY(0);
        }
      }
    `

    document.head.appendChild(styles)
  }

  // 获取缓存信息
  async getCacheInfo() {
    if (!this.swRegistration || !this.swRegistration.active) {
      return null
    }

    return new Promise(resolve => {
      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = event => {
        resolve(event.data)
      }

      this.swRegistration.active.postMessage({ type: 'GET_CACHE_INFO' }, [
        messageChannel.port2,
      ])
    })
  }

  // 清理缓存
  async clearCache() {
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
      console.log('🗑️ All caches cleared')
      return true
    }
    return false
  }

  // 获取状态信息
  getStatus() {
    return {
      supported: 'serviceWorker' in navigator,
      registered: !!this.swRegistration,
      active: !!(this.swRegistration && this.swRegistration.active),
      online: this.isOnline,
      scope: this.swRegistration ? this.swRegistration.scope : null,
    }
  }
}

// 全局实例
window.swManager = new ServiceWorkerManager()

// 调试工具（开发环境）
if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) {
  window.swDebug = {
    getStatus: () => window.swManager.getStatus(),
    getCacheInfo: () => window.swManager.getCacheInfo(),
    clearCache: () => window.swManager.clearCache(),
    update: () => window.swManager.updateServiceWorker(),
  }

  console.log('🔧 SW Debug tools available: window.swDebug')
}
