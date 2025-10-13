# 🚀 部署指南

## 部署到Vercel

### 前置要求
- GitHub账号
- Vercel账号（可以用GitHub登录）

### 步骤

1. **推送代码到GitHub**
   ```bash
   git add .
   git commit -m "feat: 创建PPT展示站"
   git push origin main
   ```

2. **在Vercel中导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击"New Project"
   - 选择你的GitHub仓库
   - 点击"Import"

3. **配置项目设置**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **部署**
   - 点击"Deploy"
   - 等待构建完成
   - 访问你的PPT展示站！

### 自动部署
每次推送到main分支，Vercel都会自动重新构建和部署你的站点。

## 添加新PPT的完整流程

### 1. 创建新PPT目录
```bash
# 复制现有PPT作为模板
cp -r ppt/luminescent-materials ppt/new-ppt-name

# 进入新目录
cd ppt/new-ppt-name
```

### 2. 修改配置
编辑 `package.json`：
```json
{
  "name": "new-ppt-name",
  "scripts": {
    "build": "slidev build --base /ppt/new-ppt-name/ --out ../../dist/ppt/new-ppt-name"
  }
}
```

### 3. 更新slides.md
编辑 `slides.md` 文件，更新PPT内容。

### 4. 更新首页配置
编辑根目录的 `index.html`，在 presentations 数组中添加新PPT：
```javascript
const presentations = [
    {
        id: 'luminescent-materials',
        title: '长余辉自发光材料',
        description: '新能源光织物的开发及其在主动光安全系统中的应用研究',
        date: '2024-10',
        status: 'published',
        slidesFile: 'slides.md'
    },
    {
        id: 'new-ppt-name',
        title: '新PPT标题',
        description: 'PPT描述',
        date: '2024-10',
        status: 'published',
        slidesFile: 'slides.md'
    }
];
```

### 5. 更新构建脚本
编辑根目录的 `package.json`：
```json
{
  "scripts": {
    "build:presentations": "npm run build:luminescent-materials && npm run build:new-ppt-name",
    "build:new-ppt-name": "cd ppt/new-ppt-name && npm install && npm run build",
    "dev:new-ppt-name": "cd ppt/new-ppt-name && npm run dev",
    "install:presentations": "cd ppt/luminescent-materials && npm install && cd ../new-ppt-name && npm install"
  }
}
```

### 6. 更新构建脚本
编辑 `build.sh`，添加新PPT的构建步骤：
```bash
# 构建 new-ppt-name PPT
echo "  - 构建新PPT..."
cd ppt/new-ppt-name
if [ ! -d "node_modules" ]; then
    echo "    安装依赖..."
    npm install
fi
npm run build
cd ../..
```

### 7. 更新Vercel路由
编辑 `vercel.json`：
```json
{
  "rewrites": [
    { "source": "/", "destination": "/index.html" },
    { "source": "/ppt/luminescent-materials/(.*)", "destination": "/ppt/luminescent-materials/$1" },
    { "source": "/ppt/new-ppt-name/(.*)", "destination": "/ppt/new-ppt-name/$1" }
  ]
}
```

### 8. 测试和部署
```bash
# 本地测试
npm run build
npm run preview

# 推送到GitHub进行自动部署
git add .
git commit -m "feat: 添加新PPT - 新PPT标题"
git push origin main
```

## 本地开发

### 开发首页
直接打开 `index.html` 或启动本地服务器：
```bash
python3 -m http.server 8080
# 访问 http://localhost:8080
```

### 开发特定PPT
```bash
npm run dev:luminescent-materials
# 或
npm run dev:new-ppt-name
```

## 故障排除

### 常见问题

1. **构建失败 - 模块未找到**
   - 确保所有依赖文件都已复制到PPT目录
   - 检查导入路径是否正确

2. **路由不工作**
   - 检查vercel.json中的路由配置
   - 确保构建输出目录结构正确

3. **样式丢失**
   - 检查base路径配置是否正确
   - 确保CSS文件已正确构建

### 调试步骤
1. 检查构建日志
2. 验证dist目录结构
3. 测试本地预览
4. 检查Vercel部署日志