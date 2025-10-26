#!/usr/bin/env node

/**
 * 统一高性能构建脚本
 * 合并 build.js 和 build-enhanced.sh 的优点
 * - Node.js 跨平台兼容性
 * - 并行构建支持
 * - 完整的错误处理
 * - 自动生成重定向文件
 * - 构建报告和统计
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { Worker } from 'worker_threads'
import { promisify } from 'util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const config = {
  buildDir: path.join(__dirname, '..', 'dist'),
  pptDir: path.join(__dirname, '..', 'ppt'),
  maxWorkers: process.env.BUILD_THREADS || 4,
  enableCache: process.env.BUILD_CACHE !== 'false',
  enableParallel: process.env.BUILD_PARALLEL !== 'false',
  verbose: process.env.BUILD_VERBOSE === 'true',
}

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

const log = {
  info: msg => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  success: msg => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: msg => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: msg => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  verbose: msg =>
    config.verbose && console.log(`${colors.cyan}🔍 ${msg}${colors.reset}`),
}

// 构建统计
const buildStats = {
  startTime: Date.now(),
  totalPpts: 0,
  successPpts: 0,
  failedPpts: [],
  buildSize: 0,
}

console.log('🚀 开始统一高性能构建...')

/**
 * 清理并创建构建目录
 */
function setupBuildDirectory() {
  log.info('设置构建目录...')

  if (fs.existsSync(config.buildDir)) {
    fs.rmSync(config.buildDir, { recursive: true, force: true })
  }
  fs.mkdirSync(config.buildDir, { recursive: true })

  log.success('构建目录准备完成')
}

/**
 * 复制首页文件
 */
function copyHomePage() {
  log.info('复制首页文件...')

  const indexPath = path.join(__dirname, '..', 'index.html')
  const distIndexPath = path.join(config.buildDir, 'index.html')

  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, distIndexPath)
    log.success('首页复制完成')
  } else {
    log.error('找不到 index.html 文件')
    process.exit(1)
  }
}

/**
 * 检查PPT是否需要构建（缓存逻辑）
 */
function shouldBuildPpt(pptPath) {
  if (!config.enableCache) return true

  const slidesPath = path.join(pptPath, 'slides.md')
  const outputPath = path.join(
    config.buildDir,
    'ppt',
    path.basename(pptPath),
    'index.html'
  )

  if (!fs.existsSync(outputPath)) return true
  if (!fs.existsSync(slidesPath)) return false

  const slidesStats = fs.statSync(slidesPath)
  const outputStats = fs.statSync(outputPath)

  return slidesStats.mtime > outputStats.mtime
}

/**
 * 构建单个PPT
 */
async function buildSinglePpt(pptName) {
  return new Promise((resolve, reject) => {
    const pptPath = path.join(config.pptDir, pptName)
    const slidesPath = path.join(pptPath, 'slides.md')

    if (!fs.existsSync(slidesPath)) {
      log.warning(`跳过 ${pptName}: 没有找到 slides.md`)
      return resolve({ name: pptName, skipped: true })
    }

    if (!shouldBuildPpt(pptPath)) {
      log.verbose(`跳过 ${pptName}: 使用缓存`)
      return resolve({ name: pptName, cached: true })
    }

    log.info(`构建 ${pptName} PPT...`)

    const originalCwd = process.cwd()
    try {
      // 检查并创建package.json (在chdir前检查)
      const packagePath = path.join(pptPath, 'package.json')
      if (!fs.existsSync(packagePath)) {
        log.verbose(`创建 ${pptName} 的 package.json...`)
        const packageContent = {
          name: `${pptName}-ppt`,
          version: '1.0.0',
          description: `${pptName} PPT演示`,
          type: 'module',
          scripts: {
            build: `slidev build --base /ppt/${pptName}/ --out ../../${config.buildDir}/ppt/${pptName}`,
            dev: 'slidev --open',
            export: 'slidev export',
          },
          dependencies: {
            '@slidev/cli': '^52.2.4',
            '@slidev/theme-default': '^0.25.0',
          },
        }
        fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2))
      }

      // 切换到PPT目录进行构建
      process.chdir(pptPath)

      // 检查依赖
      const nodeModulesPath = path.join(pptPath, 'node_modules')
      if (!fs.existsSync(nodeModulesPath)) {
        log.verbose(`安装 ${pptName} 的依赖...`)
        execSync('npm install --silent', {
          stdio: config.verbose ? 'inherit' : 'pipe',
        })
      }

      // 构建PPT
      log.verbose(`编译 ${pptName}...`)
      execSync('npm run build --silent', {
        stdio: config.verbose ? 'inherit' : 'pipe',
      })

      process.chdir(originalCwd)

      log.success(`${pptName} 构建完成`)
      resolve({ name: pptName, success: true })
    } catch (error) {
      process.chdir(originalCwd)
      log.error(`${pptName} 构建失败: ${error.message}`)
      reject({ name: pptName, error: error.message })
    }
  })
}

