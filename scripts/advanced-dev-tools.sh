#!/bin/bash

####################################################################################
# T-PPT 高级开发工具菜单
# 集成了所有企业级功能的管理界面
####################################################################################

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'  
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 显示标题
show_header() {
    clear
    echo -e "${BOLD}${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════════╗"
    echo "║                    🚀 T-PPT 高级开发工具                          ║"
    echo "║                   Enterprise Development Suite                    ║"
    echo "╚══════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo -e "${GREEN}📍 项目目录: ${PROJECT_ROOT}${NC}"
    echo -e "${GREEN}⏰ $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo ""
}

# 显示主菜单
show_main_menu() {
    echo -e "${BOLD}${YELLOW}🛠️  开发工具主菜单${NC}"
    echo "════════════════════════════════════════════════════════════════"
    echo -e "  ${GREEN}1.${NC}  📊 性能监控仪表板"
    echo -e "  ${GREEN}2.${NC}  🎨 PPT模板管理系统"
    echo -e "  ${GREEN}3.${NC}  🔧 SEO优化工具"
    echo -e "  ${GREEN}4.${NC}  🧪 测试框架管理"
    echo -e "  ${GREEN}5.${NC}  🔒 代码质量检查"
    echo -e "  ${GREEN}6.${NC}  📦 构建和部署工具"
    echo -e "  ${GREEN}7.${NC}  🌐 PWA功能管理"
    echo -e "  ${GREEN}8.${NC}  📈 项目统计分析"
    echo -e "  ${GREEN}9.${NC}  ⚙️  系统设置和配置"
    echo -e "  ${RED}0.${NC}  退出"
    echo "════════════════════════════════════════════════════════════════"
    echo -n -e "${BOLD}请选择操作 (0-9): ${NC}"
}

# 性能监控菜单
performance_menu() {
    show_header
    echo -e "${BOLD}${CYAN}📊 性能监控仪表板${NC}"
    echo "═══════════════════════════════════════════════════════════════"
    echo -e "  ${GREEN}1.${NC}  启动实时性能监控"
    echo -e "  ${GREEN}2.${NC}  查看性能报告"
    echo -e "  ${GREEN}3.${NC}  运行Lighthouse审计"
    echo -e "  ${GREEN}4.${NC}  Core Web Vitals检测"
    echo -e "  ${GREEN}5.${NC}  内存使用分析"
    echo -e "  ${GREEN}6.${NC}  网络性能测试"
    echo -e "  ${RED}0.${NC}  返回主菜单"
    echo "═══════════════════════════════════════════════════════════════"
    echo -n -e "${BOLD}请选择操作: ${NC}"
    
    read -r choice
    case $choice in
        1) start_performance_monitoring ;;
        2) view_performance_report ;;
        3) run_lighthouse_audit ;;
        4) check_core_web_vitals ;;
        5) analyze_memory_usage ;;
        6) test_network_performance ;;
        0) return ;;
        *) echo -e "${RED}无效选择！${NC}"; sleep 1; performance_menu ;;
    esac
}

# 模板管理菜单
template_menu() {
    show_header
    echo -e "${BOLD}${PURPLE}🎨 PPT模板管理系统${NC}"
    echo "═══════════════════════════════════════════════════════════════"
    echo -e "  ${GREEN}1.${NC}  列出所有可用模板"
    echo -e "  ${GREEN}2.${NC}  创建新PPT项目"
    echo -e "  ${GREEN}3.${NC}  管理主题和样式"
    echo -e "  ${GREEN}4.${NC}  导入自定义模板"
    echo -e "  ${GREEN}5.${NC}  模板配置编辑器"
    echo -e "  ${GREEN}6.${NC}  模板使用统计"
    echo -e "  ${RED}0.${NC}  返回主菜单"
    echo "═══════════════════════════════════════════════════════════════"
    echo -n -e "${BOLD}请选择操作: ${NC}"
    
    read -r choice
    case $choice in
        1) list_templates ;;
        2) create_new_project ;;
        3) manage_themes ;;
        4) import_template ;;
        5) edit_template_config ;;
        6) template_statistics ;;
        0) return ;;
        *) echo -e "${RED}无效选择！${NC}"; sleep 1; template_menu ;;
    esac
}

# SEO工具菜单
seo_menu() {
    show_header
    echo -e "${BOLD}${GREEN}🔧 SEO优化工具${NC}"
    echo "═══════════════════════════════════════════════════════════════"
    echo -e "  ${GREEN}1.${NC}  生成网站地图"
    echo -e "  ${GREEN}2.${NC}  创建robots.txt"
    echo -e "  ${GREEN}3.${NC}  优化图片SEO"
    echo -e "  ${GREEN}4.${NC}  元数据管理"
    echo -e "  ${GREEN}5.${NC}  结构化数据生成"
    echo -e "  ${GREEN}6.${NC}  SEO审计报告"
    echo -e "  ${GREEN}7.${NC}  完整SEO优化"
    echo -e "  ${RED}0.${NC}  返回主菜单"
    echo "═══════════════════════════════════════════════════════════════"
    echo -n -e "${BOLD}请选择操作: ${NC}"
    
    read -r choice
    case $choice in
        1) generate_sitemap ;;
        2) create_robots_txt ;;
        3) optimize_images_seo ;;
        4) manage_metadata ;;
        5) generate_structured_data ;;
        6) seo_audit ;;
        7) full_seo_optimization ;;
        0) return ;;
        *) echo -e "${RED}无效选择！${NC}"; sleep 1; seo_menu ;;
    esac
}

