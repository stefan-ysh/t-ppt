#!/bin/bash

####################################################################################
# 快速SEO文件生成脚本
# 部署前快速生成sitemap.xml和robots.txt
####################################################################################

echo "🔧 正在生成SEO文件..."

# 生成sitemap.xml
echo "🗺️ 生成sitemap.xml..."
node -e "
import('./tools/seo-optimizer.js').then(module => {
  const SEOOptimizer = module.default;
  const optimizer = new SEOOptimizer();
  return optimizer.generateSitemap();
}).catch(console.error);
" && echo "✅ sitemap.xml 生成完成"

# 生成robots.txt
echo "🤖 生成robots.txt..."
node -e "
import('./tools/seo-optimizer.js').then(module => {
  const SEOOptimizer = module.default;
  const optimizer = new SEOOptimizer();
  return optimizer.generateRobotsTxt();
}).catch(console.error);
" && echo "✅ robots.txt 生成完成"

echo "🎉 SEO文件生成完毕！"