/**
 * 并行构建所有PPT
 */
async function buildAllPpts() {
  log.info('扫描PPT项目...')

  if (!fs.existsSync(config.pptDir)) {
    log.warning('没有找到 ppt 目录')
    return
  }

  const pptDirs = fs
    .readdirSync(config.pptDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  if (pptDirs.length === 0) {
    log.warning('没有发现PPT项目')
    return
  }

  buildStats.totalPpts = pptDirs.length
  log.info(`发现 ${pptDirs.length} 个PPT项目`)

  if (config.enableParallel && pptDirs.length > 1) {
    log.info(`并行构建 (${config.maxWorkers} 线程)...`)

    // 分批处理，控制并发数
    const batches = []
    for (let i = 0; i < pptDirs.length; i += config.maxWorkers) {
      batches.push(pptDirs.slice(i, i + config.maxWorkers))
    }

    for (const batch of batches) {
      const promises = batch.map(pptName => buildSinglePpt(pptName))

      try {
        const results = await Promise.allSettled(promises)

        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value.success) {
            buildStats.successPpts++
          } else if (result.status === 'rejected') {
            buildStats.failedPpts.push(result.reason)
          }
        })
      } catch (error) {
        log.error(`批次构建错误: ${error.message}`)
      }
    }
  } else {
    log.info('串行构建...')

    for (const pptName of pptDirs) {
      try {
        const result = await buildSinglePpt(pptName)
        if (result.success) {
          buildStats.successPpts++
        }
      } catch (error) {
        buildStats.failedPpts.push(error)
      }
    }
  }
}

/**
 * 生成重定向文件
 */
function generateRedirectFiles() {
  log.info('生成重定向配置文件...')

  // 创建Netlify _redirects文件
  const redirectsContent = `# Netlify redirects for SPA routing
# PPT slide routing - handle numbered slides
/ppt/*/1             /ppt/*/index.html    200
/ppt/*/2             /ppt/*/index.html    200
/ppt/*/3             /ppt/*/index.html    200
/ppt/*/4             /ppt/*/index.html    200
/ppt/*/5             /ppt/*/index.html    200
/ppt/*/6             /ppt/*/index.html    200
/ppt/*/7             /ppt/*/index.html    200
/ppt/*/8             /ppt/*/index.html    200
/ppt/*/9             /ppt/*/index.html    200
/ppt/*/10            /ppt/*/index.html    200
/ppt/*/11            /ppt/*/index.html    200
/ppt/*/12            /ppt/*/index.html    200
/ppt/*/13            /ppt/*/index.html    200
/ppt/*/14            /ppt/*/index.html    200
/ppt/*/15            /ppt/*/index.html    200
/ppt/*/16            /ppt/*/index.html    200
/ppt/*/17            /ppt/*/index.html    200
/ppt/*/18            /ppt/*/index.html    200
/ppt/*/19            /ppt/*/index.html    200
/ppt/*/20            /ppt/*/index.html    200

# PPT special routes
/ppt/*/presenter     /ppt/*/index.html    200
/ppt/*/presenter/*   /ppt/*/index.html    200
/ppt/*/notes         /ppt/*/index.html    200
/ppt/*/notes/*       /ppt/*/index.html    200
/ppt/*/overview      /ppt/*/index.html    200
/ppt/*/play          /ppt/*/index.html    200

# General PPT fallback - any number or path under PPT
/ppt/*/*             /ppt/*/index.html    200

# Main site fallback
/*                   /index.html          200`

  // 确保构建目录存在
  fs.mkdirSync(config.buildDir, { recursive: true })
  fs.writeFileSync(path.join(config.buildDir, '_redirects'), redirectsContent)

  // 创建Apache .htaccess文件
  const htaccessContent = `RewriteEngine On

# Handle PPT slide routing
RewriteRule ^ppt/([^/]+)/([0-9]+)/?$ /ppt/$1/index.html [L]
RewriteRule ^ppt/([^/]+)/presenter/?$ /ppt/$1/index.html [L]
RewriteRule ^ppt/([^/]+)/presenter/([0-9]+)/?$ /ppt/$1/index.html [L]
RewriteRule ^ppt/([^/]+)/notes/?$ /ppt/$1/index.html [L]
RewriteRule ^ppt/([^/]+)/notes/([0-9]+)/?$ /ppt/$1/index.html [L]
RewriteRule ^ppt/([^/]+)/overview/?$ /ppt/$1/index.html [L]
RewriteRule ^ppt/([^/]+)/play/?$ /ppt/$1/index.html [L]

# Handle any other PPT routes
RewriteRule ^ppt/([^/]+)/(.*)$ /ppt/$1/index.html [L]

# Handle main site routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]`

  fs.writeFileSync(path.join(config.buildDir, '.htaccess'), htaccessContent)

  log.success('重定向配置文件生成完成')
}

