#!/bin/bash

# 增强版构建脚本 - 支持并行构建和优化

set -e

# 配置变量
BUILD_DIR="dist"
PPT_DIR="ppt"
BUILD_PARALLEL=${BUILD_PARALLEL:-true}
BUILD_THREADS=${BUILD_THREADS:-4}
BUILD_CACHE=${BUILD_CACHE:-true}

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
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

# 检查依赖
check_dependencies() {
    log_info "检查构建依赖..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装"
        exit 1
    fi
    
    log_success "依赖检查完成"
}

# 清理构建目录
clean_build() {
    log_info "清理构建目录..."
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"
    log_success "构建目录清理完成"
}

# 复制静态文件
copy_static_files() {
    log_info "复制静态文件..."
    
    if [ -f "index.html" ]; then
        cp index.html "$BUILD_DIR/"
        log_success "首页复制完成"
    else
        log_error "找不到 index.html"
        exit 1
    fi
    
    # 复制公共资源
    if [ -d "src/styles" ]; then
        mkdir -p "$BUILD_DIR/styles"
        cp -r src/styles/* "$BUILD_DIR/styles/"
        log_info "样式文件复制完成"
    fi
}

# 构建单个PPT
build_ppt() {
    local ppt_name=$1
    local ppt_path="$PPT_DIR/$ppt_name"
    
    if [ ! -f "$ppt_path/slides.md" ]; then
        log_warning "跳过 $ppt_name: 没有找到 slides.md"
        return 0
    fi
    
    log_info "构建 PPT: $ppt_name"
    
    cd "$ppt_path"
    
    # 安装依赖（如果需要）
    if [ ! -d "node_modules" ] || [ ! "$BUILD_CACHE" = "true" ]; then
        log_info "  安装 $ppt_name 的依赖..."
        npm install --silent
    fi
    
    # 构建PPT
    log_info "  编译 $ppt_name..."
    npm run build > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        log_success "  $ppt_name 构建完成"
    else
        log_error "  $ppt_name 构建失败"
        cd - > /dev/null
        return 1
    fi
    
    cd - > /dev/null
}

# 并行构建PPT
build_ppts_parallel() {
    log_info "并行构建所有PPT..."
    
    local pids=()
    local ppt_count=0
    
    for ppt_dir in "$PPT_DIR"/*; do
        if [ -d "$ppt_dir" ]; then
            ppt_name=$(basename "$ppt_dir")
            
            # 控制并发数量
            while [ ${#pids[@]} -ge "$BUILD_THREADS" ]; do
                for i in "${!pids[@]}"; do
                    if ! kill -0 "${pids[i]}" 2>/dev/null; then
                        unset "pids[i]"
                    fi
                done
                pids=("${pids[@]}")  # 重新索引数组
                sleep 0.1
            done
            
            # 启动构建进程
            build_ppt "$ppt_name" &
            pids+=($!)
            ((ppt_count++))
        fi
    done
    
    # 等待所有进程完成
    for pid in "${pids[@]}"; do
        wait "$pid"
    done
    
    log_success "并行构建完成，共处理 $ppt_count 个PPT"
}

# 串行构建PPT
build_ppts_serial() {
    log_info "串行构建所有PPT..."
    
    local ppt_count=0
    local failed_count=0
    
    for ppt_dir in "$PPT_DIR"/*; do
        if [ -d "$ppt_dir" ]; then
            ppt_name=$(basename "$ppt_dir")
            if ! build_ppt "$ppt_name"; then
                ((failed_count++))
            fi
            ((ppt_count++))
        fi
    done
    
    if [ $failed_count -gt 0 ]; then
        log_warning "串行构建完成，$failed_count/$ppt_count 个PPT构建失败"
        return 1
    else
        log_success "串行构建完成，共处理 $ppt_count 个PPT"
    fi
}

# 优化构建输出
optimize_build() {
    log_info "优化构建输出..."
    
    # 压缩图片（如果安装了imagemin）
    if command -v imagemin &> /dev/null; then
        find "$BUILD_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read img; do
            imagemin "$img" --out-dir="$(dirname "$img")" > /dev/null 2>&1
        done
        log_info "图片压缩完成"
    fi
    
    # 生成构建报告
    generate_build_report
    
    log_success "构建优化完成"
}

# 生成构建报告
generate_build_report() {
    local report_file="$BUILD_DIR/build-report.json"
    local build_time=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local build_size=$(du -sh "$BUILD_DIR" | cut -f1)
    
    cat > "$report_file" << EOF
{
  "buildTime": "$build_time",
  "buildSize": "$build_size",
  "pptCount": $(find "$BUILD_DIR/ppt" -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' '),
  "nodeVersion": "$(node --version)",
  "platform": "$(uname -s)"
}
EOF
    
    log_info "构建报告生成: $report_file"
}

# 主构建流程
main() {
    echo "🚀 开始增强构建流程..."
    
    # 检查依赖
    check_dependencies
    
    # 清理构建目录
    clean_build
    
    # 复制静态文件
    copy_static_files
    
    # 构建PPT
    if [ "$BUILD_PARALLEL" = "true" ]; then
        build_ppts_parallel
    else
        build_ppts_serial
    fi
    
    # 优化构建输出
    optimize_build
    
    log_success "构建完成！输出目录: $BUILD_DIR"
    
    # 显示构建统计
    echo ""
    echo "📊 构建统计:"
    echo "  📁 总大小: $(du -sh "$BUILD_DIR" | cut -f1)"
    echo "  📄 PPT数量: $(find "$BUILD_DIR/ppt" -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')"
    echo "  ⏱️  构建时间: $(date)"
}

# 错误处理
trap 'log_error "构建过程中发生错误"; exit 1' ERR

# 执行主流程
main "$@"