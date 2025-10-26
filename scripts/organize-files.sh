#!/bin/bash

# File Organization Script
# 整理根目录的文档和脚本文件到合适的位置

set -e

echo "🗂️ 开始整理项目文件结构..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 记录移动的文件
moved_files=()

# 移动文档文件
move_docs() {
    echo -e "${YELLOW}📚 整理文档文件...${NC}"
    
    # 移动部署相关文档
    if [ -f "DEPLOYMENT.md" ]; then
        echo "  📄 移动 DEPLOYMENT.md -> docs/"
        mv DEPLOYMENT.md docs/
        moved_files+=("DEPLOYMENT.md -> docs/")
    fi
    
    # 移动项目结构文档
    if [ -f "PROJECT-STRUCTURE.md" ]; then
        echo "  📄 移动 PROJECT-STRUCTURE.md -> docs/"
        mv PROJECT-STRUCTURE.md docs/
        moved_files+=("PROJECT-STRUCTURE.md -> docs/")
    fi
}

# 移动构建脚本
move_scripts() {
    echo -e "${YELLOW}🔧 整理构建脚本...${NC}"
    
    # 移动构建脚本到scripts目录
    if [ -f "build.js" ]; then
        echo "  📄 移动 build.js -> scripts/"
        mv build.js scripts/
        moved_files+=("build.js -> scripts/")
    fi
    
    if [ -f "build-unified.js" ]; then
        echo "  📄 移动 build-unified.js -> scripts/"
        mv build-unified.js scripts/
        moved_files+=("build-unified.js -> scripts/")
    fi
}

# 移动Service Worker
move_sw() {
    echo -e "${YELLOW}⚙️ 整理Service Worker...${NC}"
    
    if [ -f "sw.js" ]; then
        echo "  📄 移动 sw.js -> src/"
        mv sw.js src/
        moved_files+=("sw.js -> src/")
    fi
}

# 更新package.json中的构建脚本路径
update_package_json() {
    echo -e "${YELLOW}📦 更新package.json构建路径...${NC}"
    
    # 创建备份
    cp package.json package.json.bak
    
    # 使用sed更新路径
    sed -i.tmp 's|"build": "node build-unified.js"|"build": "node scripts/build-unified.js"|g' package.json
    sed -i.tmp 's|"build:legacy": "node build.js"|"build:legacy": "node scripts/build.js"|g' package.json
    
    # 清理临时文件
    rm -f package.json.tmp
    
    echo "  ✅ 已更新package.json中的构建脚本路径"
    moved_files+=("package.json 构建路径已更新")
}

# 更新构建脚本中的相对路径
update_build_scripts() {
    echo -e "${YELLOW}🔄 更新构建脚本中的路径引用...${NC}"
    
    # 更新build-unified.js中的路径
    if [ -f "scripts/build-unified.js" ]; then
        # 备份
        cp scripts/build-unified.js scripts/build-unified.js.bak
        
        # 更新相对路径，因为脚本现在在scripts目录中
        sed -i.tmp 's|pptDir: path.join(__dirname, \"ppt\")|pptDir: path.join(__dirname, \"..\", \"ppt\")|g' scripts/build-unified.js
        sed -i.tmp 's|buildDir: \"dist\"|buildDir: path.join(__dirname, \"..\", \"dist\")|g' scripts/build-unified.js
        sed -i.tmp 's|\"index.html\"|path.join(__dirname, \"..\", \"index.html\")|g' scripts/build-unified.js
        
        # 清理临时文件
        rm -f scripts/build-unified.js.tmp
        
        echo "  ✅ 已更新build-unified.js中的路径"
        moved_files+=("scripts/build-unified.js 路径已更新")
    fi
    
    # 更新build.js中的路径
    if [ -f "scripts/build.js" ]; then
        # 备份
        cp scripts/build.js scripts/build.js.bak
        
        # 更新相对路径
        sed -i.tmp 's|\"ppt\"|path.join(__dirname, \"..\", \"ppt\")|g' scripts/build.js
        sed -i.tmp 's|\"dist\"|path.join(__dirname, \"..\", \"dist\")|g' scripts/build.js
        sed -i.tmp 's|\"index.html\"|path.join(__dirname, \"..\", \"index.html\")|g' scripts/build.js
        
        # 清理临时文件
        rm -f scripts/build.js.tmp
        
        echo "  ✅ 已更新build.js中的路径"
        moved_files+=("scripts/build.js 路径已更新")
    fi
}

