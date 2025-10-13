# 部署指南

## 🚀 自动部署流程

### 方式1：完整部署准备（推荐）
```bash
npm run deploy:prepare
```
- 自动清理旧文件
- 生成 sitemap.xml 和 robots.txt
- 运行 SEO 优化检查
- 构建所有PPT
- 验证部署文件
- 生成部署报告

### 方式2：仅生成SEO文件
```bash
npm run seo:generate
```
快速生成 sitemap.xml 和 robots.txt

### 方式3：Git自动化（无需手动操作）
```bash
git push
```
Git pre-push 钩子会自动生成 SEO 文件

## 📋 部署检查清单

### 部署前必检项
- [ ] 运行 `npm run deploy:prepare` 
- [ ] 检查 sitemap.xml 是否最新
- [ ] 确认 robots.txt 配置正确
- [ ] 验证所有PPT正常构建
- [ ] 查看SEO优化建议（如有）

### 部署后验证
- [ ] 访问主页确认正常
- [ ] 检查各个PPT链接
- [ ] 验证sitemap.xml可访问
- [ ] 确认robots.txt正确

## 🔧 高级配置

### 自定义部署脚本
编辑 `scripts/pre-deploy.sh` 以添加自定义检查或优化

### SEO优化设置
修改 `tools/seo-optimizer.js` 来调整SEO生成规则

### Git钩子管理
编辑 `.git/hooks/pre-push` 来自定义Git工作流

## 📊 部署统计

每次运行 `npm run deploy:prepare` 后，查看：
- 构建文件数量
- SEO文件状态
- 图片优化建议
- 部署就绪状态

## 🐛 常见问题

### Q: 为什么需要每次生成sitemap？
A: PPT内容可能更新，sitemap需要反映最新的页面结构

### Q: 能否跳过某些检查？
A: 使用 `npm run seo:generate` 进行快速SEO文件生成

### Q: Git push失败怎么办？
A: 检查是否有语法错误，确保SEO工具正常运行

---

💡 **提示**: 使用 `npm run deploy:prepare` 一键搞定所有部署准备工作！