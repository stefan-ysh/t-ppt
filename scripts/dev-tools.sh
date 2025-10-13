#!/bin/bash

# PPT项目开发工具

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
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

log_dev() {
    echo -e "${PURPLE}🔧 $1${NC}"
}

# 显示开发菜单
show_menu() {
    echo ""
    echo "🎨 PPT项目开发工具"
    echo "════════════════════════════════════════"
    echo "1. 📝 创建新PPT"
    echo "2. 🖥️  启动首页开发服务器"
    echo "3. 📊 开发指定PPT"
    echo "4. 🔍 列出所有PPT"
    echo "5. 🏗️  构建项目"
    echo "6. 👀 预览构建结果"
    echo "7. 🧹 清理项目"
    echo "8. 📈 性能分析"
    echo "9. 🛠️  项目维护"
    echo "w. 📸 WebP转换指南"
    echo "0. 🚪 退出"
    echo "════════════════════════════════════════"
    echo -n "请选择操作 (0-9): "
}

# 创建新PPT
create_ppt() {
    echo ""
    log_dev "创建新PPT"
    echo -n "请输入PPT名称 (英文，用-分隔): "
    read ppt_name
    
    if [ -z "$ppt_name" ]; then
        log_error "PPT名称不能为空"
        return 1
    fi
    
    echo -n "请输入PPT标题: "
    read ppt_title
    
    if [ -z "$ppt_title" ]; then
        ppt_title="新演示文稿"
    fi
    
    log_info "正在创建PPT: $ppt_name - $ppt_title"
    
    if [ -f "./create-ppt.sh" ]; then
        ./create-ppt.sh "$ppt_name" "$ppt_title"
    else
        log_error "创建脚本不存在"
        return 1
    fi
    
    # 询问是否立即开始开发
    echo ""
    echo -n "是否立即开始开发这个PPT? (y/n): "
    read start_dev
    
    if [ "$start_dev" = "y" ] || [ "$start_dev" = "Y" ]; then
        dev_ppt "$ppt_name"
    fi
}

# 开发指定PPT
dev_ppt() {
    local ppt_name=$1
    
    if [ -z "$ppt_name" ]; then
        echo ""
        log_dev "选择要开发的PPT"
        list_ppts_simple
        echo -n "请输入PPT名称: "
        read ppt_name
    fi
    
    if [ -z "$ppt_name" ]; then
        log_error "PPT名称不能为空"
        return 1
    fi
    
    local ppt_dir="ppt/$ppt_name"
    
    if [ ! -d "$ppt_dir" ]; then
        log_error "PPT目录不存在: $ppt_dir"
        return 1
    fi
    
    log_info "启动PPT开发服务器: $ppt_name"
    
    # 检查依赖
    if [ ! -d "$ppt_dir/node_modules" ]; then
        log_info "安装PPT依赖..."
        cd "$ppt_dir"
        npm install --silent
        cd - > /dev/null
    fi
    
    # 启动开发服务器
    cd "$ppt_dir"
    log_success "开发服务器启动中..."
    log_info "编辑文件: $ppt_dir/slides.md"
    npm run dev
    cd - > /dev/null
}

# 列出所有PPT（详细版）
list_ppts() {
    echo ""
    log_dev "项目中的所有PPT"
    echo "════════════════════════════════════════"
    
    local count=0
    
    for ppt_dir in ppt/*/; do
        if [ -d "$ppt_dir" ]; then
            local ppt_name=$(basename "$ppt_dir")
            local slides_file="$ppt_dir/slides.md"
            
            if [ -f "$slides_file" ]; then
                # 提取标题
                local title=$(grep -m 1 "^title:" "$slides_file" 2>/dev/null | sed "s/title: *//" | tr -d "\"'" || echo "无标题")
                # 检查构建状态
                local build_status="❓"
                if [ -d "dist/ppt/$ppt_name" ]; then
                    build_status="✅"
                else
                    build_status="❌"
                fi
                
                # 统计幻灯片数量
                local slide_count=$(grep -c "^---" "$slides_file" 2>/dev/null || echo "0")
                
                echo "📊 $ppt_name"
                echo "    📝 标题: $title"
                echo "    📄 幻灯片: $slide_count 页"
                echo "    🏗️  构建状态: $build_status"
                echo "    📁 路径: $ppt_dir"
                echo ""
                
                count=$((count + 1))
            fi
        fi
    done
    
    if [ $count -eq 0 ]; then
        log_warning "没有找到任何PPT"
        echo "💡 使用选项1创建新的PPT"
    else
        log_success "找到 $count 个PPT"
    fi
}

