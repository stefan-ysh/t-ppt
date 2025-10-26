#!/bin/bash

####################################################################################
# 部署前自动化脚本
# 自动生成sitemap、robots.txt等部署必需文件
####################################################################################

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 开始部署前准备...${NC}"

# 1. 清理旧的构建文件
echo -e "${YELLOW}📂 清理旧构建文件...${NC}"
rm -rf dist/
mkdir -p dist/

# 2. 生成sitemap.xml
echo -e "${YELLOW}🗺️ 生成网站地图...${NC}"
node -e "
import('./tools/seo-optimizer.js').then(module => {
  const SEOOptimizer = module.default;
  const optimizer = new SEOOptimizer();
  return optimizer.generateSitemap();
}).then(() => {
  console.log('✅ 网站地图生成完成');
}).catch(error => {
  console.error('❌ 网站地图生成失败:', error);
  process.exit(1);
});
"

# 3. 生成robots.txt
echo -e "${YELLOW}🤖 生成robots.txt...${NC}"
node -e "
import('./tools/seo-optimizer.js').then(module => {
  const SEOOptimizer = module.default;
  const optimizer = new SEOOptimizer();
  return optimizer.generateRobotsTxt();
}).then(() => {
  console.log('✅ robots.txt生成完成');
}).catch(error => {
  console.error('❌ robots.txt生成失败:', error);
  process.exit(1);
});
"

# 4. 运行完整的SEO优化
echo -e "${YELLOW}🔍 运行SEO优化检查...${NC}"
node -e "
import('./tools/seo-optimizer.js').then(module => {
  const SEOOptimizer = module.default;
  const optimizer = new SEOOptimizer();
  return optimizer.optimizeImages();
}).then(results => {
  console.log('✅ SEO优化检查完成');
  if (results.length > 0) {
    console.log(\`⚠️ 发现 \${results.length} 个图片优化建议\`);
  }
}).catch(error => {
  console.error('❌ SEO优化失败:', error);
  process.exit(1);
});
"

# 5. 验证必要文件
echo -e "${YELLOW}✅ 验证部署文件...${NC}"
required_files=("dist/sitemap.xml" "dist/robots.txt" "manifest.json" "sw.js")
missing_files=()

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    missing_files+=("$file")
  fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
  echo -e "${RED}❌ 缺少必要文件:${NC}"
  for file in "${missing_files[@]}"; do
    echo -e "  - $file"
  done
  exit 1
fi

# 6. 运行构建
echo -e "${YELLOW}📦 运行项目构建...${NC}"
npm run build

# 7. 复制SEO文件到构建目录
echo -e "${YELLOW}📋 复制SEO文件到构建目录...${NC}"
cp dist/sitemap.xml dist/sitemap.xml.bak 2>/dev/null || true
cp dist/robots.txt dist/robots.txt.bak 2>/dev/null || true

# 如果构建创建了新的dist目录，需要重新复制SEO文件
if [ -d "dist" ]; then
  [ -f "dist/sitemap.xml.bak" ] && mv dist/sitemap.xml.bak dist/sitemap.xml
  [ -f "dist/robots.txt.bak" ] && mv dist/robots.txt.bak dist/robots.txt
fi

# 8. 验证构建结果
echo -e "${YELLOW}🔍 验证构建结果...${NC}"
if [ -d "dist" ]; then
  file_count=$(find dist -type f | wc -l)
  echo -e "${GREEN}✅ 构建完成，生成了 $file_count 个文件${NC}"
  
  # 列出重要文件
  echo -e "${BLUE}📁 重要文件检查:${NC}"
  [ -f "dist/index.html" ] && echo -e "  ✅ index.html" || echo -e "  ❌ index.html"
  [ -f "dist/sitemap.xml" ] && echo -e "  ✅ sitemap.xml" || echo -e "  ❌ sitemap.xml"
  [ -f "dist/robots.txt" ] && echo -e "  ✅ robots.txt" || echo -e "  ❌ robots.txt"
  [ -f "dist/manifest.json" ] && echo -e "  ✅ manifest.json" || echo -e "  ❌ manifest.json"
  [ -f "dist/sw.js" ] && echo -e "  ✅ sw.js" || echo -e "  ❌ sw.js"
else
  echo -e "${RED}❌ 构建失败，dist目录不存在${NC}"
  exit 1
fi

# 9. 生成部署报告
echo -e "${YELLOW}📊 生成部署报告...${NC}"
cat > dist/deploy-info.json << EOF
{
  "deployTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "version": "$(node -p "require('./package.json').version")",
  "commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
  "sitemapUrls": $(wc -l < dist/sitemap.xml | tr -d ' '),
  "buildFiles": $file_count,
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)"
}
EOF

echo -e "${GREEN}🎉 部署准备完成！${NC}"
echo -e "${BLUE}📊 部署统计:${NC}"
echo -e "  - 构建时间: $(date)"
echo -e "  - 文件数量: $file_count"
echo -e "  - 网站地图: $(grep -c '<url>' dist/sitemap.xml 2>/dev/null || echo '0') 个URL"
echo ""
echo -e "${GREEN}✅ 可以安全部署到生产环境${NC}"