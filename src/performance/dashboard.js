/**
 * 性能监控仪表板
 * 实时监控网站性能指标和用户体验
 */

class PerformanceDashboard {
  constructor() {
    this.metrics = new Map()
    this.observers = new Map()
    this.reportingEndpoint = '/api/performance'
    this.reportingInterval = 30000 // 30秒
    this.init()
  }

  /**
   * 初始化性能监控
   */
  init() {
    this.setupPerformanceObservers()
    this.setupResourceMonitoring()
    this.setupMemoryMonitoring()
    this.setupNetworkMonitoring()
    this.setupUserInteractionMonitoring()
    this.startReporting()
    this.createDashboardUI()
  }

  /**
   * 设置性能观察器
   */
  setupPerformanceObservers() {
    // Core Web Vitals 监控
    this.observeCoreWebVitals()

    // 页面加载性能
    this.observePageLoad()

    // 长任务监控
    this.observeLongTasks()

    // 布局偏移监控
    this.observeLayoutShift()
  }

  /**
   * 监控 Core Web Vitals
   */
  observeCoreWebVitals() {
    // FCP (首次内容绘制)
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.recordMetric('FCP', entry.startTime, {
            timestamp: Date.now(),
            url: location.href,
          })
        }
      })
    }).observe({ entryTypes: ['paint'] })

    // LCP (最大内容绘制)
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        this.recordMetric('LCP', entry.startTime, {
          timestamp: Date.now(),
          url: location.href,
          element: entry.element ? entry.element.tagName : 'unknown',
        })
      })
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // FID (首次输入延迟) - 使用 INP 作为替代
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        this.recordMetric('INP', entry.processingDuration, {
          timestamp: Date.now(),
          interactionType: entry.name,
          target: entry.target ? entry.target.tagName : 'unknown',
        })
      })
    }).observe({ entryTypes: ['event'] })

    // CLS (累积布局偏移)
    let clsValue = 0
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          this.recordMetric('CLS', clsValue, {
            timestamp: Date.now(),
            sources: entry.sources.map(
              source => source.node?.tagName || 'unknown'
            ),
          })
        }
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }

  /**
   * 监控页面加载性能
   */
  observePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0]

      this.recordMetric(
        'DOM_CONTENT_LOADED',
        navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart
      )
      this.recordMetric(
        'LOAD_EVENT',
        navigation.loadEventEnd - navigation.loadEventStart
      )
      this.recordMetric(
        'DNS_LOOKUP',
        navigation.domainLookupEnd - navigation.domainLookupStart
      )
      this.recordMetric(
        'TCP_CONNECT',
        navigation.connectEnd - navigation.connectStart
      )
      this.recordMetric(
        'REQUEST_TIME',
        navigation.responseEnd - navigation.requestStart
      )
      this.recordMetric(
        'RESPONSE_TIME',
        navigation.responseEnd - navigation.responseStart
      )

      // 计算总的页面加载时间
      const totalLoadTime = navigation.loadEventEnd - navigation.navigationStart
      this.recordMetric('TOTAL_LOAD_TIME', totalLoadTime)
    })
  }

  /**
   * 监控长任务
   */
  observeLongTasks() {
    if ('PerformanceObserver' in window) {
      new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          this.recordMetric('LONG_TASK', entry.duration, {
            timestamp: Date.now(),
            startTime: entry.startTime,
            attribution: entry.attribution || [],
          })
        })
      }).observe({ entryTypes: ['longtask'] })
    }
  }

  /**
   * 监控累积布局偏移
   */
  observeLayoutShift() {
    let clsValue = 0
    const clsSessions = []
    let currentSession = null

    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          if (
            !currentSession ||
            entry.startTime - currentSession.lastEntryTime > 1000
          ) {
            currentSession = {
              value: 0,
              startTime: entry.startTime,
              lastEntryTime: entry.startTime,
            }
            clsSessions.push(currentSession)
          }

          currentSession.value += entry.value
          currentSession.lastEntryTime = entry.startTime
          clsValue = Math.max(...clsSessions.map(s => s.value))

          this.recordMetric('CLS_SESSION', clsValue, {
            sessionCount: clsSessions.length,
            currentSessionValue: currentSession.value,
          })
        }
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }

  /**
   * 设置资源监控
   */
  setupResourceMonitoring() {
    // 监控资源加载
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        this.recordMetric('RESOURCE_LOAD', entry.duration, {
          name: entry.name,
          size: entry.transferSize,
          type: entry.initiatorType,
          cached: entry.transferSize === 0,
        })
      })
    }).observe({ entryTypes: ['resource'] })

    // 监控图片加载
    const images = document.querySelectorAll('img')
    images.forEach(img => {
      if (img.complete) {
        this.recordImageMetric(img)
      } else {
        img.addEventListener('load', () => this.recordImageMetric(img))
        img.addEventListener('error', () => this.recordImageError(img))
      }
    })
  }

  /**
   * 记录图片指标
   */
  recordImageMetric(img) {
    const rect = img.getBoundingClientRect()
    this.recordMetric('IMAGE_LOAD', performance.now(), {
      src: img.src,
      width: rect.width,
      height: rect.height,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      isVisible: rect.top < window.innerHeight && rect.bottom > 0,
    })
  }

  /**
   * 记录图片错误
   */
  recordImageError(img) {
    this.recordMetric('IMAGE_ERROR', 1, {
      src: img.src,
      alt: img.alt,
    })
  }

  /**
   * 设置内存监控
   */
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory
        this.recordMetric('MEMORY_USED', memory.usedJSHeapSize)
        this.recordMetric('MEMORY_TOTAL', memory.totalJSHeapSize)
        this.recordMetric('MEMORY_LIMIT', memory.jsHeapSizeLimit)

        // 内存使用率
        const usage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        this.recordMetric('MEMORY_USAGE_PERCENT', usage)

        // 内存压力警告
        if (usage > 80) {
          console.warn('⚠️ 内存使用率过高:', usage.toFixed(2) + '%')
        }
      }, 5000)
    }
  }

  /**
   * 设置网络监控
   */
  setupNetworkMonitoring() {
    // 监控网络状态
    if ('connection' in navigator) {
      const updateConnection = () => {
        this.recordMetric('NETWORK_TYPE', 0, {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData,
        })
      }

      updateConnection()
      navigator.connection.addEventListener('change', updateConnection)
    }

    // 监控 Fetch 请求
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const start = performance.now()
      try {
        const response = await originalFetch(...args)
        const duration = performance.now() - start

        this.recordMetric('FETCH_REQUEST', duration, {
          url: args[0],
          status: response.status,
          size: response.headers.get('content-length'),
          cached: response.headers.get('x-cache') === 'HIT',
        })

        return response
      } catch (error) {
        const duration = performance.now() - start
        this.recordMetric('FETCH_ERROR', duration, {
          url: args[0],
          error: error.message,
        })
        throw error
      }
    }
  }

  /**
   * 设置用户交互监控
   */
  setupUserInteractionMonitoring() {
    // 点击事件监控
    document.addEventListener('click', event => {
      this.recordMetric('USER_CLICK', 1, {
        target: event.target.tagName,
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now(),
      })
    })

    // 滚动性能监控
    let scrollCount = 0
    let scrollStartTime = null

    document.addEventListener(
      'scroll',
      () => {
        if (!scrollStartTime) {
          scrollStartTime = performance.now()
        }
        scrollCount++
      },
      { passive: true }
    )

    document.addEventListener('scrollend', () => {
      if (scrollStartTime) {
        const duration = performance.now() - scrollStartTime
        this.recordMetric('SCROLL_PERFORMANCE', duration, {
          scrollCount: scrollCount,
          averageTime: duration / scrollCount,
        })
        scrollCount = 0
        scrollStartTime = null
      }
    })
  }

  /**
   * 记录性能指标
   */
  recordMetric(name, value, metadata = {}) {
    const metric = {
      name,
      value,
      timestamp: Date.now(),
      url: location.href,
      userAgent: navigator.userAgent,
      ...metadata,
    }

    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }

    this.metrics.get(name).push(metric)

    // 限制存储的指标数量
    if (this.metrics.get(name).length > 100) {
      this.metrics.get(name).shift()
    }

    // 实时更新仪表板
    this.updateDashboardDisplay()
  }

  /**
   * 创建仪表板UI
   */
  createDashboardUI() {
    // 创建仪表板容器
    const dashboard = document.createElement('div')
    dashboard.id = 'performance-dashboard'
    dashboard.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 300px;
      max-height: 400px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      overflow-y: auto;
      backdrop-filter: blur(10px);
      transform: translateX(310px);
      transition: transform 0.3s ease;
    `

    // 创建切换按钮
    const toggleBtn = document.createElement('button')
    toggleBtn.textContent = '📊'
    toggleBtn.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      background: #007ACC;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10001;
      font-size: 18px;
    `

    let isVisible = false
    toggleBtn.addEventListener('click', () => {
      isVisible = !isVisible
      dashboard.style.transform = isVisible
        ? 'translateX(0)'
        : 'translateX(310px)'
      toggleBtn.style.right = isVisible ? '320px' : '10px'
    })

    // 添加到页面
    document.body.appendChild(dashboard)
    document.body.appendChild(toggleBtn)

    this.dashboardElement = dashboard
    this.updateDashboardDisplay()
  }

  /**
   * 更新仪表板显示
   */
  updateDashboardDisplay() {
    if (!this.dashboardElement) return

    const coreMetrics = [
      'FCP',
      'LCP',
      'CLS',
      'TOTAL_LOAD_TIME',
      'MEMORY_USAGE_PERCENT',
    ]
    let html = '<h3>📊 性能仪表板</h3>'

    coreMetrics.forEach(metricName => {
      const metrics = this.metrics.get(metricName)
      if (metrics && metrics.length > 0) {
        const latest = metrics[metrics.length - 1]
        const avg =
          metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length

        html += `
          <div style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            <strong>${metricName}:</strong><br>
            当前: ${this.formatValue(metricName, latest.value)}<br>
            平均: ${this.formatValue(metricName, avg)}<br>
            样本: ${metrics.length}
          </div>
        `
      }
    })

    // 添加警告信息
    const warnings = this.generateWarnings()
    if (warnings.length > 0) {
      html += '<h4>⚠️ 性能警告</h4>'
      warnings.forEach(warning => {
        html += `<div style="color: #ff6b6b; margin: 4px 0;">• ${warning}</div>`
      })
    }

    // 添加建议
    const suggestions = this.generateSuggestions()
    if (suggestions.length > 0) {
      html += '<h4>💡 优化建议</h4>'
      suggestions.forEach(suggestion => {
        html += `<div style="color: #4ecdc4; margin: 4px 0;">• ${suggestion}</div>`
      })
    }

    this.dashboardElement.innerHTML = html
  }

  /**
   * 格式化数值显示
   */
  formatValue(metricName, value) {
    if (
      metricName.includes('TIME') ||
      metricName === 'FCP' ||
      metricName === 'LCP'
    ) {
      return `${Math.round(value)}ms`
    } else if (metricName === 'CLS') {
      return value.toFixed(3)
    } else if (metricName.includes('PERCENT')) {
      return `${value.toFixed(1)}%`
    } else if (metricName.includes('MEMORY')) {
      return this.formatBytes(value)
    }
    return value.toString()
  }

  /**
   * 格式化字节大小
   */
  formatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }

  /**
   * 生成性能警告
   */
  generateWarnings() {
    const warnings = []

    // FCP 警告
    const fcpMetrics = this.metrics.get('FCP')
    if (fcpMetrics && fcpMetrics.length > 0) {
      const latestFCP = fcpMetrics[fcpMetrics.length - 1].value
      if (latestFCP > 1800) {
        warnings.push('首次内容绘制时间过长 (>1.8s)')
      }
    }

    // LCP 警告
    const lcpMetrics = this.metrics.get('LCP')
    if (lcpMetrics && lcpMetrics.length > 0) {
      const latestLCP = lcpMetrics[lcpMetrics.length - 1].value
      if (latestLCP > 2500) {
        warnings.push('最大内容绘制时间过长 (>2.5s)')
      }
    }

    // CLS 警告
    const clsMetrics = this.metrics.get('CLS')
    if (clsMetrics && clsMetrics.length > 0) {
      const latestCLS = clsMetrics[clsMetrics.length - 1].value
      if (latestCLS > 0.1) {
        warnings.push('累积布局偏移过大 (>0.1)')
      }
    }

    // 内存警告
    const memoryMetrics = this.metrics.get('MEMORY_USAGE_PERCENT')
    if (memoryMetrics && memoryMetrics.length > 0) {
      const latestMemory = memoryMetrics[memoryMetrics.length - 1].value
      if (latestMemory > 80) {
        warnings.push('内存使用率过高 (>80%)')
      }
    }

    return warnings
  }

  /**
   * 生成优化建议
   */
  generateSuggestions() {
    const suggestions = []

    // 长任务建议
    const longTaskMetrics = this.metrics.get('LONG_TASK')
    if (longTaskMetrics && longTaskMetrics.length > 5) {
      suggestions.push('检测到多个长任务，建议分解大任务')
    }

    // 图片优化建议
    const imageErrors = this.metrics.get('IMAGE_ERROR')
    if (imageErrors && imageErrors.length > 0) {
      suggestions.push('修复图片加载错误')
    }

    // 网络优化建议
    const fetchErrors = this.metrics.get('FETCH_ERROR')
    if (fetchErrors && fetchErrors.length > 0) {
      suggestions.push('优化网络请求错误处理')
    }

    return suggestions
  }

  /**
   * 开始性能报告
   */
  startReporting() {
    setInterval(() => {
      this.sendReport()
    }, this.reportingInterval)
  }

  /**
   * 发送性能报告
   */
  async sendReport() {
    const report = this.generateReport()

    try {
      await fetch(this.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      })
    } catch (error) {
      console.warn('性能数据上报失败:', error)
    }
  }

  /**
   * 生成性能报告
   */
  generateReport() {
    const report = {
      timestamp: Date.now(),
      url: location.href,
      userAgent: navigator.userAgent,
      metrics: {},
    }

    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        const latest = values[values.length - 1]
        const avg = values.reduce((sum, m) => sum + m.value, 0) / values.length

        report.metrics[name] = {
          current: latest.value,
          average: avg,
          count: values.length,
          min: Math.min(...values.map(v => v.value)),
          max: Math.max(...values.map(v => v.value)),
        }
      }
    })

    return report
  }

  /**
   * 获取性能摘要
   */
  getPerformanceSummary() {
    return this.generateReport()
  }
}

// 自动启动性能监控
if (typeof window !== 'undefined') {
  window.performanceDashboard = new PerformanceDashboard()

  // 提供全局方法
  window.getPerformanceReport = () =>
    window.performanceDashboard.getPerformanceSummary()
}

export default PerformanceDashboard
