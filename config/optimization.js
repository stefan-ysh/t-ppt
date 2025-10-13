/**
 * CDN和缓存优化配置
 * 提供资源压缩、CDN配置和缓存策略
 */

// Vite构建配置增强
export const buildOptimization = {
  // 资源压缩配置
  compression: {
    gzip: true,
    brotli: true,
    threshold: 1024, // 1KB以上的文件才压缩
    algorithm: 'gzip',
    level: 9,
  },

  // 代码分割策略
  codeSplitting: {
    chunks: 'all',
    minSize: 20000,
    maxSize: 244000,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        priority: 10,
      },
      slidev: {
        test: /[\\/]node_modules[\\/]@slidev[\\/]/,
        name: 'slidev',
        chunks: 'all',
        priority: 20,
      },
      common: {
        minChunks: 2,
        name: 'common',
        chunks: 'all',
        priority: 5,
      },
    },
  },

  // 资源优化
  assets: {
    // 图片优化
    images: {
      formats: ['avif', 'webp', 'jpg'],
      quality: 85,
      progressive: true,
      sizes: [480, 768, 1024, 1200, 1920],
    },

    // 字体优化
    fonts: {
      preload: ['main.woff2'],
      display: 'swap',
      subset: true,
    },

    // 小文件内联
    inlineLimit: 4096, // 4KB以下内联
  },

  // 缓存策略
  cache: {
    // 静态资源长期缓存
    static: {
      'Cache-Control': 'public, max-age=31536000, immutable', // 1年
      pattern: /\.(js|css|png|jpg|jpeg|gif|svg|woff2?)$/,
    },

    // HTML短期缓存
    html: {
      'Cache-Control': 'public, max-age=3600, must-revalidate', // 1小时
      pattern: /\.html$/,
    },

    // API响应缓存
    api: {
      'Cache-Control': 'public, max-age=300', // 5分钟
      pattern: /\/api\//,
    },
  },
}

// Vercel部署配置
export const vercelConfig = {
  version: 2,
  builds: [
    {
      src: 'package.json',
      use: '@vercel/static-build',
      config: {
        distDir: 'dist',
      },
    },
  ],
  routes: [
    {
      src: '/(.*\\.(js|css|png|jpg|jpeg|gif|svg|woff2?))',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    {
      src: '/sw.js',
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
    {
      src: '/(.*)',
      dest: '/$1',
    },
  ],
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
}

// Netlify部署配置
export const netlifyConfig = {
  build: {
    publish: 'dist',
    command: 'npm run build',
  },
  headers: [
    {
      for: '/*',
      values: {
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'X-Content-Type-Options': 'nosniff',
      },
    },
    {
      for: '/assets/*',
      values: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    {
      for: '/sw.js',
      values: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
  ],
  redirects: [
    {
      from: '/api/*',
      to: '/.netlify/functions/:splat',
      status: 200,
    },
  ],
}

// CDN配置建议
export const cdnRecommendations = {
  // 免费CDN选项
  free: [
    {
      name: 'jsDelivr',
      url: 'https://cdn.jsdelivr.net',
      features: ['GitHub集成', '自动压缩', '全球CDN'],
      setup: '直接引用GitHub文件',
    },
    {
      name: 'Cloudflare',
      url: 'https://www.cloudflare.com',
      features: ['免费SSL', 'DDoS防护', '缓存优化'],
      setup: '修改DNS解析',
    },
  ],

  // 付费CDN选项
  premium: [
    {
      name: 'AWS CloudFront',
      features: ['全球边缘节点', '实时日志', 'Lambda@Edge'],
      pricing: '按使用量付费',
    },
    {
      name: '阿里云CDN',
      features: ['国内优化', 'HTTPS加速', '实时监控'],
      pricing: '包年包月',
    },
  ],
}

// 性能优化检查清单
export const performanceChecklist = {
  // 构建优化
  build: [
    '✅ 启用Gzip/Brotli压缩',
    '✅ 代码分割和懒加载',
    '✅ Tree Shaking移除无用代码',
    '✅ 压缩图片和字体',
    '✅ 内联小文件',
    '✅ 生成Source Map',
  ],

  // 缓存策略
  caching: [
    '✅ 静态资源长期缓存',
    '✅ HTML文件短期缓存',
    '✅ Service Worker缓存',
    '✅ 浏览器缓存策略',
    '✅ CDN边缘缓存',
  ],

  // 网络优化
  network: [
    '✅ HTTP/2启用',
    '✅ 资源预加载',
    '✅ DNS预解析',
    '✅ 连接预建立',
    '✅ 关键资源优先级',
  ],

  // 运行时优化
  runtime: [
    '✅ 虚拟滚动',
    '✅ 图片懒加载',
    '✅ 组件懒加载',
    '✅ 防抖和节流',
    '✅ 内存泄漏检测',
  ],
}

export default {
  buildOptimization,
  vercelConfig,
  netlifyConfig,
  cdnRecommendations,
  performanceChecklist,
}
