#!/usr/bin/env node

/**
 * 纯Node.js WebP转换指南工具
 * 提供WebP转换的详细指南和在线工具推荐
 */

import fs from 'fs';
import path from 'path';

// 颜色输出
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  purple: '\x1b[35m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 扫描需要转换的图片
function scanForConversion(sourceDir = 'ppt') {
  const candidates = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png'];
  
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
          candidates.push({
            path: filePath,
            size: stat.size,
            extension: ext
          });
        }
      }
    }
  }
  
  scanDirectory(sourceDir);
  return candidates;
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

// 计算WebP可能节省的空间
function calculateSavings(candidates) {
  let totalSize = 0;
  let potentialSavings = 0;
  
  for (const file of candidates) {
    totalSize += file.size;
    
    // WebP通常能节省30-80%的空间，这里保守估计50%
    const savingsRate = file.extension === '.png' ? 0.6 : 0.4; // PNG压缩率更高
    potentialSavings += file.size * savingsRate;
  }
  
  return {
    totalSize,
    potentialSavings,
    newSize: totalSize - potentialSavings
  };
}

// 生成转换脚本
function generateConversionScript(candidates) {
  const scriptLines = [
    '#!/bin/bash',
    '',
    '# WebP批量转换脚本',
    '# 需要安装 cwebp 工具: brew install webp (macOS) 或 apt install webp (Ubuntu)',
    '',
    'echo "开始批量转换图片为WebP格式..."',
    'echo ""',
    ''
  ];
  
  let convertedCount = 0;
  
  for (const file of candidates) {
    if (file.size > 100 * 1024) { // 只转换大于100KB的文件
      const webpPath = file.path.replace(path.extname(file.path), '.webp');
      scriptLines.push(`# 转换: ${file.path}`);
      scriptLines.push(`cwebp -q 85 "${file.path}" -o "${webpPath}"`);
      scriptLines.push('');
      convertedCount++;
    }
  }
  
  scriptLines.push(`echo "转换完成！已处理 ${convertedCount} 个文件"`);
  scriptLines.push('echo "记得更新PPT文件中的图片引用路径"');
  
  return {
    script: scriptLines.join('\n'),
    count: convertedCount
  };
}

// 显示在线工具推荐
function showOnlineTools() {
  console.log('\n🌐 推荐的在线WebP转换工具:');
  console.log('═'.repeat(50));
  
  const tools = [
    {
      name: 'Squoosh (Google)',
      url: 'https://squoosh.app/',
      features: ['支持批量转换', '实时预览', '多格式支持', '完全免费'],
      pros: '最推荐！Google出品，功能强大'
    },
    {
      name: 'TinyPNG',
      url: 'https://tinypng.com/',
      features: ['智能压缩', '支持WebP', '批量处理', 'API支持'],
      pros: '老牌工具，压缩效果极佳'
    },
    {
      name: 'Convertio',
      url: 'https://convertio.co/png-webp/',
      features: ['多格式转换', '批量处理', '云端处理', '简单易用'],
      pros: '支持200+格式转换'
    },
    {
      name: 'CloudConvert',
      url: 'https://cloudconvert.com/png-to-webp',
      features: ['API支持', '高质量转换', '批量处理', '安全可靠'],
      pros: '开发者友好，有免费额度'
    }
  ];
  
  tools.forEach((tool, index) => {
    log('green', `${index + 1}. ${tool.name}`);
    log('blue', `   🔗 ${tool.url}`);
    log('yellow', `   ✨ ${tool.pros}`);
    console.log(`   📋 功能: ${tool.features.join(', ')}`);
    console.log('');
  });
}

// 显示使用指南
function showUsageGuide() {
  console.log('\n📖 WebP转换使用指南:');
  console.log('═'.repeat(50));
  
  console.log('🎯 步骤1: 选择转换工具');
  console.log('  推荐使用 Squoosh.app (最简单) 或本地安装 cwebp');
  console.log('');
  
  console.log('🎯 步骤2: 批量转换图片');
  console.log('  • 拖拽图片到在线工具');
  console.log('  • 选择WebP格式');
  console.log('  • 调整质量 (建议80-90)');
  console.log('  • 下载转换后的文件');
  console.log('');
  
  console.log('🎯 步骤3: 更新引用');
  console.log('  • 替换PPT中的图片路径');
  console.log('  • 从 image.png 改为 image.webp');
  console.log('  • 保留原文件作为备份');
  console.log('');
  
  console.log('🎯 步骤4: 添加回退支持');
  console.log('  • 在HTML中添加 <picture> 标签');
  console.log('  • 为不支持WebP的浏览器提供原格式');
  console.log('');
  
  console.log('💡 示例代码:');
  console.log(`${colors.purple}<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="描述">
</picture>${colors.reset}`);
  console.log('');
}

