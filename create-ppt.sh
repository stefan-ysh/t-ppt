#!/bin/bash

# PPT创建工具
# 使用方法: ./create-ppt.sh [ppt-name] [title]

PPT_NAME=${1:-"new-presentation"}
PPT_TITLE=${2:-"新演示文稿"}

if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    echo "PPT创建工具"
    echo ""
    echo "使用方法:"
    echo "  ./create-ppt.sh [ppt-name] [title]"
    echo ""
    echo "示例:"
    echo "  ./create-ppt.sh my-awesome-ppt \"我的精彩演示\""
    echo "  ./create-ppt.sh ai-presentation \"AI技术分享\""
    echo ""
    echo "参数:"
    echo "  ppt-name  PPT目录名（英文，用-分隔单词）"
    echo "  title     PPT标题（中文）"
    exit 0
fi

echo "🎨 创建新PPT: $PPT_NAME"
echo "📝 标题: $PPT_TITLE"

# 创建PPT目录
PPT_DIR="ppt/$PPT_NAME"
mkdir -p "$PPT_DIR"

# 创建slides.md模板
cat > "$PPT_DIR/slides.md" << EOF
---
# PPT配置
theme: default
title: $PPT_TITLE
info: |
  ## $PPT_TITLE
  演示文稿描述
author: Your Name
date: $(date +%Y-%m)
# 布局配置
layout: cover
class: "text-center"
# 高亮器
highlighter: shiki
# 启用绘图
drawings:
  persist: false
# 切换效果
transition: slide-left
# 启用MDC语法
mdc: true
---

# $PPT_TITLE

演示文稿副标题

<div class="pt-12">
  <span @click="\$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    按空格键开始 <carbon:arrow-right class="inline"/>
  </span>
</div>

<!--
演示文稿备注
-->

---

# 目录

<Toc />

---
layout: default
---

# 第一部分

- 📝 要点一
- 🎯 要点二  
- 🚀 要点三

---

# 第二部分

内容...

---
layout: center
class: text-center
---

# 谢谢观看！

[文档](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev)
EOF

# 创建package.json
cat > "$PPT_DIR/package.json" << EOF
{
  "name": "${PPT_NAME}-ppt",
  "version": "1.0.0",
  "description": "$PPT_TITLE",
  "type": "module",
  "scripts": {
    "build": "slidev build --base /ppt/${PPT_NAME}/ --out ../../dist/ppt/${PPT_NAME}",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "dependencies": {
    "@slidev/cli": "^52.2.4",
    "@slidev/theme-default": "^0.25.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@iconify-json/mdi": "^1.2.3",
    "@types/node": "^20.0.0",
    "prettier": "^3.6.2"
  }
}
EOF

# 复制共享组件和工具（如果存在）
if [ -d "components" ]; then
    cp -r components "$PPT_DIR/"
    echo "📦 复制共享组件"
fi

if [ -d "lib" ]; then
    cp -r lib "$PPT_DIR/"
    echo "🛠️ 复制工具库"
fi

# 创建基础目录结构
mkdir -p "$PPT_DIR/public"
mkdir -p "$PPT_DIR/components"

# 更新首页配置中的PPT列表
TEMP_FILE=$(mktemp)
sed "/const knownPPTs = \[/s/\]/,'$PPT_NAME']/" index.html > "$TEMP_FILE" && mv "$TEMP_FILE" index.html

echo ""
echo "✅ PPT创建成功！"
echo ""
echo "📁 PPT目录: $PPT_DIR"
echo "📝 编辑内容: $PPT_DIR/slides.md"
echo ""
echo "🚀 开始开发:"
echo "   cd $PPT_DIR && npm install && npm run dev"
echo ""
echo "🏗️ 构建PPT:"
echo "   ./build-all.sh"
echo ""
echo "💡 提示: 编辑 $PPT_DIR/slides.md 来自定义您的演示内容"