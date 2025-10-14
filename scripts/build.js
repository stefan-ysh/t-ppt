#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 开始构建多PPT展示站...')

// 创建输出目录
const distDir = path.join(__dirname, '..', 'dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// 复制首页
console.log('📄 复制首页文件...')
const indexPath = path.join(__dirname, '..', 'index.html')
const distIndexPath = path.join(distDir, 'index.html')
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, distIndexPath)
} else {
  console.error('❌ 找不到 index.html 文件')
  process.exit(1)
}

// 查找并构建所有PPT
console.log('🎨 构建所有PPT演示文稿...')

const pptDir = path.join(__dirname, '..', 'ppt')
if (!fs.existsSync(pptDir)) {
  console.log('⚠️  没有找到 ppt 目录')
  process.exit(0)
}

const pptDirs = fs
  .readdirSync(pptDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

for (const pptName of pptDirs) {
  const pptPath = path.join(pptDir, pptName)
  const slidesPath = path.join(pptPath, 'slides.md')

  if (!fs.existsSync(slidesPath)) {
    console.log(`⚠️  跳过 ${pptName}: 没有找到 slides.md`)
    continue
  }

  console.log(`  - 构建 ${pptName} PPT...`)

  try {
    // 进入PPT目录
    process.chdir(pptPath)

    // 检查并创建package.json
    const packagePath = path.join(pptPath, 'package.json')
    if (!fs.existsSync(packagePath)) {
      console.log(`    创建 ${pptName} 的 package.json...`)
      const packageContent = {
        name: `${pptName}-ppt`,
        version: '1.0.0',
        description: `${pptName} PPT`,
        type: 'module',
        scripts: {
          build: `slidev build --base /ppt/${pptName}/ --out ../../dist/ppt/${pptName}`,
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

    // 安装依赖
    const nodeModulesPath = path.join(pptPath, 'node_modules')
    if (!fs.existsSync(nodeModulesPath)) {
      console.log(`    安装 ${pptName} 的依赖...`)
      execSync('npm install --silent', { stdio: 'inherit' })
    }

    // 构建PPT
    console.log(`    编译 ${pptName}...`)
    execSync('npm run build --silent', { stdio: 'inherit' })

    console.log(`    ✅ ${pptName} 构建完成`)
  } catch (error) {
    console.error(`❌ ${pptName} 构建失败:`, error.message)
    // 不要因为单个PPT构建失败就停止整个构建过程
    continue
  } finally {
    // 回到根目录
    process.chdir(__dirname)
  }
}

// 复制重定向配置文件
console.log('🔧 复制部署配置文件...')

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

fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent)

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

fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent)

console.log('✅ 所有PPT构建完成！')
console.log('📁 输出目录: ./dist')
console.log('🌐 部署就绪！')
