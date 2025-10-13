# 🎨 我的PPT展示站

一个基于 [Slidev](https://sli.dev/) 的PPT展示网站，支持多个演示文稿的管理和展示。

## 📁 项目结构

```
├── index.html              # 首页 - PPT列表
├── ppt/                   # PPT存储目录
│   └── luminescent-materials/  # 长余辉自发光材料PPT
│       ├── slides.md      # PPT内容
│       ├── components/    # 组件
│       └── package.json   # PPT特定配置
├── dist/                  # 构建输出目录
└── build.sh              # 构建脚本
```

## 🎯 特性

- ✅ 响应式设计，支持移动端
- ✅ 多PPT管理
- ✅ 优雅的首页展示
- ✅ 基于Slidev的现代PPT体验
- ✅ 一键部署到Vercel
- ✅ 支持自定义主题和组件

## 🚀 快速开始

### 安装依赖

```bash
npm run install:all
```

### 创建新PPT

```bash
# 创建新PPT（一行命令搞定！）
./create-ppt.sh my-awesome-ppt "我的精彩演示"

# 查看帮助
./create-ppt.sh --help
```

### 开发模式

```bash
# 查看所有可用命令
npm run dev

# 开发首页
npm run dev:home

# 开发特定PPT
cd ppt/[ppt-name]
npm run dev

# 查看所有PPT
npm run list-ppts
```

### 构建部署

```bash
# 一键构建所有PPT
npm run build

# 本地预览
npm run preview

# 清理所有构建文件
npm run clean
```

## 📝 添加新的PPT

**超级简单！一行命令搞定：**

```bash
./create-ppt.sh [ppt-name] [title]
```

**示例：**
```bash
# 创建AI主题PPT
./create-ppt.sh ai-presentation "人工智能技术分享"

# 创建产品介绍PPT  
./create-ppt.sh product-intro "产品功能介绍"
```

**自动完成：**
- ✅ 创建PPT目录和文件结构
- ✅ 生成配置文件和模板
- ✅ 复制共享组件和样式
- ✅ 更新首页PPT列表
- ✅ 提供开发和构建指南

**然后：**
1. 编辑 `ppt/[ppt-name]/slides.md` 
2. `cd ppt/[ppt-name] && npm run dev` 开始开发
3. `npm run build` 构建所有PPT

## 🌐 部署到Vercel

1. 推送代码到GitHub
2. 在Vercel中导入项目
3. Vercel会自动执行 `npm run build`
4. 访问你的PPT展示站

### Vercel配置

项目已包含 `vercel.json` 配置文件，支持：
- 自动构建
- 正确的路由配置
- 静态文件服务


## 📚 了解更多

- [Slidev 文档](https://sli.dev/)
- [Vue.js 文档](https://vuejs.org/)
- [Vercel 部署指南](https://vercel.com/docs)