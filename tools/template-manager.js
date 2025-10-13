#!/usr/bin/env node

/**
 * PPT模板库管理工具
 * 提供模板创建、预览、安装和管理功能
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import yaml from 'js-yaml'

// 颜色输出
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
}

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

class TemplateManager {
  constructor() {
    this.templatesDir = 'templates'
    this.pptDir = 'ppt'
    this.config = this.loadConfig()
  }

  loadConfig() {
    try {
      const configPath = path.join(this.templatesDir, 'config.yml')
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8')
        return yaml.load(configContent)
      }
    } catch (error) {
      log('yellow', '⚠️  配置文件加载失败，使用默认配置')
    }

    return {
      templates: {},
      themes: {},
      animations: {},
    }
  }

  // 列出所有模板
  listTemplates() {
    log('blue', '📋 可用的PPT模板')
    console.log('═'.repeat(50))

    const templates = this.config.templates || {}

    if (Object.keys(templates).length === 0) {
      log('yellow', '📁 暂无可用模板')
      log('cyan', '💡 提示: 使用 create-template 命令创建新模板')
      return
    }

    Object.entries(templates).forEach(([id, template], index) => {
      console.log(`\n${index + 1}. ${template.name} (${id})`)
      console.log(`   📝 ${template.description}`)
      console.log(
        `   🏷️  标签: ${template.tags ? template.tags.join(', ') : '无'}`
      )
      console.log(`   📊 难度: ${template.difficulty || '未知'}`)

      if (template.features && template.features.length > 0) {
        console.log('   ✨ 特性:')
        template.features.slice(0, 3).forEach(feature => {
          console.log(`      • ${feature}`)
        })
      }
    })

    console.log('\n📖 使用方法:')
    log(
      'green',
      '  node tools/template-manager.js use <template-id> <project-name>'
    )
  }

  // 使用模板创建PPT
  useTemplate(templateId, projectName) {
    if (!templateId || !projectName) {
      log('red', '❌ 参数错误')
      console.log('用法: use <template-id> <project-name>')
      return
    }

    const template = this.config.templates[templateId]
    if (!template) {
      log('red', `❌ 模板 "${templateId}" 不存在`)
      this.listTemplates()
      return
    }

    log('blue', `🚀 使用模板 "${template.name}" 创建项目 "${projectName}"`)

    // 检查项目是否已存在
    const projectPath = path.join(this.pptDir, projectName)
    if (fs.existsSync(projectPath)) {
      log('red', `❌ 项目 "${projectName}" 已存在`)
      return
    }

    // 创建项目目录
    fs.mkdirSync(projectPath, { recursive: true })

    // 生成基础文件结构
    this.createProjectStructure(projectPath, template, projectName)

    log('green', `✅ 项目 "${projectName}" 创建成功！`)
    log('cyan', '📝 后续步骤:')
    console.log(`  1. cd ppt/${projectName}`)
    console.log('  2. npm install')
    console.log('  3. npm run dev')
  }

  // 创建项目结构
  createProjectStructure(projectPath, template, projectName) {
    // 创建 slides.md
    this.createSlidesFile(projectPath, template, projectName)

    // 创建 package.json
    this.createPackageJson(projectPath, template, projectName)

    // 创建组件目录
    const componentsDir = path.join(projectPath, 'components')
    fs.mkdirSync(componentsDir, { recursive: true })

    // 创建示例组件
    if (template.components) {
      template.components.forEach(componentName => {
        this.createComponent(componentsDir, componentName)
      })
    }

    // 创建 public 目录
    const publicDir = path.join(projectPath, 'public')
    fs.mkdirSync(publicDir, { recursive: true })

    // 创建样式文件
    this.createStylesFile(projectPath, template)

    log('green', '📁 项目结构已创建')
  }

  // 创建 slides.md 文件
  createSlidesFile(projectPath, template, projectName) {
    const slidesContent = `---
theme: default
background: ${this.getThemeBackground()}
title: ${projectName}
info: |
  基于${template.name}创建的演示文稿
  
  了解更多: https://sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
css: unocss
---

# ${projectName}

${template.description}

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    开始演示 <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="在编辑器中打开" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# 目录

<Toc maxDepth="1"></Toc>

---
layout: center
class: text-center
---

# 内容页面

在这里编写您的内容

---

# 总结

- 📝 **简洁** - 专注于内容，而非样式
- 🎨 **主题** - 丰富的主题选择
- 🧑‍💻 **开发友好** - 语法高亮、实时编辑
- 🤹 **互动** - 嵌入Vue组件
- 🎥 **录制** - 内置录制和摄像头视图
- 📤 **便携** - 导出为PDF、PNG或托管的SPA
- 🛠 **可入侵** - 底层技术栈完全可定制

<br>
<br>

了解更多 [Slidev](https://sli.dev/)

---
layout: center
class: text-center
---

# 谢谢观看！

[文档](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [展示案例](https://sli.dev/showcases.html)
`

    fs.writeFileSync(path.join(projectPath, 'slides.md'), slidesContent)
  }

  // 创建 package.json
  createPackageJson(projectPath, template, projectName) {
    const packageJson = {
      name: projectName,
      version: '0.0.1',
      description: `${template.name} - ${template.description}`,
      scripts: {
        build: 'slidev build',
        dev: 'slidev --open',
        export: 'slidev export',
      },
      dependencies: {
        '@slidev/cli': '^0.47.0',
        '@slidev/theme-default': '^0.47.0',
      },
      devDependencies: {
        '@unocss/reset': '^0.58.0',
        'playwright-chromium': '^1.40.0',
      },
    }

    fs.writeFileSync(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    )
  }

  // 创建组件
  createComponent(componentsDir, componentName) {
    const componentFileName =
      componentName.replace(/[^a-zA-Z0-9]/g, '') + '.vue'
    const componentContent = `<template>
  <div class="${componentName.toLowerCase().replace(/\s+/g, '-')}-component">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '${componentName}'
  },
  description: {
    type: String,
    default: '这是${componentName}组件的描述'
  }
})
</script>

<style scoped>
.${componentName.toLowerCase().replace(/\s+/g, '-')}-component {
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

h2 {
  margin-bottom: 0.5rem;
  color: var(--primary-color, #2196F3);
}

p {
  margin-bottom: 1rem;
  opacity: 0.8;
}
</style>
`

    fs.writeFileSync(
      path.join(componentsDir, componentFileName),
      componentContent
    )
  }

  // 创建样式文件
  createStylesFile(projectPath, template) {
    const stylesContent = `/* ${template.name} 样式 */

