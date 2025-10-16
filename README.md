# 🎨 我的PPT展示站

一个基于 [Slidev](https://sli.dev/) 的PPT展示网站，支持多个演示文稿的管理和展示。

> � **全面优化版本** - 包含构建优化、图片分析、开发工具等完整功能！

## ⚡ 快速开始

```bash
# 🎯 一键启动开发工具菜单 (推荐)
./scripts/dev-tools.sh

# 🏗️ 统一构建 (最佳性能 + 跨平台)
npm run build

# 🏗️ 增强构建 (并行处理版本)
npm run build:enhanced

# 📊 图片优化分析
npm run optimize:images

# 🧹 项目清理和优化
./scripts/template-cleanup.sh
```

## 📁 项目结构

```
├── 📁 docs/                   # 📚 项目文档
│   ├── DEPLOYMENT.md          # 部署指南
│   ├── PROJECT-STRUCTURE.md   # 项目结构说明
│   └── OPTIMIZATION-*.md      # 优化相关文档
├── 📁 scripts/                # 🔧 构建和开发脚本
│   ├── build-unified.js       # 统一构建脚本 (推荐)
│   ├── build.js              # 传统构建脚本
│   ├── template-cleanup.sh    # 模板清理工具
│   └── organize-files.sh      # 文件整理工具
├── 📁 src/                    # 💻 源代码
│   ├── styles/               # 样式文件
│   └── sw.js                 # Service Worker
├── 📁 ppt/                    # 📄 PPT项目目录
├── 📁 tools/                  # 🛠️ 开发工具和分析脚本
└── 📁 shared/                 # 🤝 共享组件
├── 📄 index.html              # 首页文件
└── 📄 build.js                # Node.js构建脚本
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

### 浏览量统计（Vercel KV）

项目内置了一个 `api/views` 边缘函数并使用 [Vercel KV](https://vercel.com/docs/storage/vercel-kv) 存储浏览量。部署前需要：

1. 在 Vercel Dashboard 中为该项目启用 **Vercel KV**。
2. 在项目环境变量里填写：
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

   （本地调试可参考 `.env.example`）

3. 部署后访问 `/api/views?ppt=<ppt-id>` 可以查看当前计数；首页会自动请求并更新每个 PPT 的浏览量。

### Vercel配置

项目已包含 `vercel.json` 配置文件，支持：

- 自动构建
- 正确的路由配置
- 静态文件服务

## 📚 了解更多

- [Slidev 文档](https://sli.dev/)
- [Vue.js 文档](https://vuejs.org/)
- [Vercel 部署指南](https://vercel.com/docs)

## 📁 项目文件结构

```
├── 📁 docs/                   # 项目文档
│   ├── DEPLOYMENT.md          # 部署指南
│   ├── PROJECT-STRUCTURE.md   # 项目结构说明
│   └── OPTIMIZATION-*.md      # 优化相关文档
├── 📁 scripts/                # 构建和开发脚本
│   ├── build-unified.js       # 统一构建脚本 (推荐)
│   ├── build.js              # 传统构建脚本
│   ├── template-cleanup.sh    # 模板清理工具
│   └── 其他脚本...
├── 📁 src/                    # 源代码
│   ├── styles/               # 样式文件
│   └── sw.js                 # Service Worker
├── 📁 ppt/                    # PPT项目目录
└── 📁 tools/                  # 开发工具
```

### 🚀 主要命令

```bash
# 构建 (使用统一构建脚本)
npm run build

# 开发模式
npm run dev

# 项目清理
npm run cleanup

# 本地预览
npm run preview
```
