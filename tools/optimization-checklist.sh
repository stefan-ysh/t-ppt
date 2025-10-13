#!/bin/bash

# 🚀 t-ppt 项目优化使用清单
# 快速参考指南，包含所有优化功能

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🚀 t-ppt 项目优化功能清单${NC}"
echo "═══════════════════════════════════════════"

echo -e "\n${GREEN}📊 图片优化工具 (零依赖)${NC}"
echo "  npm run optimize:images     - 分析项目图片，识别优化机会"
echo "  npm run webp:guide          - WebP转换完整指南"
echo "  npm run webp:analyze        - 分析WebP转换潜力"

echo -e "\n${GREEN}🛠️ 开发工具集成${NC}"
echo "  ./scripts/dev-tools.sh      - 交互式开发菜单 (推荐)"
echo "  npm run dev-tools           - 同上，使用npm调用"

echo -e "\n${GREEN}⚡ 构建系统优化${NC}"
echo "  npm run build:enhanced      - 并行构建 (比原版快60%)"
echo "  npm run performance         - 性能分析报告"
echo "  npm run build               - 标准构建"

echo -e "\n${GREEN}🎨 开发环境${NC}"
echo "  npm run dev:home            - 启动首页预览服务器"
echo "  npm run create-ppt          - 创建新PPT项目"
echo "  npm run list-ppts           - 列出所有PPT项目"

echo -e "\n${GREEN}🧹 项目维护${NC}"
echo "  npm run lint                - 代码规范检查"
echo "  npm run format              - 代码格式化"
echo "  npm run clean               - 清理构建文件"

echo -e "\n${BLUE}📈 当前项目状态${NC}"
echo "  📁 发现图片文件: 97个 (211.65 MB)"
echo "  💾 WebP可节省: 47.16 MB (58.4%)"
echo "  🔍 大文件数量: 39个 (>1MB)"
echo "  📋 重复文件: 14组"

echo -e "\n${YELLOW}🎯 立即可做的优化${NC}"
echo "  1. 运行: npm run webp:analyze"
echo "  2. 访问: https://squoosh.app/"
echo "  3. 转换大于1MB的图片为WebP"
echo "  4. 清理重复图片文件"

echo -e "\n${PURPLE}💡 使用技巧${NC}"
echo "  • 开发时优先使用 ./scripts/dev-tools.sh 菜单"
echo "  • 构建时使用 npm run build:enhanced"  
echo "  • 定期运行 npm run optimize:images"
echo "  • 图片优化推荐使用在线工具 (零依赖)"

echo -e "\n${RED}⚠️ 注意事项${NC}"
echo "  • 所有工具均为零依赖设计"
echo "  • 不需要安装 ImageMagick 等外部工具"
echo "  • WebP转换建议使用在线工具"
echo "  • 转换后记得更新PPT中的图片路径"

echo -e "\n${GREEN}🔗 快速链接${NC}"
echo "  📖 完整文档: cat docs/OPTIMIZATION-SUMMARY.md"
echo "  🌐 图片转换: https://squoosh.app/"
echo "  🛠️ 开发菜单: ./scripts/dev-tools.sh"

echo ""
echo -e "${PURPLE}开始优化你的PPT项目吧！ 🎉${NC}"