#!/bin/bash

# PPT项目性能分析工具

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 分析构建大小
analyze_build_size() {
    local build_dir=${1:-"dist"}
    
    log_info "分析构建文件大小..."
    
    if [ ! -d "$build_dir" ]; then
        log_error "构建目录不存在: $build_dir"
        return 1
    fi
    
    echo "📊 构建分析报告:"
    echo "════════════════════════════════════════"
    
    # 总大小
    local total_size=$(du -sh "$build_dir" | cut -f1)
    echo "📁 总大小: $total_size"
    echo ""
    
    # PPT目录大小分析
    echo "📂 PPT文件大小分布:"
    find "$build_dir/ppt" -maxdepth 1 -type d | while read ppt_dir; do
        if [ "$ppt_dir" != "$build_dir/ppt" ]; then
            local ppt_name=$(basename "$ppt_dir")
            local ppt_size=$(du -sh "$ppt_dir" | cut -f1)
            echo "  📊 $ppt_name: $ppt_size"
        fi
    done
    echo ""
    
    # 大文件分析
    echo "📄 大文件分析 (>1MB):"
    find "$build_dir" -type f -size +1M -exec ls -lh {} \; | \
    awk '{print "  💾 " $5 " - " $NF}' | head -10
    echo ""
    
    # 文件类型统计
    echo "📋 文件类型统计:"
    find "$build_dir" -type f | grep -o '\.[^.]*$' | sort | uniq -c | sort -nr | head -10 | \
    while read count ext; do
        echo "  📄 $ext: $count 个文件"
    done
}

# 分析图片使用情况
analyze_images() {
    local ppt_dir=${1:-"ppt"}
    
    log_info "分析图片使用情况..."
    
    echo "🖼️  图片分析报告:"
    echo "════════════════════════════════════════"
    
    local total_images=0
    local total_size=0
    
    # 统计各种图片格式
    for ext in jpg jpeg png gif webp mp4 mov; do
        local count=$(find "$ppt_dir" -name "*.$ext" -o -name "*.$ext" | wc -l | tr -d ' ')
        if [ "$count" -gt 0 ]; then
            local size=$(find "$ppt_dir" -name "*.$ext" -exec ls -l {} \; | awk '{sum+=$5} END {print sum}')
            local size_mb=$(echo "scale=2; $size/1024/1024" | bc -l 2>/dev/null || echo "0")
            echo "  📷 .$ext: $count 个文件, ${size_mb}MB"
            total_images=$((total_images + count))
            total_size=$((total_size + size))
        fi
    done
    
    echo ""
    echo "  📊 总计: $total_images 个媒体文件"
    local total_mb=$(echo "scale=2; $total_size/1024/1024" | bc -l 2>/dev/null || echo "0")
    echo "  📦 总大小: ${total_mb}MB"
    
    # 建议
    echo ""
    echo "💡 优化建议:"
    if [ "$total_images" -gt 50 ]; then
        echo "  ⚠️  图片文件较多，建议实施懒加载"
    fi
    if (( $(echo "$total_mb > 50" | bc -l 2>/dev/null || echo 0) )); then
        echo "  ⚠️  图片总大小较大，建议压缩优化"
    fi
    echo "  💾 考虑转换为WebP格式以减小文件大小"
    echo "  🚀 使用 ../tools/optimize-images.sh 进行优化"
}

# 分析重复文件
analyze_duplicates() {
    local source_dir=${1:-"ppt"}
    
    log_info "检查重复文件..."
    
    echo "🔍 重复文件分析:"
    echo "════════════════════════════════════════"
    
    # 查找重复的组件文件
    find "$source_dir" -name "*.vue" -type f | while read file; do
        local filename=$(basename "$file")
        local matches=$(find "$source_dir" -name "$filename" -type f | wc -l | tr -d ' ')
        
        if [ "$matches" -gt 1 ]; then
            echo "🔄 重复组件: $filename ($matches 个副本)"
            find "$source_dir" -name "$filename" -type f | while read duplicate; do
                echo "    📁 $duplicate"
            done
            echo ""
        fi
    done
    
    # 查找重复的图片文件（基于文件大小）
    find "$source_dir" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" \) -exec ls -l {} \; | \
    awk '{print $5 " " $NF}' | sort | uniq -d -w 10 | while read size file; do
        if [ ! -z "$size" ]; then
            echo "📷 可能重复的图片 (大小: $size 字节):"
            find "$source_dir" -type f -size "${size}c" | head -3 | while read dup; do
                echo "    📁 $dup"
            done
            echo ""
        fi
    done
}

