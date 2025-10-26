#!/bin/bash

# Template Cleanup Script
# 整理和清理项目模板文件

set -e

echo "🧹 开始清理项目模板..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 清理函数
cleanup_duplicates() {
    echo -e "${YELLOW}📋 检查重复文件...${NC}"
    
    # 检查重复的组件文件 (简化版，不使用关联数组)
    tmp_file="/tmp/file_hashes_$$"
    find ppt/*/components -name "*.vue" 2>/dev/null | while read file; do
        if [ -f "$file" ]; then
            hash=$(md5 "$file" 2>/dev/null | cut -d' ' -f4 || echo "no-hash")
            echo "$hash:$file" >> "$tmp_file"
        fi
    done
    
    # 检查重复
    if [ -f "$tmp_file" ]; then
        sort "$tmp_file" | uniq -d -f1 | while IFS=: read hash file; do
            if [ ! -z "$file" ]; then
                echo -e "${RED}🔍 发现可能重复的文件: $file${NC}"
            fi
        done
        rm -f "$tmp_file"
    fi
}

# 检查空目录
check_empty_dirs() {
    echo -e "${YELLOW}📁 检查空目录...${NC}"
    
    find ppt -type d -empty 2>/dev/null | while read dir; do
        if [ ! -z "$dir" ]; then
            echo -e "${RED}📂 空目录: $dir${NC}"
        fi
    done
}

# 统计组件使用情况
analyze_component_usage() {
    echo -e "${YELLOW}📊 分析组件使用情况...${NC}"
    
    # 检查每个PPT目录
    for ppt_dir in ppt/*/; do
        if [ -d "$ppt_dir" ] && [ -f "$ppt_dir/slides.md" ]; then
            ppt_name=$(basename "$ppt_dir")
            echo -e "${GREEN}📝 PPT: $ppt_name${NC}"
            
            # 检查components目录
            if [ -d "$ppt_dir/components" ]; then
                component_count=$(find "$ppt_dir/components" -name "*.vue" | wc -l)
                echo "  组件数量: $component_count"
                
                # 列出所有组件
                find "$ppt_dir/components" -name "*.vue" | while read component; do
                    comp_name=$(basename "$component" .vue)
                    # 检查是否在slides.md中被引用
                    if grep -q "<$comp_name" "$ppt_dir/slides.md" 2>/dev/null; then
                        echo "  ✅ $comp_name (已使用)"
                    else
                        echo -e "  ${RED}❌ $comp_name (未使用)${NC}"
                    fi
                done
            else
                echo "  📦 无组件目录"
            fi
            echo
        fi
    done
}

# 建议清理操作
suggest_cleanup() {
    echo -e "${YELLOW}💡 清理建议:${NC}"
    
    echo "1. 删除test-presentation目录 (测试用，可删除)"
    echo "2. 合并重复的组件文件到共享组件库"
    echo "3. 删除未使用的组件文件"
    echo "4. 清理空的public目录"
    echo
    
    read -p "是否执行自动清理? (y/N): " confirm
    
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        echo -e "${GREEN}🚀 开始自动清理...${NC}"
        
        # 删除test-presentation
        if [ -d "ppt/test-presentation" ]; then
            echo "🗑️  删除测试演示文稿..."
            rm -rf ppt/test-presentation
            echo -e "${GREEN}✅ 已删除 test-presentation${NC}"
        fi
        
        # 清理空目录
        echo "🧹 清理空目录..."
        find ppt -type d -empty -delete 2>/dev/null || true
        
        echo -e "${GREEN}✨ 清理完成!${NC}"
    else
        echo "取消清理操作"
    fi
}

# 主执行流程
main() {
    echo -e "${GREEN}🎯 T-PPT 项目模板清理工具${NC}"
    echo "=================================="
    echo
    
    cleanup_duplicates
    echo
    
    check_empty_dirs
    echo
    
    analyze_component_usage
    echo
    
    suggest_cleanup
}

# 检查是否在项目根目录
if [ ! -f "package.json" ] || [ ! -d "ppt" ]; then
    echo -e "${RED}❌ 请在项目根目录运行此脚本${NC}"
    exit 1
fi

main "$@"