# 创建新的README说明文件结构
update_readme() {
    echo -e "${YELLOW}📖 更新README文档结构说明...${NC}"
    
    # 在README中添加文件结构说明
    cat >> README.md << 'EOF'

## 📁 项目文件结构

```
├── 📁 docs/                   # 项目文档
│   ├── DEPLOYMENT.md          # 部署指南
│   ├── PROJECT-STRUCTURE.md   # 项目结构说明
│   └── OPTIMIZATION-*.md      # 优化相关文档
├── 📁 scripts/                # 构建和开发脚本
│   ├── build-unified.js       # 统一构建脚本 (推荐)
│   ├── build.js              # 传统构建脚本
│   ├── template-cleanup.sh    # 模板清理工具
│   └── 其他脚本...
├── 📁 src/                    # 源代码
│   ├── styles/               # 样式文件
│   └── sw.js                 # Service Worker
├── 📁 ppt/                    # PPT项目目录
└── 📁 tools/                  # 开发工具
```

### 🚀 主要命令

```bash
# 构建 (使用统一构建脚本)
npm run build

# 开发模式
npm run dev

# 项目清理
npm run cleanup

# 本地预览
npm run preview
```
EOF

    echo "  ✅ 已更新README文件结构说明"
    moved_files+=("README.md 添加了文件结构说明")
}

# 测试构建是否正常工作
test_build() {
    echo -e "${YELLOW}🧪 测试构建系统...${NC}"
    
    # 清理之前的构建
    rm -rf dist/
    
    # 运行构建测试
    if npm run build > /dev/null 2>&1; then
        echo -e "${GREEN}  ✅ 构建测试通过${NC}"
        return 0
    else
        echo -e "${RED}  ❌ 构建测试失败${NC}"
        return 1
    fi
}

# 回滚功能
rollback() {
    echo -e "${RED}🔄 构建失败，正在回滚更改...${NC}"
    
    # 恢复package.json
    if [ -f "package.json.bak" ]; then
        mv package.json.bak package.json
        echo "  ✅ 已恢复package.json"
    fi
    
    # 恢复构建脚本
    if [ -f "scripts/build-unified.js.bak" ]; then
        mv scripts/build-unified.js.bak scripts/build-unified.js
        echo "  ✅ 已恢复build-unified.js"
    fi
    
    if [ -f "scripts/build.js.bak" ]; then
        mv scripts/build.js.bak scripts/build.js
        echo "  ✅ 已恢复build.js"
    fi
    
    # 移回文件到根目录
    [ -f "docs/DEPLOYMENT.md" ] && mv docs/DEPLOYMENT.md ./
    [ -f "docs/PROJECT-STRUCTURE.md" ] && mv docs/PROJECT-STRUCTURE.md ./
    [ -f "scripts/build.js" ] && mv scripts/build.js ./
    [ -f "scripts/build-unified.js" ] && mv scripts/build-unified.js ./
    [ -f "src/sw.js" ] && mv src/sw.js ./
    
    echo -e "${YELLOW}  ⚠️  已回滚所有更改${NC}"
}

# 显示整理结果
show_results() {
    echo -e "${GREEN}✨ 文件整理完成！${NC}"
    echo
    echo -e "${BLUE}📋 移动的文件:${NC}"
    for file in "${moved_files[@]}"; do
        echo "  - $file"
    done
    
    echo
    echo -e "${GREEN}🎯 整理后的项目结构更加清晰：${NC}"
    echo "  📚 docs/ - 所有项目文档"
    echo "  🔧 scripts/ - 所有构建脚本"
    echo "  💻 src/ - 源代码文件"
    echo "  📦 ppt/ - PPT项目"
    echo "  🛠️ tools/ - 开发工具"
}

# 主执行流程
main() {
    echo -e "${GREEN}🗂️ T-PPT 项目文件整理工具${NC}"
    echo "========================================="
    echo
    
    # 检查是否在项目根目录
    if [ ! -f "package.json" ] || [ ! -d "ppt" ]; then
        echo -e "${RED}❌ 请在项目根目录运行此脚本${NC}"
        exit 1
    fi
    
    # 确保必要的目录存在
    mkdir -p docs scripts src tools
    
    # 执行整理步骤
    move_docs
    echo
    
    move_scripts
    echo
    
    move_sw
    echo
    
    update_package_json
    echo
    
    update_build_scripts
    echo
    
    update_readme
    echo
    
    # 测试构建
    if test_build; then
        echo
        show_results
        
        # 清理备份文件
        rm -f package.json.bak scripts/*.bak
    else
        echo
        rollback
        exit 1
    fi
}

# 执行主函数
main "$@"