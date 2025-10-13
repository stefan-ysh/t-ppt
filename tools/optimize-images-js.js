#!/usr/bin/env node

/**
 * 纯Node.js图片优化工具
 * 无需安装ImageMagick或其他外部依赖
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 颜色输出
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 分析图片使用情况
function analyzeImages(sourceDir = 'ppt') {
  log('blue', '📊 分析图片使用情况...');
  
  const stats = {
    totalFiles: 0,
    totalSize: 0,
    byExtension: {},
    largeFiles: [],
    unusedFiles: []
  };
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov'];
  
  // 递归扫描文件
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // 跳过不需要的目录
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next' || file === 'coverage') {
          continue;
        }
        scanDirectory(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        
        if (imageExtensions.includes(ext)) {
          stats.totalFiles++;
          stats.totalSize += stat.size;
          
          // 按扩展名统计
          if (!stats.byExtension[ext]) {
            stats.byExtension[ext] = { count: 0, size: 0 };
          }
          stats.byExtension[ext].count++;
          stats.byExtension[ext].size += stat.size;
          
          // 大文件检测 (>1MB)
          if (stat.size > 1024 * 1024) {
            stats.largeFiles.push({
              path: filePath,
              size: stat.size,
              sizeFormatted: formatSize(stat.size)
            });
          }
          
          // 检查是否被使用
          const isUsed = checkFileUsage(filePath, sourceDir);
          if (!isUsed) {
            stats.unusedFiles.push(filePath);
          }
        }
      }
    }
  }
  
  scanDirectory(sourceDir);
  return stats;
}

// 检查文件是否被使用
function checkFileUsage(imagePath, sourceDir) {
  const fileName = path.basename(imagePath);
  const fileNameWithoutExt = path.basename(imagePath, path.extname(imagePath));
  
  // 查找所有.md和.vue文件
  function findTextFiles(dir) {
    const textFiles = [];
    
    function scan(currentDir) {
      if (!fs.existsSync(currentDir)) return;
      
      const files = fs.readdirSync(currentDir);
      
      for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // 跳过不需要的目录
          if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next' || file === 'coverage') {
            continue;
          }
          scan(filePath);
        } else if (file.endsWith('.md') || file.endsWith('.vue')) {
          textFiles.push(filePath);
        }
      }
    }
    
    scan(dir);
    return textFiles;
  }
  
  const textFiles = findTextFiles(sourceDir);
  
  // 检查文件内容中是否包含图片引用
  for (const textFile of textFiles) {
    try {
      const content = fs.readFileSync(textFile, 'utf8');
      if (content.includes(fileName) || content.includes(fileNameWithoutExt)) {
        return true;
      }
    } catch (err) {
      // 忽略读取错误
    }
  }
  
  return false;
}

// 格式化文件大小
function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

// 检查重复文件
function findDuplicates(sourceDir = 'ppt') {
  log('blue', '🔍 检查重复文件...');
  
  const fileSizeMap = new Map();
  const duplicates = [];
  
  function scanForDuplicates(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // 跳过不需要的目录
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next' || file === 'coverage') {
          continue;
        }
        scanForDuplicates(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
          const sizeKey = `${stat.size}_${path.basename(file)}`;
          
          if (fileSizeMap.has(sizeKey)) {
            const existing = fileSizeMap.get(sizeKey);
            
            // 检查是否真的是重复文件
            if (areFilesSimilar(existing.path, filePath)) {
              duplicates.push({
                original: existing.path,
                duplicate: filePath,
                size: stat.size
              });
            }
          } else {
            fileSizeMap.set(sizeKey, { path: filePath, size: stat.size });
          }
        }
      }
    }
  }
  
  scanForDuplicates(sourceDir);
  return duplicates;
}

// 简单比较两个文件是否相似（基于大小和名称）
function areFilesSimilar(file1, file2) {
  const name1 = path.basename(file1, path.extname(file1));
  const name2 = path.basename(file2, path.extname(file2));
  
  // 如果文件名相似或者完全相同，认为是重复的
  return name1 === name2 || 
         name1.includes(name2) || 
         name2.includes(name1) ||
         levenshteinDistance(name1, name2) <= 2;
}

// 计算字符串相似度
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// 生成优化建议
function generateOptimizationSuggestions(stats, duplicates) {
  const suggestions = [];
  
  // 大文件建议
  if (stats.largeFiles.length > 0) {
    suggestions.push({
      type: 'large-files',
      priority: 'high',
      title: '🚨 大文件优化',
      description: `发现 ${stats.largeFiles.length} 个大文件 (>1MB)`,
      files: stats.largeFiles.slice(0, 5),
      action: '建议压缩或转换为更高效的格式'
    });
  }
  
  // 未使用文件建议
  if (stats.unusedFiles.length > 0) {
    suggestions.push({
      type: 'unused-files',
      priority: 'medium',
      title: '🗑️ 未使用文件',
      description: `发现 ${stats.unusedFiles.length} 个可能未使用的文件`,
      files: stats.unusedFiles.slice(0, 10).map(f => ({ path: f })),
      action: '考虑删除这些文件以减小项目体积'
    });
  }
  
  // 重复文件建议
  if (duplicates.length > 0) {
    suggestions.push({
      type: 'duplicate-files',
      priority: 'medium',
      title: '📋 重复文件',
      description: `发现 ${duplicates.length} 组重复文件`,
      files: duplicates.slice(0, 5),
      action: '删除重复文件，使用共享资源'
    });
  }
  
  // 格式优化建议
  const totalSize = stats.totalSize;
  if (totalSize > 50 * 1024 * 1024) { // 50MB
    suggestions.push({
      type: 'format-optimization',
      priority: 'high',
      title: '🖼️ 格式优化',
      description: `总图片大小: ${formatSize(totalSize)}`,
      action: '考虑转换为WebP格式以减小50-80%的文件大小'
    });
  }
  
  return suggestions;
}

// 生成详细报告
function generateReport(stats, duplicates, suggestions) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: stats.totalFiles,
      totalSize: formatSize(stats.totalSize),
      largeFilesCount: stats.largeFiles.length,
      unusedFilesCount: stats.unusedFiles.length,
      duplicatesCount: duplicates.length
    },
    byExtension: {},
    suggestions: suggestions
  };
  
  // 格式化扩展名统计
  for (const [ext, data] of Object.entries(stats.byExtension)) {
    report.byExtension[ext] = {
      count: data.count,
      size: formatSize(data.size),
      percentage: ((data.size / stats.totalSize) * 100).toFixed(1) + '%'
    };
  }
  
  return report;
}

// 显示报告
function displayReport(report) {
  console.log('\n📊 图片优化分析报告');
  console.log('═'.repeat(50));
  
  // 总览
  log('blue', `📁 总文件数: ${report.summary.totalFiles}`);
  log('blue', `📦 总大小: ${report.summary.totalSize}`);
  log('yellow', `⚠️  大文件: ${report.summary.largeFilesCount} 个`);
  log('yellow', `🗑️  未使用: ${report.summary.unusedFilesCount} 个`);
  log('yellow', `📋 重复文件: ${report.summary.duplicatesCount} 组`);
  
  // 文件类型分布
  console.log('\n📄 文件类型分布:');
  for (const [ext, data] of Object.entries(report.byExtension)) {
    console.log(`  ${ext}: ${data.count} 个文件, ${data.size} (${data.percentage})`);
  }
  
  // 优化建议
  if (report.suggestions.length > 0) {
    console.log('\n💡 优化建议:');
    
    for (const suggestion of report.suggestions) {
      const priorityIcon = {
        high: '🔴',
        medium: '🟡',
        low: '🟢'
      };
      
      log('yellow', `${priorityIcon[suggestion.priority]} ${suggestion.title}`);
      console.log(`   ${suggestion.description}`);
      console.log(`   ✨ ${suggestion.action}`);
      
      if (suggestion.files && suggestion.files.length > 0) {
        console.log('   📂 文件示例:');
        suggestion.files.slice(0, 3).forEach(file => {
          const displayPath = file.path || file.original || file;
          const size = file.sizeFormatted || (file.size ? formatSize(file.size) : '');
          console.log(`      ${displayPath} ${size}`);
        });
        
        if (suggestion.files.length > 3) {
          console.log(`      ... 还有 ${suggestion.files.length - 3} 个文件`);
        }
      }
      console.log('');
    }
  }
  
  // 下一步建议
  console.log('🚀 推荐操作:');
  console.log('  1. 使用在线工具压缩大图片');
  console.log('  2. 转换为WebP格式以减小文件大小');
  console.log('  3. 删除未使用的文件');
  console.log('  4. 整理重复文件');
  console.log('  5. 考虑使用CDN托管大文件');
}

// 保存报告到文件
function saveReportToFile(report) {
  const reportPath = 'image-optimization-report.json';
  
  try {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log('green', `📄 详细报告已保存到: ${reportPath}`);
  } catch (err) {
    log('red', `❌ 保存报告失败: ${err.message}`);
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'analyze';
  const sourceDir = args[1] || 'ppt';
  
  console.log('🖼️ 纯Node.js图片优化工具');
  console.log('═'.repeat(40));
  
  switch (command) {
    case 'analyze':
    case 'all':
      log('blue', '🔍 开始分析项目图片...');
      
      const stats = analyzeImages(sourceDir);
      const duplicates = findDuplicates(sourceDir);
      const suggestions = generateOptimizationSuggestions(stats, duplicates);
      const report = generateReport(stats, duplicates, suggestions);
      
      displayReport(report);
      saveReportToFile(report);
      
      if (suggestions.length === 0) {
        log('green', '✅ 项目图片已经很好地优化了！');
      }
      break;
      
    case 'stats':
      const quickStats = analyzeImages(sourceDir);
      console.log(`📊 图片统计: ${quickStats.totalFiles} 个文件, ${formatSize(quickStats.totalSize)}`);
      break;
      
    case 'help':
    default:
      console.log('用法: node optimize-images-js.js [命令] [目录]');
      console.log('');
      console.log('命令:');
      console.log('  analyze, all  - 完整分析 (默认)');
      console.log('  stats        - 快速统计');
      console.log('  help         - 显示帮助');
      console.log('');
      console.log('示例:');
      console.log('  node optimize-images-js.js analyze ppt');
      console.log('  node optimize-images-js.js stats');
      break;
  }
}

// 运行主函数
main();