/**
 * 计算构建大小
 */
function calculateBuildSize() {
  const getDirectorySize = dirPath => {
    let totalSize = 0

    const items = fs.readdirSync(dirPath)
    items.forEach(item => {
      const itemPath = path.join(dirPath, item)
      const stats = fs.statSync(itemPath)

      if (stats.isDirectory()) {
        totalSize += getDirectorySize(itemPath)
      } else {
        totalSize += stats.size
      }
    })

    return totalSize
  }

  buildStats.buildSize = getDirectorySize(config.buildDir)
}

/**
 * 生成构建报告
 */
function generateBuildReport() {
  log.info('生成构建报告...')

  calculateBuildSize()

  const endTime = Date.now()
  const buildTime = endTime - buildStats.startTime

  const report = {
    buildTime: new Date().toISOString(),
    duration: `${(buildTime / 1000).toFixed(2)}s`,
    buildSizeMB: `${(buildStats.buildSize / 1024 / 1024).toFixed(2)} MB`,
    totalPpts: buildStats.totalPpts,
    successPpts: buildStats.successPpts,
    failedPpts: buildStats.failedPpts.length,
    failedDetails: buildStats.failedPpts,
    nodeVersion: process.version,
    platform: process.platform,
    config: {
      parallel: config.enableParallel,
      cache: config.enableCache,
      maxWorkers: config.maxWorkers,
    },
  }

  const reportPath = path.join(config.buildDir, 'build-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

  // 显示构建统计
  console.log('')
  console.log('📊 构建统计:')
  console.log(`  ⏱️  构建时间: ${report.duration}`)
  console.log(`  📁 总大小: ${report.buildSizeMB}`)
  console.log(`  📄 PPT项目: ${report.successPpts}/${report.totalPpts} 成功`)

  if (buildStats.failedPpts.length > 0) {
    console.log(
      `  ❌ 失败项目: ${buildStats.failedPpts.map(f => f.name).join(', ')}`
    )
  }

  log.info(`详细报告: ${reportPath}`)
}

/**
 * 主构建流程
 */
async function main() {
  try {
    // 1. 设置构建目录
    setupBuildDirectory()

    // 2. 复制首页
    copyHomePage()

    // 3. 构建所有PPT
    await buildAllPpts()

    // 4. 生成重定向文件
    generateRedirectFiles()

    // 5. 生成构建报告
    generateBuildReport()

    console.log('')
    log.success(`构建完成！输出目录: ./${config.buildDir}`)
    log.success('🌐 部署就绪！')

    // 如果有失败的构建，退出码为1
    if (buildStats.failedPpts.length > 0) {
      process.exit(1)
    }
  } catch (error) {
    log.error(`构建失败: ${error.message}`)
    if (config.verbose) {
      console.error(error)
    }
    process.exit(1)
  }
}

// 错误处理
process.on('uncaughtException', error => {
  log.error(`未捕获异常: ${error.message}`)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  log.error(`未处理的Promise拒绝: ${reason}`)
  process.exit(1)
})

// 执行构建
main()
