#!/bin/bash

echo "🚀 正在设置 Next.js + Reveal.js 项目..."
echo ""

# 复制图片资源
echo "📁 复制图片资源..."
cp ../revealjs/public/bj.jpg ./public/images/ 2>/dev/null || echo "⚠️  bj.jpg 未找到"
cp ../revealjs/public/tina.png ./public/images/ 2>/dev/null || echo "⚠️  tina.png 未找到"
cp ../revealjs/public/chart.png ./public/images/ 2>/dev/null || echo "⚠️  chart.png 未找到"

echo ""
echo "📦 安装依赖..."
pnpm install || npm install

echo ""
echo "✅ 设置完成！"
echo ""
echo "🎯 运行以下命令启动开发服务器："
echo "   pnpm dev"
echo ""
echo "然后在浏览器中打开 http://localhost:3000"