// 显示本地安装指南
function showLocalInstallGuide() {
  console.log('\n🔧 本地WebP工具安装 (可选):');
  console.log('═'.repeat(50));
  
  console.log('📦 macOS (Homebrew):');
  console.log(`${colors.green}brew install webp${colors.reset}`);
  console.log('');
  
  console.log('📦 Ubuntu/Debian:');
  console.log(`${colors.green}sudo apt install webp${colors.reset}`);
  console.log('');
  
  console.log('📦 Windows:');
  console.log('  1. 下载: https://developers.google.com/speed/webp/download');
  console.log('  2. 解压到 Program Files');
  console.log('  3. 添加到系统PATH');
  console.log('');
  
  console.log('⚡ 使用示例:');
  console.log(`${colors.purple}# 单个文件转换
cwebp -q 85 input.png -o output.webp

# 批量转换 (bash script)
for file in *.png; do
  cwebp -q 85 "\$file" -o "\${file%.png}.webp"
done${colors.reset}`);
  console.log('');
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'guide';
  const sourceDir = args[1] || 'ppt';
  
  console.log('🖼️ WebP转换指南工具');
  console.log('═'.repeat(40));
  
  switch (command) {
    case 'analyze':
      log('blue', '🔍 分析需要转换的图片...');
      
      const candidates = scanForConversion(sourceDir);
      const savings = calculateSavings(candidates);
      
      console.log(`\n📊 转换分析结果:`);
      console.log(`📁 发现 ${candidates.length} 个可转换图片`);
      console.log(`📦 当前总大小: ${formatSize(savings.totalSize)}`);
      console.log(`💾 预计节省: ${formatSize(savings.potentialSavings)} (${((savings.potentialSavings / savings.totalSize) * 100).toFixed(1)}%)`);
      console.log(`📉 转换后大小: ${formatSize(savings.newSize)}`);
      
      // 显示最大的几个文件
      const largestFiles = candidates
        .filter(f => f.size > 500 * 1024) // 大于500KB
        .sort((a, b) => b.size - a.size)
        .slice(0, 10);
      
      if (largestFiles.length > 0) {
        console.log('\n🎯 优先转换的大文件:');
        largestFiles.forEach((file, index) => {
          console.log(`  ${index + 1}. ${file.path} (${formatSize(file.size)})`);
        });
      }
      
      // 生成转换脚本
      const scriptResult = generateConversionScript(candidates);
      
      if (scriptResult.count > 0) {
        fs.writeFileSync('convert-to-webp.sh', scriptResult.script);
        log('green', `📄 已生成转换脚本: convert-to-webp.sh`);
        log('yellow', `⚠️  使用前请先安装 webp 工具`);
      }
      break;
      
    case 'tools':
      showOnlineTools();
      break;
      
    case 'install':
      showLocalInstallGuide();
      break;
      
    case 'guide':
    default:
      showUsageGuide();
      showOnlineTools();
      
      console.log('🚀 快速开始:');
      console.log(`  1. 运行: ${colors.green}node webp-guide.js analyze${colors.reset} - 分析项目`);
      console.log(`  2. 访问: ${colors.blue}https://squoosh.app/${colors.reset} - 在线转换`);
      console.log(`  3. 运行: ${colors.green}node webp-guide.js install${colors.reset} - 本地安装指南`);
      break;
  }
  
  console.log(`\n💡 提示: 使用 ${colors.green}node webp-guide.js help${colors.reset} 查看所有命令`);
}

// 显示帮助
if (process.argv.includes('help') || process.argv.includes('-h')) {
  console.log('🖼️ WebP转换指南工具');
  console.log('');
  console.log('用法: node webp-guide.js [命令] [目录]');
  console.log('');
  console.log('命令:');
  console.log('  guide    - 显示使用指南 (默认)');
  console.log('  analyze  - 分析项目图片并生成转换脚本');
  console.log('  tools    - 显示在线转换工具');
  console.log('  install  - 显示本地安装指南');
  console.log('  help     - 显示此帮助');
  console.log('');
  console.log('示例:');
  console.log('  node webp-guide.js analyze ppt');
  console.log('  node webp-guide.js tools');
} else {
  main();
}