# 列出PPT（简单版）
list_ppts_simple() {
    echo "可用的PPT:"
    for ppt_dir in ppt/*/; do
        if [ -d "$ppt_dir" ] && [ -f "$ppt_dir/slides.md" ]; then
            local ppt_name=$(basename "$ppt_dir")
            echo "  📊 $ppt_name"
        fi
    done
}

# 启动首页开发服务器
dev_home() {
    echo ""
    log_dev "启动首页开发服务器"
    
    local port=8080
    log_info "服务器将在端口 $port 启动"
    log_info "访问地址: http://localhost:$port"
    log_success "按 Ctrl+C 停止服务器"
    
    if command -v python3 &> /dev/null; then
        python3 -m http.server $port
    elif command -v python &> /dev/null; then
        python -m http.server $port
    else
        log_error "未找到Python，无法启动开发服务器"
        return 1
    fi
}

# 构建项目
build_project() {
    echo ""
    log_dev "构建项目"
    
    echo "选择构建方式:"
    echo "1. 🚀 增强构建 (推荐)"
    echo "2. ⚡ 标准构建"
    echo "3. 🔧 Shell构建"
    echo -n "请选择 (1-3): "
    read build_type
    
    case $build_type in
        1)
            if [ -f "./build-enhanced.sh" ]; then
                ./build-enhanced.sh
            else
                log_error "增强构建脚本不存在"
            fi
            ;;
        2)
            npm run build
            ;;
        3)
            npm run build:shell
            ;;
        *)
            log_warning "使用默认构建方式"
            npm run build
            ;;
    esac
}

# 预览构建结果
preview_build() {
    echo ""
    log_dev "预览构建结果"
    
    if [ ! -d "dist" ]; then
        log_error "构建目录不存在，请先构建项目"
        return 1
    fi
    
    local port=8080
    log_info "预览服务器将在端口 $port 启动"
    log_info "访问地址: http://localhost:$port"
    log_success "按 Ctrl+C 停止服务器"
    
    npm run preview
}

# 清理项目
clean_project() {
    echo ""
    log_dev "清理项目"
    
    echo "⚠️  这将删除以下内容:"
    echo "  🗑️  dist/ 目录"
    echo "  🗑️  所有PPT的node_modules/"
    echo "  🗑️  所有PPT的dist/"
    echo ""
    echo -n "确定要继续吗? (y/n): "
    read confirm
    
    if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
        log_info "清理中..."
        npm run clean
        log_success "清理完成"
    else
        log_info "已取消清理操作"
    fi
}

# 性能分析
performance_analysis() {
    echo ""
    log_dev "性能分析"
    
    if [ -f "./performance-analysis.sh" ]; then
        echo "选择分析类型:"
        echo "1. 📊 完整分析"
        echo "2. 🏗️  构建大小分析"  
        echo "3. 🖼️  图片分析"
        echo "4. 🔍 重复文件检查"
        echo "5. ⚡ 性能基准测试"
        echo -n "请选择 (1-5): "
        read analysis_type
        
        case $analysis_type in
            1) ./performance-analysis.sh all ;;
            2) ./performance-analysis.sh build ;;
            3) ./performance-analysis.sh images ;;
            4) ./performance-analysis.sh duplicates ;;
            5) ./performance-analysis.sh benchmark ;;
            *) ./performance-analysis.sh all ;;
        esac
    else
        log_error "性能分析脚本不存在"
    fi
}

# 项目维护
project_maintenance() {
    echo ""
    log_dev "项目维护"
    
    echo "1. 代码格式化 (Prettier)"
    echo "2. 代码检查 (ESLint)"
    echo "3. 类型检查 (TypeScript)"
    echo "4. 项目图片优化"
    echo "5. 更新所有依赖"
    echo "0. 返回主菜单"
    echo ""
    echo -n "请选择维护操作: "
    read maintenance_choice
    
    case $maintenance_choice in
        1)
            log_info "正在格式化代码..."
            npm run format
            ;;
        2)
            log_info "正在检查代码..."
            npm run lint
            ;;
        3)
            log_info "正在进行类型检查..."
            npm run type-check
            ;;
        4)
            log_info "正在分析项目图片..."
            cd "$(dirname "$0")/.." && node tools/optimize-images-js.js
            ;;
        5)
            log_info "正在更新依赖..."
            npm update
            ;;
        0)
            return
            ;;
        *)
            log_warning "无效选项"
            ;;
    esac
}

# WebP转换指南
webp_conversion_guide() {
    echo ""
    log_dev "WebP转换指南"
    
    echo "1. 📊 分析项目图片"
    echo "2. 🌐 查看在线转换工具"  
    echo "3. 📖 使用指南"
    echo "4. 🔧 本地安装指南"
    echo "0. 返回主菜单"
    echo ""
    echo -n "请选择操作: "
    read webp_choice
    
    case $webp_choice in
        1)
            log_info "分析项目图片并生成转换建议..."
            cd "$(dirname "$0")/.." && node tools/webp-guide.js analyze
            ;;
        2)
            log_info "显示在线转换工具..."
            cd "$(dirname "$0")/.." && node tools/webp-guide.js tools
            ;;
        3)
            log_info "显示使用指南..."
            cd "$(dirname "$0")/.." && node tools/webp-guide.js guide
            ;;
        4)
            log_info "显示本地安装指南..."
            cd "$(dirname "$0")/.." && node tools/webp-guide.js install
            ;;
        0)
            return
            ;;
        *)
            log_warning "无效选项"
            ;;
    esac
}

# 主循环
main() {
    while true; do
        show_menu
        read choice
        
        case $choice in
            1) create_ppt ;;
            2) dev_home ;;
            3) dev_ppt ;;
            4) list_ppts ;;
            5) build_project ;;
            6) preview_build ;;
            7) clean_project ;;
            8) performance_analysis ;;
            9) project_maintenance ;;
            w|W) webp_conversion_guide ;;
            0) 
                echo ""
                log_success "感谢使用PPT项目开发工具！"
                exit 0
                ;;
            *)
                log_warning "无效选项，请重新选择"
                ;;
        esac
        
        echo ""
        echo -n "按回车键继续..."
        read
    done
}

# 检查是否直接调用了特定功能
if [ $# -gt 0 ]; then
    case $1 in
        "create") create_ppt ;;
        "dev") dev_ppt $2 ;;
        "list") list_ppts ;;
        "home") dev_home ;;
        "build") build_project ;;
        "preview") preview_build ;;
        "clean") clean_project ;;
        "analysis") performance_analysis ;;
        "maintenance") project_maintenance ;;
        *)
            echo "用法: $0 [create|dev|list|home|build|preview|clean|analysis|maintenance] [ppt-name]"
            echo "或直接运行 $0 进入交互模式"
            exit 1
            ;;
    esac
else
    main
fi