:root {
  --primary-color: #2196F3;
  --secondary-color: #FFC107;
  --background-color: #FFFFFF;
  --text-color: #333333;
  --accent-color: #4CAF50;
}

/* 全局样式 */
.slidev-layout {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 标题样式 */
h1, h2, h3 {
  font-weight: 600;
  line-height: 1.2;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
}

/* 段落样式 */
p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* 列表样式 */
ul, ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

/* 代码样式 */
code {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

/* 动画效果 */
.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`

    const stylesDir = path.join(projectPath, 'styles')
    fs.mkdirSync(stylesDir, { recursive: true })
    fs.writeFileSync(path.join(stylesDir, 'main.css'), stylesContent)
  }

  // 获取主题背景
  getThemeBackground() {
    const themes = this.config.themes || {}
    const defaultTheme = themes.gradient || themes.light || {}
    return defaultTheme.colors?.background || '#FFFFFF'
  }

  // 预览模板
  previewTemplate(templateId) {
    if (!templateId) {
      log('red', '❌ 请指定模板ID')
      return
    }

    const template = this.config.templates[templateId]
    if (!template) {
      log('red', `❌ 模板 "${templateId}" 不存在`)
      return
    }

    log('blue', `🔍 模板预览: ${template.name}`)
    console.log('═'.repeat(50))

    console.log(`📝 名称: ${template.name}`)
    console.log(`📄 描述: ${template.description}`)
    console.log(`🏷️  标签: ${template.tags ? template.tags.join(', ') : '无'}`)
    console.log(`📊 难度: ${template.difficulty || '未知'}`)

    if (template.components && template.components.length > 0) {
      console.log('\n📦 包含组件:')
      template.components.forEach(component => {
        console.log(`  • ${component}`)
      })
    }

    if (template.features && template.features.length > 0) {
      console.log('\n✨ 主要特性:')
      template.features.forEach(feature => {
        console.log(`  • ${feature}`)
      })
    }

    console.log('\n🚀 使用方法:')
    log(
      'green',
      `  node tools/template-manager.js use ${templateId} <project-name>`
    )
  }

  // 显示帮助
  showHelp() {
    log('blue', '📚 PPT模板管理工具')
    console.log('═'.repeat(40))

    console.log('\n🎯 可用命令:')
    console.log('  list                           - 列出所有模板')
    console.log('  use <template-id> <name>       - 使用模板创建PPT')
    console.log('  preview <template-id>          - 预览模板信息')
    console.log('  themes                         - 列出可用主题')
    console.log('  help                           - 显示帮助信息')

    console.log('\n💡 示例:')
    log('green', '  node tools/template-manager.js list')
    log('green', '  node tools/template-manager.js use academic my-research')
    log('green', '  node tools/template-manager.js preview business')
  }

  // 列出主题
  listThemes() {
    log('blue', '🎨 可用主题')
    console.log('═'.repeat(30))

    const themes = this.config.themes || {}

    if (Object.keys(themes).length === 0) {
      log('yellow', '🎭 暂无可用主题')
      return
    }

    Object.entries(themes).forEach(([id, theme]) => {
      console.log(`\n🎨 ${theme.name} (${id})`)
      if (theme.colors) {
        console.log('   颜色配置:')
        Object.entries(theme.colors).forEach(([key, value]) => {
          console.log(`     ${key}: ${value}`)
        })
      }
    })
  }
}

// 主函数
function main() {
  const manager = new TemplateManager()
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'list':
      manager.listTemplates()
      break

    case 'use':
      manager.useTemplate(args[1], args[2])
      break

    case 'preview':
      manager.previewTemplate(args[1])
      break

    case 'themes':
      manager.listThemes()
      break

    case 'help':
    case '--help':
    case '-h':
      manager.showHelp()
      break

    default:
      if (command) {
        log('red', `❌ 未知命令: ${command}`)
      }
      manager.showHelp()
  }
}

main()