# 测试框架菜单
test_menu() {
    show_header
    echo -e "${BOLD}${YELLOW}🧪 测试框架管理${NC}"
    echo "═══════════════════════════════════════════════════════════════"
    echo -e "  ${GREEN}1.${NC}  运行单元测试"
    echo -e "  ${GREEN}2.${NC}  运行E2E测试"
    echo -e "  ${GREEN}3.${NC}  生成测试报告"
    echo -e "  ${GREEN}4.${NC}  代码覆盖率分析"
    echo -e "  ${GREEN}5.${NC}  测试环境配置"
    echo -e "  ${GREEN}6.${NC}  性能基准测试"
    echo -e "  ${RED}0.${NC}  返回主菜单"
    echo "═══════════════════════════════════════════════════════════════"
    echo -n -e "${BOLD}请选择操作: ${NC}"
    
    read -r choice
    case $choice in
        1) run_unit_tests ;;
        2) run_e2e_tests ;;
        3) generate_test_report ;;
        4) analyze_coverage ;;
        5) configure_test_env ;;
        6) run_benchmark_tests ;;
        0) return ;;
        *) echo -e "${RED}无效选择！${NC}"; sleep 1; test_menu ;;
    esac
}

# 实现各种功能函数

start_performance_monitoring() {
    echo -e "${BLUE}🚀 启动性能监控...${NC}"
    cd "$PROJECT_ROOT" || exit
    
    echo "启动开发服务器并开启性能监控..."
    if command -v npm &> /dev/null; then
        npm run dev:home &
        sleep 3
        echo -e "${GREEN}✅ 性能监控已启动！${NC}"
        echo "访问 http://localhost:8080 查看实时性能数据"
        echo "按任意键继续..."
        read -r
    else
        echo -e "${RED}❌ npm未安装！${NC}"
    fi
}

view_performance_report() {
    echo -e "${BLUE}📊 生成性能报告...${NC}"
    cd "$PROJECT_ROOT" || exit
    
    if [ -f "tests/coverage/html-report/report.html" ]; then
        echo -e "${GREEN}✅ 打开性能报告...${NC}"
        open "tests/coverage/html-report/report.html" 2>/dev/null || \
        xdg-open "tests/coverage/html-report/report.html" 2>/dev/null || \
        echo "请手动打开: tests/coverage/html-report/report.html"
    else
        echo -e "${YELLOW}⚠️  报告文件不存在，正在生成...${NC}"
        npm run test:coverage
    fi
    echo "按任意键继续..."
    read -r
}

list_templates() {
    echo -e "${BLUE}📋 列出可用模板...${NC}"
    cd "$PROJECT_ROOT" || exit
    node tools/template-manager.js list
    echo ""
    echo "按任意键继续..."
    read -r
}

create_new_project() {
    echo -e "${BLUE}🎨 创建新PPT项目...${NC}"
    cd "$PROJECT_ROOT" || exit
    
    echo -n "请输入模板ID (academic/business/creative/education/minimal): "
    read -r template_id
    echo -n "请输入项目名称: "
    read -r project_name
    
    if [ -n "$template_id" ] && [ -n "$project_name" ]; then
        node tools/template-manager.js use "$template_id" "$project_name"
        echo -e "${GREEN}✅ 项目创建完成！${NC}"
    else
        echo -e "${RED}❌ 请提供完整信息！${NC}"
    fi
    echo "按任意键继续..."
    read -r
}

generate_sitemap() {
    echo -e "${BLUE}🗺️  生成网站地图...${NC}"
    cd "$PROJECT_ROOT" || exit
    node -e "
    import('./tools/seo-optimizer.js').then(module => {
        const SEOOptimizer = module.default;
        const optimizer = new SEOOptimizer();
        optimizer.generateSitemap().then(() => {
            console.log('✅ 网站地图生成完成！');
        }).catch(console.error);
    });
    "
    echo "按任意键继续..."
    read -r
}

run_unit_tests() {
    echo -e "${BLUE}🧪 运行单元测试...${NC}"
    cd "$PROJECT_ROOT" || exit
    npm run test
    echo "按任意键继续..."
    read -r
}

run_e2e_tests() {
    echo -e "${BLUE}🎭 运行E2E测试...${NC}"
    cd "$PROJECT_ROOT" || exit
    
    echo "安装Playwright浏览器..."
    npm run test:install
    echo "运行E2E测试..."
    npm run test:e2e:headed
    echo "按任意键继续..."
    read -r
}

