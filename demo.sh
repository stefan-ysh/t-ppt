#!/bin/bash

echo "🎨 PPT展示站 - 功能演示"
echo "=========================="
echo ""

echo "📋 当前PPT列表："
npm run list-ppts
echo ""

echo "🆕 创建演示PPT："
./create-ppt.sh demo-ppt "功能演示PPT"
echo ""

echo "📋 更新后的PPT列表："
npm run list-ppts
echo ""

echo "🏗️ 构建所有PPT："
npm run build
echo ""

echo "✅ 演示完成！"
echo ""
echo "🌐 访问 http://localhost:8080 查看首页"
echo "📱 首页会自动显示所有PPT，点击即可查看"
echo ""
echo "🔧 开发新PPT："
echo "   cd ppt/demo-ppt && npm run dev"