# 性能基准测试
performance_benchmark() {
    log_info "运行性能基准测试..."
    
    echo "⚡ 性能基准测试:"
    echo "════════════════════════════════════════"
    
    # 构建性能测试
    echo "🏗️  构建性能测试:"
    local start_time=$(date +%s)
    
    # 运行构建（静默模式）
    if npm run build > /dev/null 2>&1; then
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        echo "  ⏱️  构建时间: ${duration}秒"
        log_success "构建测试完成"
    else
        log_error "构建测试失败"
    fi
    
    # 启动时间测试（如果可用）
    echo ""
    echo "🚀 启动时间测试:"
    echo "  💡 建议使用浏览器开发者工具进行详细性能分析"
    
    # 建议
    echo ""
    echo "📈 性能优化建议:"
    echo "  🔄 实施代码分割和懒加载"
    echo "  💾 启用Gzip/Brotli压缩"
    echo "  🎯 优化图片和媒体文件"
    echo "  ⚡ 使用Service Worker进行缓存"
}

# 生成优化报告
generate_optimization_report() {
    local report_file="optimization-report.md"
    local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    
    log_info "生成优化报告..."
    
    cat > "$report_file" << EOF
# PPT项目优化报告

生成时间: $timestamp

## 📊 项目概览

$(cd dist 2>/dev/null && find . -name "*.html" | wc -l | tr -d ' ') 个HTML文件
$(find ppt -name "*.md" 2>/dev/null | wc -l | tr -d ' ') 个PPT文件
$(find ppt -name "*.vue" 2>/dev/null | wc -l | tr -d ' ') 个Vue组件
$(find ppt -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.mp4" \) 2>/dev/null | wc -l | tr -d ' ') 个媒体文件

## 📂 构建大小分析

\`\`\`
$(analyze_build_size 2>/dev/null | sed 's/\x1b\[[0-9;]*m//g')
\`\`\`

## 🎯 主要优化建议

### 高优先级
- [ ] 实施图片压缩和WebP转换
- [ ] 添加代码分割和懒加载
- [ ] 优化大文件的加载策略

### 中优先级  
- [ ] 创建共享组件库，消除重复代码
- [ ] 实施Service Worker缓存策略
- [ ] 添加构建优化和Bundle分析

### 低优先级
- [ ] 优化开发工具和构建流程
- [ ] 添加性能监控和分析工具
- [ ] 完善文档和测试覆盖

## 🛠️ 推荐工具

- 图片优化: \`../tools/optimize-images.sh\`
- 增强构建: \`./build-enhanced.sh\`
- 性能分析: \`./performance-analysis.sh\`

EOF

    log_success "优化报告已生成: $report_file"
}

# 主函数
main() {
    local action=${1:-"all"}
    
    echo "🔍 PPT项目性能分析工具"
    echo "════════════════════════════════════════"
    
    case $action in
        "build")
            analyze_build_size
            ;;
        "images") 
            analyze_images
            ;;
        "duplicates")
            analyze_duplicates
            ;;
        "benchmark")
            performance_benchmark
            ;;
        "report")
            generate_optimization_report
            ;;
        "all")
            analyze_build_size
            echo ""
            analyze_images  
            echo ""
            analyze_duplicates
            echo ""
            performance_benchmark
            echo ""
            generate_optimization_report
            ;;
        *)
            echo "用法: $0 [build|images|duplicates|benchmark|report|all]"
            echo ""
            echo "选项:"
            echo "  build       - 分析构建文件大小"
            echo "  images      - 分析图片使用情况"
            echo "  duplicates  - 检查重复文件"
            echo "  benchmark   - 运行性能基准测试"
            echo "  report      - 生成优化报告"
            echo "  all         - 运行所有分析"
            exit 1
            ;;
    esac
}

main "$@"