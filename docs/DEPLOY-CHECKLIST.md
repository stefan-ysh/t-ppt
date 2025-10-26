# 📋 T-PPT 部署检查清单

## 🚀 部署前必做事项

### ✅ SEO文件生成
每次部署前必须执行：

```bash
# 方式1: 使用npm脚本（推荐）
npm run seo:generate

# 方式2: 单独生成
npm run seo:sitemap    # 生成sitemap.xml
npm run seo:robots     # 生成robots.txt

# 方式3: 完整SEO优化
npm run seo:optimize   # 包含图片优化等
```

### 🛠️ 完整部署准备

```bash
# 全自动部署准备（推荐）
npm run deploy:prepare

# 这个命令会：
# 1. 清理旧文件
# 2. 生成sitemap.xml 
# 3. 生成robots.txt
# 4. 运行SEO优化检查
# 5. 验证必要文件
# 6. 执行构建
# 7. 生成部署报告
```

### 📁 关键文件检查

部署前确保以下文件存在：

- [ ] `dist/sitemap.xml` - 网站地图
- [ ] `dist/robots.txt` - 搜索引擎指令
- [ ] `manifest.json` - PWA配置
- [ ] `sw.js` - Service Worker
- [ ] `index.html` - 主页面

### 🔄 自动化流程

我们已经配置了Git钩子，在以下时机自动执行：

#### Pre-commit 钩子 (提交时)
- ESLint代码检查
- Prettier格式化
- TypeScript类型检查
- 大文件检测

#### Pre-push 钩子 (推送时)
- **自动生成SEO文件** ✨
- 构建测试
- 依赖安全检查

### 🎯 部署平台特定说明

#### Vercel 部署
```bash
# 1. 生成SEO文件
npm run deploy:prepare

# 2. 推送到GitHub (触发自动部署)
git push origin main
```

#### Netlify 部署
```bash
# 1. 生成SEO文件  
npm run deploy:prepare

# 2. 构建命令设置为：
npm run build

# 3. 发布目录设置为：
dist
```

#### 手动部署
```bash
# 1. 完整准备
npm run deploy:prepare

# 2. 上传dist文件夹到服务器
scp -r dist/* user@server:/path/to/website/
```

### 🔍 验证部署结果

部署完成后检查：

1. **SEO文件可访问**
   - https://yoursite.com/sitemap.xml
   - https://yoursite.com/robots.txt

2. **PWA功能正常**
   - Service Worker加载
   - 离线访问测试
   - 安装提示显示

3. **性能指标**
   - Core Web Vitals
   - 页面加载速度
   - 移动端体验

### 🚨 常见问题

#### Q: 忘记生成SEO文件怎么办？
A: Git pre-push钩子会自动生成，无需担心！

#### Q: SEO文件生成失败？
A: 检查以下：
- Node.js版本是否兼容
- ppt目录下是否有slides.md文件
- 网络连接是否正常

#### Q: 如何更新sitemap配置？
A: 修改 `config/seo.yml` 文件，然后重新生成

### 📊 部署统计

每次部署后会生成 `dist/deploy-info.json`，包含：
- 部署时间
- 版本信息
- Git提交信息
- 文件统计
- 网站地图URL数量

### 🎉 最佳实践

1. **定期更新**: 内容变更后及时重新生成SEO文件
2. **验证测试**: 每次部署前在本地验证
3. **监控性能**: 使用性能监控工具跟踪指标
4. **备份重要**: 保留重要配置文件的备份