full_seo_optimization() {
    echo -e "${BLUE}🔧 执行完整SEO优化...${NC}"
    cd "$PROJECT_ROOT" || exit
    node -e "
    import('./tools/seo-optimizer.js').then(module => {
        const SEOOptimizer = module.default;
        const optimizer = new SEOOptimizer();
        optimizer.optimizeAll().then(results => {
            console.log('✅ SEO优化完成！');
            console.log(JSON.stringify(results, null, 2));
        }).catch(console.error);
    });
    "
    echo "按任意键继续..."
    read -r
}

# 系统信息显示
show_system_info() {
    echo -e "${BOLD}${CYAN}💻 系统信息${NC}"
    echo "═══════════════════════════════════════════════════════════════"
    echo -e "操作系统: ${GREEN}$(uname -s)${NC}"
    echo -e "架构: ${GREEN}$(uname -m)${NC}"
    
    if command -v node &> /dev/null; then
        echo -e "Node.js: ${GREEN}$(node --version)${NC}"
    else
        echo -e "Node.js: ${RED}未安装${NC}"
    fi
    
    if command -v npm &> /dev/null; then
        echo -e "npm: ${GREEN}$(npm --version)${NC}"
    else
        echo -e "npm: ${RED}未安装${NC}"
    fi
    
    echo -e "项目状态: ${GREEN}就绪${NC}"
    echo "═══════════════════════════════════════════════════════════════"
}

# 快速状态检查
quick_status_check() {
    echo -e "${BOLD}${YELLOW}⚡ 快速状态检查${NC}"
    echo "═══════════════════════════════════════════════════════════════"
    
    # 检查Git状态
    if git status --porcelain 2>/dev/null | grep -q '^'; then
        echo -e "Git状态: ${YELLOW}有未提交更改${NC}"
    else
        echo -e "Git状态: ${GREEN}干净${NC}"
    fi
    
    # 检查依赖
    if [ -f "package.json" ] && [ -d "node_modules" ]; then
        echo -e "依赖状态: ${GREEN}已安装${NC}"
    else
        echo -e "依赖状态: ${RED}需要安装${NC}"
    fi
    
    # 检查构建文件
    if [ -d "dist" ]; then
        echo -e "构建状态: ${GREEN}已构建${NC}"
    else
        echo -e "构建状态: ${YELLOW}需要构建${NC}"
    fi
    
    # 检查测试覆盖率
    if [ -d "tests/coverage" ]; then
        echo -e "测试覆盖率: ${GREEN}可用${NC}"
    else
        echo -e "测试覆盖率: ${YELLOW}需要运行${NC}"
    fi
    
    echo "═══════════════════════════════════════════════════════════════"
}

# 主程序循环
main() {
    while true; do
        show_header
        show_system_info
        echo ""
        quick_status_check
        echo ""
        show_main_menu
        
        read -r choice
        case $choice in
            1) performance_menu ;;
            2) template_menu ;;
            3) seo_menu ;;
            4) test_menu ;;
            5) 
                echo -e "${BLUE}🔍 运行代码质量检查...${NC}"
                cd "$PROJECT_ROOT" || exit
                npm run lint && npm run type-check
                echo "按任意键继续..."
                read -r
                ;;
            6)
                echo -e "${BLUE}📦 运行构建...${NC}"
                cd "$PROJECT_ROOT" || exit
                npm run build
                echo "按任意键继续..."
                read -r
                ;;
            7)
                echo -e "${BLUE}🌐 PWA功能状态检查...${NC}"
                cd "$PROJECT_ROOT" || exit
                if [ -f "sw.js" ]; then
                    echo -e "${GREEN}✅ Service Worker已配置${NC}"
                else
                    echo -e "${RED}❌ Service Worker未找到${NC}"
                fi
                if [ -f "manifest.json" ]; then
                    echo -e "${GREEN}✅ PWA Manifest已配置${NC}"
                else
                    echo -e "${RED}❌ PWA Manifest未找到${NC}"
                fi
                echo "按任意键继续..."
                read -r
                ;;
            8)
                echo -e "${BLUE}📈 项目统计...${NC}"
                cd "$PROJECT_ROOT" || exit
                echo "代码行数统计:"
                find . -name "*.js" -o -name "*.ts" -o -name "*.vue" -o -name "*.md" | grep -v node_modules | xargs wc -l | tail -1
                echo "PPT项目数量: $(ls -1d ppt/*/ 2>/dev/null | wc -l)"
                echo "测试文件数量: $(find tests -name "*.test.js" -o -name "*.spec.js" 2>/dev/null | wc -l)"
                echo "按任意键继续..."
                read -r
                ;;
            9)
                echo -e "${BLUE}⚙️  打开配置目录...${NC}"
                cd "$PROJECT_ROOT" || exit
                ls -la config/ 2>/dev/null || echo "配置目录不存在"
                echo "按任意键继续..."
                read -r
                ;;
            0)
                echo -e "${GREEN}👋 谢谢使用 T-PPT 开发工具！${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}无效选择！请输入 0-9${NC}"
                sleep 1
                ;;
        esac
    done
}

# 启动主程序
main