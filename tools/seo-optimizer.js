/**
 * SEO 优化系统
 * 自动化SEO优化和元数据管理
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

class SEOOptimizer {
  constructor() {
    this.config = this.loadConfig()
    this.sitemapPath = 'dist/sitemap.xml'
    this.robotsPath = 'dist/robots.txt'
    this.manifestPath = 'manifest.json'
  }

  /**
   * 加载SEO配置
   */
  loadConfig() {
    try {
      const configPath = path.join(process.cwd(), 'config', 'seo.yml')
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8')
        return yaml.load(configContent)
      }
    } catch (error) {
      console.warn('SEO配置文件未找到，使用默认配置')
    }

    return this.getDefaultConfig()
  }

  /**
   * 获取默认SEO配置
   */
  getDefaultConfig() {
    return {
      site: {
        name: 'T-PPT 演示文稿展示',
        description: '专业的PPT演示文稿制作和展示平台',
        url: 'https://powerpoint.tiantian.group',
        author: 'PPT Team',
        keywords: ['PPT', '演示文稿', 'Slidev', '展示', '演讲'],
        language: 'zh-CN',
        type: 'website',
      },
      social: {
        twitter: '@tppt_official',
        facebook: 'tppt.official',
        linkedin: 'company/t-ppt',
      },
      analytics: {
        google: 'G-XXXXXXXXXX',
        baidu: 'xxxxxxxxxxxxxxxx',
      },
      verification: {
        google: 'google-site-verification=xxxxxxxx',
        baidu: 'baidu-site-verification=xxxxxxxx',
        bing: 'msvalidate.01=xxxxxxxx',
      },
    }
  }

  /**
   * 生成网站地图
   */
  async generateSitemap() {
    console.log('🗺️  生成网站地图...')

    const urls = await this.collectUrls()
    const sitemap = this.createSitemapXML(urls)

    // 确保目录存在
    const dir = path.dirname(this.sitemapPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(this.sitemapPath, sitemap)
    console.log(`✅ 网站地图已生成: ${this.sitemapPath}`)

    return this.sitemapPath
  }

  /**
   * 收集所有URL
   */
  async collectUrls() {
    const urls = []
    const baseUrl = this.config.site.url

    // 主页
    urls.push({
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0',
    })

    // 扫描PPT目录
    const pptDir = path.join(process.cwd(), 'ppt')
    if (fs.existsSync(pptDir)) {
      const presentations = fs
        .readdirSync(pptDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

      for (const presentation of presentations) {
        const presentationPath = path.join(pptDir, presentation)
        const slidesPath = path.join(presentationPath, 'slides.md')

        if (fs.existsSync(slidesPath)) {
          const stats = fs.statSync(slidesPath)
          urls.push({
            url: `${baseUrl}/ppt/${presentation}/`,
            lastmod: stats.mtime.toISOString(),
            changefreq: 'monthly',
            priority: '0.8',
          })

          // 扫描具体幻灯片页面
          const slideUrls = this.extractSlideUrls(slidesPath, presentation)
          urls.push(...slideUrls)
        }
      }
    }

    return urls
  }

  /**
   * 从slides.md提取幻灯片URL
   */
  extractSlideUrls(slidesPath, presentation) {
    const urls = []
    const content = fs.readFileSync(slidesPath, 'utf8')
    const slides = content.split(/---\s*[\r\n]/)
    const baseUrl = this.config.site.url

    slides.forEach((slide, index) => {
      if (index > 0) {
        // 跳过第一个frontmatter部分
        urls.push({
          url: `${baseUrl}/ppt/${presentation}/${index}`,
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: '0.6',
        })
      }
    })

    return urls
  }

  /**
   * 创建XML格式的网站地图
   */
  createSitemapXML(urls) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    urls.forEach(urlInfo => {
      xml += '  <url>\n'
      xml += `    <loc>${urlInfo.url}</loc>\n`
      xml += `    <lastmod>${urlInfo.lastmod}</lastmod>\n`
      xml += `    <changefreq>${urlInfo.changefreq}</changefreq>\n`
      xml += `    <priority>${urlInfo.priority}</priority>\n`
      xml += '  </url>\n'
    })

    xml += '</urlset>'
    return xml
  }

  /**
   * 生成robots.txt
   */
  generateRobotsTxt() {
    console.log('🤖 生成robots.txt...')

    const robotsContent = `User-agent: *
Allow: /

# 网站地图
Sitemap: ${this.config.site.url}/sitemap.xml

# 禁止访问的路径
Disallow: /node_modules/
Disallow: /.git/
Disallow: /src/
Disallow: /tests/
Disallow: /tools/
Disallow: /scripts/

# 允许访问的资源
Allow: /assets/
Allow: /images/
Allow: /css/
Allow: /js/

# 爬虫延迟（毫秒）
Crawl-delay: 1`

    // 确保目录存在
    const dir = path.dirname(this.robotsPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(this.robotsPath, robotsContent)
    console.log(`✅ robots.txt已生成: ${this.robotsPath}`)

    return this.robotsPath
  }

  /**
   * 生成SEO元数据
   */
  generateMetaTags(pageInfo = {}) {
    const config = this.config.site
    const title = pageInfo.title
      ? `${pageInfo.title} - ${config.name}`
      : config.name
    const description = pageInfo.description || config.description
    const url = pageInfo.url || config.url
    const image = pageInfo.image || `${config.url}/assets/og-image.jpg`
    const keywords = [
      ...(config.keywords || []),
      ...(pageInfo.keywords || []),
    ].join(', ')

    return `
    <!-- SEO基础元数据 -->
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="${config.author}">
    <meta name="robots" content="index, follow">
    <meta name="language" content="${config.language}">
    <link rel="canonical" href="${url}">
    
    <!-- Open Graph 元数据 -->
    <meta property="og:type" content="${config.type}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${image}">
    <meta property="og:site_name" content="${config.name}">
    <meta property="og:locale" content="${config.language}">
    
    <!-- Twitter Card 元数据 -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${this.config.social.twitter}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    
    <!-- 网站验证 -->
    <meta name="google-site-verification" content="${this.config.verification.google}">
    <meta name="baidu-site-verification" content="${this.config.verification.baidu}">
    <meta name="msvalidate.01" content="${this.config.verification.bing}">
    
    <!-- 结构化数据 -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "${config.name}",
      "description": "${description}",
      "url": "${config.url}",
      "logo": "${config.url}/assets/logo.png",
      "sameAs": [
        "https://twitter.com/${this.config.social.twitter.replace('@', '')}",
        "https://facebook.com/${this.config.social.facebook}",
        "https://linkedin.com/${this.config.social.linkedin}"
      ]
    }
    </script>
    
    <!-- 分析代码 -->
    ${this.generateAnalyticsCode()}
    `.trim()
  }

  /**
   * 生成分析代码
   */
  generateAnalyticsCode() {
    let code = ''

    // Google Analytics
    if (this.config.analytics.google) {
      code += `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${this.config.analytics.google}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.config.analytics.google}');
    </script>`
    }

    // 百度统计
    if (this.config.analytics.baidu) {
      code += `
    <!-- 百度统计 -->
    <script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${this.config.analytics.baidu}";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    </script>`
    }

    return code
  }

  /**
   * 优化图片SEO
   */
  optimizeImages() {
    console.log('🖼️  优化图片SEO...')

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const searchDirs = ['src', 'assets', 'public', 'ppt']
    const optimizations = []

    searchDirs.forEach(dir => {
      const dirPath = path.join(process.cwd(), dir)
      if (fs.existsSync(dirPath)) {
        this.processImagesInDirectory(dirPath, imageExtensions, optimizations)
      }
    })

    if (optimizations.length > 0) {
      console.log(`✅ 发现 ${optimizations.length} 个图片需要优化`)
      this.generateImageOptimizationReport(optimizations)
    } else {
      console.log('✅ 所有图片已优化')
    }

    return optimizations
  }

  /**
   * 处理目录中的图片
   */
  processImagesInDirectory(dirPath, extensions, optimizations) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true })

    items.forEach(item => {
      const fullPath = path.join(dirPath, item.name)

      if (item.isDirectory()) {
        this.processImagesInDirectory(fullPath, extensions, optimizations)
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase()
        if (extensions.includes(ext)) {
          const suggestions = this.analyzeImageSEO(fullPath, item.name)
          if (suggestions.length > 0) {
            optimizations.push({
              file: fullPath,
              suggestions: suggestions,
            })
          }
        }
      }
    })
  }

  /**
   * 分析图片SEO
   */
  analyzeImageSEO(filePath, fileName) {
    const suggestions = []

    // 检查文件名是否SEO友好
    if (!/^[a-z0-9-_]+\.[a-z]+$/i.test(fileName)) {
      suggestions.push('使用SEO友好的文件名（小写字母、数字、连字符）')
    }

    // 检查文件大小
    const stats = fs.statSync(filePath)
    const sizeInMB = stats.size / (1024 * 1024)

    if (sizeInMB > 1) {
      suggestions.push(`图片过大 (${sizeInMB.toFixed(2)}MB)，建议压缩`)
    }

    // 检查WebP格式
    const ext = path.extname(fileName).toLowerCase()
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      suggestions.push('考虑转换为WebP格式以提升性能')
    }

    return suggestions
  }

  /**
   * 生成图片优化报告
   */
  generateImageOptimizationReport(optimizations) {
    const reportPath = path.join(process.cwd(), 'docs', 'image-seo-report.md')
    let report = '# 图片SEO优化报告\n\n'

    report += `生成时间: ${new Date().toLocaleString()}\n\n`
    report += `共发现 ${optimizations.length} 个图片需要优化:\n\n`

    optimizations.forEach((opt, index) => {
      report += `## ${index + 1}. ${path.relative(process.cwd(), opt.file)}\n\n`
      report += '**优化建议:**\n'
      opt.suggestions.forEach(suggestion => {
        report += `- ${suggestion}\n`
      })
      report += '\n'
    })

    // 确保目录存在
    const dir = path.dirname(reportPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(reportPath, report)
    console.log(`📊 图片SEO报告已生成: ${reportPath}`)
  }

  /**
   * 生成结构化数据
   */
  generateStructuredData(pageInfo = {}) {
    const config = this.config.site

    // 组织结构化数据
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.name,
      description: config.description,
      url: config.url,
      logo: `${config.url}/assets/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+86-XXX-XXXX-XXXX',
        contactType: 'customer service',
      },
      sameAs: [
        `https://twitter.com/${this.config.social.twitter.replace('@', '')}`,
        `https://facebook.com/${this.config.social.facebook}`,
        `https://linkedin.com/${this.config.social.linkedin}`,
      ],
    }

    // 面包屑导航
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: config.url,
        },
      ],
    }

    // 如果是演示页面，添加创作作品数据
    let creativeWorkSchema = null
    if (pageInfo.type === 'presentation') {
      creativeWorkSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: pageInfo.title,
        description: pageInfo.description,
        author: {
          '@type': 'Person',
          name: pageInfo.author || config.author,
        },
        dateCreated: pageInfo.dateCreated,
        dateModified: pageInfo.dateModified,
        inLanguage: config.language,
        keywords: pageInfo.keywords,
      }
    }

    const schemas = [organizationSchema, breadcrumbSchema]
    if (creativeWorkSchema) {
      schemas.push(creativeWorkSchema)
    }

    return schemas
      .map(
        schema =>
          `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
      )
      .join('\n')
  }

  /**
   * 优化页面性能相关的SEO
   */
  optimizePerformanceSEO() {
    const optimizations = {
      preload: [],
      prefetch: [],
      preconnect: [],
      dns_prefetch: [],
    }

    // 预加载关键资源
    optimizations.preload = [
      '<link rel="preload" href="/assets/fonts/main.woff2" as="font" type="font/woff2" crossorigin>',
      '<link rel="preload" href="/assets/css/critical.css" as="style">',
      '<link rel="preload" href="/assets/js/app.js" as="script">',
    ]

    // 预连接到外部服务
    optimizations.preconnect = [
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://www.google-analytics.com">',
      '<link rel="preconnect" href="https://hm.baidu.com">',
    ]

    // DNS预解析
    optimizations.dns_prefetch = [
      '<link rel="dns-prefetch" href="//fonts.googleapis.com">',
      '<link rel="dns-prefetch" href="//www.google-analytics.com">',
    ]

    return optimizations
  }

  /**
   * 执行完整的SEO优化
   */
  async optimizeAll() {
    console.log('🚀 开始SEO优化...')

    const results = {
      sitemap: await this.generateSitemap(),
      robots: this.generateRobotsTxt(),
      images: this.optimizeImages(),
      timestamp: new Date().toISOString(),
    }

    console.log('✅ SEO优化完成！')
    console.log(`📊 优化结果:`)
    console.log(`   - 网站地图: ${results.sitemap}`)
    console.log(`   - 机器人文件: ${results.robots}`)
    console.log(`   - 图片优化: ${results.images.length} 个建议`)

    return results
  }

  /**
   * 验证SEO设置
   */
  validateSEO() {
    const issues = []

    // 检查必要的文件
    if (!fs.existsSync(this.sitemapPath)) {
      issues.push('缺少sitemap.xml文件')
    }

    if (!fs.existsSync(this.robotsPath)) {
      issues.push('缺少robots.txt文件')
    }

    if (!fs.existsSync(this.manifestPath)) {
      issues.push('缺少PWA manifest.json文件')
    }

    // 检查配置
    if (!this.config.analytics.google && !this.config.analytics.baidu) {
      issues.push('未配置网站统计')
    }

    if (!this.config.verification.google) {
      issues.push('未配置Google Search Console验证')
    }

    if (issues.length === 0) {
      console.log('✅ SEO设置验证通过')
    } else {
      console.log('⚠️  SEO设置问题:')
      issues.forEach(issue => console.log(`   - ${issue}`))
    }

    return { valid: issues.length === 0, issues }
  }
}

export default SEOOptimizer
