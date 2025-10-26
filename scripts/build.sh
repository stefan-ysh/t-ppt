#!/bin/bash

# PPT展示站构建脚本
set -e

echo "🚀 开始构建PPT展示站..."

# 创建输出目录
mkdir -p dist

# 复制首页
echo "📄 复制首页文件..."
cp index.html dist/

# 构建各个PPT
echo "🎨 构建PPT演示文稿..."

# 构建 luminescent-materials PPT
echo "  - 构建长余辉自发光材料PPT..."
cd ppt/luminescent-materials

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
    echo "    安装依赖..."
    npm install
fi

# 构建
npm run build
cd ../..

echo "✅ 构建完成！"
echo "📁 输出目录: ./dist"
echo "🌐 本地预览: npm run preview"
echo "☁️  部署到Vercel: vercel --prod"