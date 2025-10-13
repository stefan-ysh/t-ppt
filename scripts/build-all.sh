#!/bin/bash

# 多PPT统一构建脚本
set -e

echo "🚀 开始构建多PPT展示站..."

# 创建输出目录
mkdir -p dist

# 复制首页
echo "📄 复制首页文件..."
cp index.html dist/

# 查找所有PPT目录并构建
echo "🎨 构建所有PPT演示文稿..."

for ppt_dir in ppt/*/; do
    if [ -d "$ppt_dir" ] && [ -f "$ppt_dir/slides.md" ]; then
        ppt_name=$(basename "$ppt_dir")
        echo "  - 构建 $ppt_name PPT..."
        
        cd "$ppt_dir"
        
        # 检查是否有package.json，如果没有则创建
        if [ ! -f "package.json" ]; then
            echo "    创建package.json..."
            cat > package.json << EOF
{
  "name": "${ppt_name}-ppt",
  "version": "1.0.0",
  "description": "${ppt_name} PPT",
  "type": "module",
  "scripts": {
    "build": "slidev build --base /ppt/${ppt_name}/ --out ../../dist/ppt/${ppt_name}",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "dependencies": {
    "@slidev/cli": "^52.2.4",
    "@slidev/theme-default": "^0.25.0"
  }
}
EOF
        fi
        
        # 安装依赖（如果需要）
        if [ ! -d "node_modules" ]; then
            echo "    安装依赖..."
            npm install --silent
        fi
        
        # 构建
        npm run build --silent
        cd ../..
        
        echo "    ✅ $ppt_name 构建完成"
    fi
done

echo "✅ 所有PPT构建完成！"
echo "📁 输出目录: ./dist"
echo "🌐 本地预览: npm run preview"
echo "☁️  部署到Vercel: vercel --prod"