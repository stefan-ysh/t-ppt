#!/bin/bash

# 图片优化脚本
# 依赖: imagemin-cli, sharp

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
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

# 检查依赖
check_dependencies() {
    if ! command -v convert &> /dev/null; then
        log_warning "ImageMagick未安装，跳过图片优化"
        return 1
    fi
    return 0
}

# 优化单张图片
optimize_image() {
    local input_file=$1
    local output_file=$2
    local quality=${3:-85}
    
    # 获取文件扩展名
    local ext="${input_file##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    case $ext in
        jpg|jpeg)
            convert "$input_file" -quality "$quality" -strip "$output_file"
            ;;
        png)
            convert "$input_file" -quality "$quality" -strip "$output_file"
            ;;
        webp)
            # WebP已经是优化格式，只是复制
            cp "$input_file" "$output_file"
            ;;
        *)
            log_warning "不支持的图片格式: $ext"
            return 1
            ;;
    esac
}

# 批量优化图片
optimize_images() {
    local source_dir=${1:-"ppt"}
    local quality=${2:-85}
    
    log_info "开始优化图片，质量设置: $quality%"
    
    local count=0
    local saved_size=0
    
    find "$source_dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | while read -r img_file; do
        if [ -f "$img_file" ]; then
            # 获取原始文件大小
            local original_size=$(stat -f%z "$img_file" 2>/dev/null || stat -c%s "$img_file" 2>/dev/null)
            
            # 创建临时文件
            local temp_file="${img_file}.tmp"
            
            if optimize_image "$img_file" "$temp_file" "$quality"; then
                # 获取优化后文件大小
                local new_size=$(stat -f%z "$temp_file" 2>/dev/null || stat -c%s "$temp_file" 2>/dev/null)
                
                # 如果文件变小了，替换原文件
                if [ "$new_size" -lt "$original_size" ]; then
                    mv "$temp_file" "$img_file"
                    local saved=$((original_size - new_size))
                    saved_size=$((saved_size + saved))
                    count=$((count + 1))
                    log_info "优化: $(basename "$img_file") - 节省 $(echo "scale=2; $saved/1024" | bc -l)KB"
                else
                    # 如果文件变大了，删除临时文件
                    rm -f "$temp_file"
                fi
            else
                rm -f "$temp_file"
            fi
        fi
    done
    
    if [ $count -gt 0 ]; then
        log_success "图片优化完成！优化了 $count 张图片，总共节省 $(echo "scale=2; $saved_size/1024/1024" | bc -l)MB"
    else
        log_info "没有需要优化的图片"
    fi
}

# 生成WebP格式
generate_webp() {
    local source_dir=${1:-"ppt"}
    
    log_info "生成WebP格式图片..."
    
    find "$source_dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r img_file; do
        local webp_file="${img_file%.*}.webp"
        
        # 只有当WebP文件不存在时才生成
        if [ ! -f "$webp_file" ]; then
            if command -v cwebp &> /dev/null; then
                cwebp -q 85 "$img_file" -o "$webp_file"
                log_info "生成WebP: $(basename "$webp_file")"
            elif command -v convert &> /dev/null; then
                convert "$img_file" -quality 85 "$webp_file"
                log_info "生成WebP: $(basename "$webp_file")"
            fi
        fi
    done
}

# 清理未使用的图片
clean_unused_images() {
    local ppt_dir=${1:-"ppt"}
    
    log_info "检查未使用的图片..."
    
    find "$ppt_dir" -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" | while read -r img_file; do
        local img_name=$(basename "$img_file")
        local img_name_no_ext="${img_name%.*}"
        
        # 检查图片是否在slides.md中被引用
        local ppt_folder=$(dirname "$img_file")
        local slides_file="$ppt_folder/slides.md"
        
        if [ -f "$slides_file" ]; then
            if ! grep -q "$img_name\|$img_name_no_ext" "$slides_file"; then
                log_warning "可能未使用的图片: $img_file"
                # 不自动删除，只是报告
            fi
        fi
    done
}

# 主函数
main() {
    log_info "🖼️  图片优化工具"
    
    # 检查依赖
    if ! check_dependencies; then
        exit 1
    fi
    
    local action=${1:-"optimize"}
    local target_dir=${2:-"ppt"}
    local quality=${3:-85}
    
    case $action in
        "optimize")
            optimize_images "$target_dir" "$quality"
            ;;
        "webp")
            generate_webp "$target_dir"
            ;;
        "clean")
            clean_unused_images "$target_dir"
            ;;
        "all")
            optimize_images "$target_dir" "$quality"
            generate_webp "$target_dir"
            clean_unused_images "$target_dir"
            ;;
        *)
            echo "用法: $0 [optimize|webp|clean|all] [目录] [质量(1-100)]"
            echo "示例："
            echo "  $0 optimize ppt 85    # 优化图片质量为85%"
            echo "  $0 webp ppt           # 生成WebP格式"
            echo "  $0 clean ppt          # 检查未使用的图片"
            echo "  $0 all ppt 90         # 执行所有操作"
            exit 1
            ;;
    esac
}

main "$@"