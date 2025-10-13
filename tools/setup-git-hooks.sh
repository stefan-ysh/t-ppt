#!/bin/bash

# Git Hooks 安装和配置脚本
# 自动化代码质量检查和格式化

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Git Hooks 安装和配置${NC}"
echo "════════════════════════════════════════"

# 检查是否在 Git 仓库中
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ 错误: 当前目录不是 Git 仓库${NC}"
    exit 1
fi

# 创建 hooks 目录
mkdir -p .git/hooks

# 创建 pre-commit hook
echo -e "${YELLOW}📝 创建 pre-commit hook...${NC}"

cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Pre-commit hook for PPT项目
# 运行代码质量检查和格式化

set -e

echo "🔍 Running pre-commit checks..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 获取暂存的文件
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|vue|md)$' || true)

if [ -z "$STAGED_FILES" ]; then
    echo -e "${GREEN}✅ 没有需要检查的文件${NC}"
    exit 0
fi

echo -e "${BLUE}检查的文件:${NC}"
echo "$STAGED_FILES" | sed 's/^/  - /'

# 1. ESLint 检查
echo -e "\n${YELLOW}🔍 运行 ESLint 检查...${NC}"
if npm run lint -- --quiet; then
    echo -e "${GREEN}✅ ESLint 检查通过${NC}"
else
    echo -e "${RED}❌ ESLint 检查失败${NC}"
    echo -e "${YELLOW}💡 提示: 运行 'npm run lint:fix' 自动修复部分问题${NC}"
    exit 1
fi

# 2. Prettier 格式化检查
echo -e "\n${YELLOW}🎨 检查代码格式...${NC}"
if npx prettier --check $STAGED_FILES 2>/dev/null; then
    echo -e "${GREEN}✅ 代码格式检查通过${NC}"
else
    echo -e "${YELLOW}📝 自动格式化代码...${NC}"
    npx prettier --write $STAGED_FILES
    
    # 重新添加格式化后的文件到暂存区
    git add $STAGED_FILES
    echo -e "${GREEN}✅ 代码已自动格式化并重新暂存${NC}"
fi

# 3. TypeScript 类型检查
echo -e "\n${YELLOW}🔧 TypeScript 类型检查...${NC}"
if npm run type-check 2>/dev/null; then
    echo -e "${GREEN}✅ TypeScript 类型检查通过${NC}"
else
    echo -e "${YELLOW}⚠️  TypeScript 类型检查有警告，但允许提交${NC}"
fi

# 4. 图片优化提醒
IMAGE_FILES=$(echo "$STAGED_FILES" | grep -E '\.(png|jpg|jpeg|gif)$' || true)
if [ ! -z "$IMAGE_FILES" ]; then
    echo -e "\n${YELLOW}🖼️  检测到图片文件变更:${NC}"
    echo "$IMAGE_FILES" | sed 's/^/  - /'
    echo -e "${BLUE}💡 提示: 记得运行 'npm run optimize:images' 优化图片${NC}"
fi

# 5. 大文件检查
echo -e "\n${YELLOW}📦 检查大文件...${NC}"
LARGE_FILES=""
for file in $STAGED_FILES; do
    if [ -f "$file" ]; then
        SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
        if [ "$SIZE" -gt 1048576 ]; then  # 1MB
            LARGE_FILES="$LARGE_FILES\n  - $file ($(echo $SIZE | awk '{printf "%.1f MB", $1/1024/1024}'))"
        fi
    fi
done

if [ ! -z "$LARGE_FILES" ]; then
    echo -e "${YELLOW}⚠️  发现大文件:${LARGE_FILES}${NC}"
    echo -e "${BLUE}💡 提示: 考虑压缩或使用 CDN 托管大文件${NC}"
fi

echo -e "\n${GREEN}🎉 所有检查完成！${NC}"
EOF

# 创建 pre-push hook
echo -e "${YELLOW}📤 创建 pre-push hook...${NC}"

cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

# Pre-push hook for PPT项目
# 推送前的最终检查

set -e

echo "🚀 Running pre-push checks..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. 构建测试
echo -e "${YELLOW}🏗️  测试构建...${NC}"
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 构建测试通过${NC}"
else
    echo -e "${RED}❌ 构建失败，请修复后重新推送${NC}"
    exit 1
fi

# 2. 依赖安全检查
echo -e "\n${YELLOW}🔒 检查依赖安全性...${NC}"
if npm audit --audit-level high > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 依赖安全检查通过${NC}"
else
    echo -e "${YELLOW}⚠️  发现依赖安全问题，建议运行 'npm audit fix'${NC}"
fi

# 3. 检查提交信息格式
echo -e "\n${YELLOW}📝 检查最近提交信息...${NC}"
LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
if echo "$LAST_COMMIT_MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}"; then
    echo -e "${GREEN}✅ 提交信息格式正确${NC}"
else
    echo -e "${YELLOW}⚠️  提交信息建议使用约定式格式：${NC}"
    echo -e "${BLUE}   格式: type(scope): description${NC}"
    echo -e "${BLUE}   示例: feat(ppt): 添加新的PPT模板${NC}"
fi

echo -e "\n${GREEN}🎉 Pre-push 检查完成！${NC}"
EOF

# 创建 commit-msg hook
echo -e "${YELLOW}💬 创建 commit-msg hook...${NC}"

cat > .git/hooks/commit-msg << 'EOF'
#!/bin/bash

# Commit message hook for PPT项目
# 验证提交信息格式

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat $COMMIT_MSG_FILE)

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 跳过合并提交
if echo "$COMMIT_MSG" | grep -q "^Merge"; then
    exit 0
fi

# 检查提交信息长度
if [ ${#COMMIT_MSG} -gt 72 ]; then
    echo -e "${YELLOW}⚠️  提交信息过长 (${#COMMIT_MSG} > 72 字符)${NC}"
    echo -e "${BLUE}💡 建议: 保持提交信息简洁明了${NC}"
fi

# 检查是否包含中文
if echo "$COMMIT_MSG" | grep -q "[\u4e00-\u9fa5]"; then
    echo -e "${GREEN}✅ 检测到中文提交信息${NC}"
fi

# 提供格式建议
if ! echo "$COMMIT_MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: "; then
    echo -e "${YELLOW}💡 提交信息格式建议:${NC}"
    echo -e "${BLUE}   feat: 新功能${NC}"
    echo -e "${BLUE}   fix: 修复问题${NC}"
    echo -e "${BLUE}   docs: 文档更新${NC}"
    echo -e "${BLUE}   style: 代码格式${NC}"
    echo -e "${BLUE}   refactor: 重构${NC}"
    echo -e "${BLUE}   test: 测试${NC}"
    echo -e "${BLUE}   chore: 构建工具等${NC}"
fi

exit 0
EOF

# 设置 hooks 可执行权限
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push  
chmod +x .git/hooks/commit-msg

echo -e "${GREEN}✅ Git Hooks 安装完成！${NC}"
echo ""
echo -e "${BLUE}📋 已安装的 Hooks:${NC}"
echo "  • pre-commit  - 代码质量检查和自动格式化"
echo "  • pre-push    - 推送前构建测试和安全检查"
echo "  • commit-msg  - 提交信息格式建议"
echo ""
echo -e "${YELLOW}🎯 使用建议:${NC}"
echo "  • 提交前会自动运行 ESLint 和 Prettier"
echo "  • 大文件和图片会有优化提醒"
echo "  • 推送前会进行构建测试"
echo "  • 使用约定式提交信息获得更好体验"
echo ""
echo -e "${GREEN}🚀 现在您的代码质量由 Git Hooks 自动保障！${NC}"