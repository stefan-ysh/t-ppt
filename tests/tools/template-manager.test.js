/**
 * 模板管理器测试
 * 测试PPT模板的创建、管理和使用功能
 */

import fs from 'fs'
import path from 'path'
import { jest } from '@jest/globals'
import { FileSystemTestUtils } from '../utils/testUtils.js'

// 模拟依赖
jest.mock('fs')
jest.mock('js-yaml')
jest.mock('child_process')

describe('TemplateManager', () => {
  let TemplateManager

  beforeAll(async () => {
    // 动态导入模板管理器
    const module = await import('../../tools/template-manager.js')
    TemplateManager = module.default
  })

  beforeEach(() => {
    jest.clearAllMocks()

    // 模拟配置文件内容
    const mockConfig = {
      templates: {
        academic: {
          name: '学术演示模板',
          description: '适用于学术会议、论文展示和研究报告',
          tags: ['学术', '研究', '正式'],
          difficulty: '简单',
          features: ['简洁专业的设计', '科学配色方案', '图表展示组件'],
        },
        business: {
          name: '商务展示模板',
          description: '适用于商业汇报、项目提案和公司展示',
          tags: ['商务', '专业', '现代'],
          difficulty: '简单',
          features: ['商务风格设计', '数据可视化', '品牌色彩支持'],
        },
      },
      themes: {
        light: { name: '浅色主题', colors: { primary: '#3B82F6' } },
        dark: { name: '深色主题', colors: { primary: '#1F2937' } },
      },
    }

    require('js-yaml').load.mockReturnValue(mockConfig)
    FileSystemTestUtils.mockFileExists('templates/config.yml', true)
  })

  describe('Template Listing', () => {
    test('should list all available templates', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const manager = new TemplateManager()
      await manager.listTemplates()

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('学术演示模板')
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('商务展示模板')
      )

      consoleSpy.mockRestore()
    })

    test('should handle empty template list', async () => {
      require('js-yaml').load.mockReturnValue({ templates: {} })

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      const manager = new TemplateManager()
      await manager.listTemplates()

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('没有可用的模板')
      )
      consoleSpy.mockRestore()
    })
  })

  describe('Project Creation', () => {
    test('should create new project from template', async () => {
      const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation()
      const writeFileSyncSpy = jest
        .spyOn(fs, 'writeFileSync')
        .mockImplementation()
      const execSyncSpy = jest
        .spyOn(require('child_process'), 'execSync')
        .mockImplementation()

      const manager = new TemplateManager()
      await manager.createProject('academic', 'test-project')

      expect(mkdirSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining('test-project'),
        expect.objectContaining({ recursive: true })
      )

      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining('slides.md'),
        expect.any(String)
      )

      mkdirSyncSpy.mockRestore()
      writeFileSyncSpy.mockRestore()
      execSyncSpy.mockRestore()
    })

    test('should handle invalid template', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const manager = new TemplateManager()
      await manager.createProject('invalid-template', 'test-project')

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('模板 "invalid-template" 不存在')
      )

      consoleSpy.mockRestore()
    })

    test('should handle existing project directory', async () => {
      FileSystemTestUtils.mockFileExists('ppt/test-project', true)
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const manager = new TemplateManager()
      await manager.createProject('academic', 'test-project')

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('项目目录已存在')
      )

      consoleSpy.mockRestore()
    })
  })

  describe('Template Validation', () => {
    test('should validate template structure', () => {
      const manager = new TemplateManager()

      const validTemplate = {
        name: 'Test Template',
        description: 'Test description',
        tags: ['test'],
        difficulty: '简单',
        features: ['feature1'],
      }

      expect(manager.validateTemplate(validTemplate)).toBe(true)
    })

    test('should reject invalid template structure', () => {
      const manager = new TemplateManager()

      const invalidTemplate = {
        name: 'Test Template',
        // 缺少必要字段
      }

      expect(manager.validateTemplate(invalidTemplate)).toBe(false)
    })
  })

  describe('Theme Management', () => {
    test('should apply theme to project', async () => {
      const writeFileSyncSpy = jest
        .spyOn(fs, 'writeFileSync')
        .mockImplementation()

      const manager = new TemplateManager()
      await manager.applyTheme('test-project', 'dark')

      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        expect.stringContaining('theme.css'),
        expect.stringContaining('#1F2937')
      )

      writeFileSyncSpy.mockRestore()
    })

    test('should handle invalid theme', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const manager = new TemplateManager()
      await manager.applyTheme('test-project', 'invalid-theme')

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('主题 "invalid-theme" 不存在')
      )

      consoleSpy.mockRestore()
    })
  })
})

describe('Template Configuration', () => {
  test('should load configuration from YAML file', async () => {
    const yamlContent = `
templates:
  test:
    name: "Test Template"
    description: "Test description"
themes:
  test:
    name: "Test Theme"
    `

    require('js-yaml').load.mockReturnValue({
      templates: { test: { name: 'Test Template' } },
      themes: { test: { name: 'Test Theme' } },
    })

    const manager = new (
      await import('../../tools/template-manager.js')
    ).default()
    const config = manager.loadConfig()

    expect(config.templates).toHaveProperty('test')
    expect(config.themes).toHaveProperty('test')
  })

  test('should handle missing configuration file', async () => {
    FileSystemTestUtils.mockFileExists('templates/config.yml', false)
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const manager = new (
      await import('../../tools/template-manager.js')
    ).default()
    const config = manager.loadConfig()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('配置文件不存在')
    )
    expect(config).toEqual({ templates: {}, themes: {} })

    consoleSpy.mockRestore()
  })
})

describe('Integration Tests', () => {
  test('should complete full workflow from template to project', async () => {
    const manager = new (
      await import('../../tools/template-manager.js')
    ).default()

    // 模拟完整的项目创建流程
    const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation()
    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation()
    const execSyncSpy = jest
      .spyOn(require('child_process'), 'execSync')
      .mockImplementation()

    // 1. 列出模板
    await manager.listTemplates()

    // 2. 创建项目
    await manager.createProject('academic', 'integration-test')

    // 3. 应用主题
    await manager.applyTheme('integration-test', 'light')

    // 验证所有步骤都被执行
    expect(mkdirSyncSpy).toHaveBeenCalled()
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(expect.any(Number))

    mkdirSyncSpy.mockRestore()
    writeFileSyncSpy.mockRestore()
    execSyncSpy.mockRestore()
  })
})
