# 🎨 PPT展示站 - 开发指南

这是一个基于 [Slidev](https://sli.dev/) 的现代化PPT展示网站，支持多个演示文稿的管理和展示。

## ✨ 特性

- 🎯 **响应式设计** - 支持所有设备尺寸
- 🚀 **高性能** - 优化的构建和加载策略
- 🎨 **现代化UI** - 优雅的界面和交互动画
- 📱 **移动端优化** - 触摸友好的操作体验
- 🔧 **开发工具** - 完整的开发和构建工具链
- 📊 **性能监控** - 内置性能分析工具
- 🌙 **暗色模式** - 自适应主题切换

## 🚀 快速开始

### 1. 环境要求
- Node.js 16+
- npm 7+
- Python 3+ (用于开发服务器)

### 2. 安装项目
```bash
# 克隆项目
git clone <repository-url>
cd t-ppt

# 安装所有依赖
npm run setup
```

### 3. 开发模式
```bash
# 启动开发工具 (推荐)
npm run dev-tools

# 或使用单独命令
npm run dev:home      # 启动首页开发
npm run create-ppt    # 创建新PPT
npm run list-ppts     # 查看所有PPT
```

### 4. 构建部署
```bash
# 增强构建 (推荐)
npm run build:enhanced

# 标准构建
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
├── 📄 index.html              # 首页
├── 📁 ppt/                   # PPT存储目录
│   ├── 📊 luminescent-materials/
│   ├── 📊 test-presentation/
│   └── 📊 new-presentation/
├── 📁 shared/                # 共享组件和工具
│   ├── 📦 components/
│   └── 🛠️ utils/
├── 📁 src/styles/            # 全局样式
├── 📁 dist/                  # 构建输出
├── 🔧 build-enhanced.sh      # 增强构建脚本
├── 🛠️ dev-tools.sh          # 开发工具
├── 📊 performance-analysis.sh # 性能分析
└── 🖼️ optimize-images.sh     # 图片优化
```

## 🛠️ 开发工具

### 交互式开发工具
```bash
npm run dev-tools
```
提供完整的交互式菜单，包括：
- 创建新PPT
- 启动开发服务器
- 项目构建和预览
- 性能分析
- 项目维护

### 性能分析
```bash
npm run performance        # 完整性能分析
npm run performance build  # 构建大小分析
npm run performance images # 图片使用分析
```

### 图片优化
```bash
npm run optimize:images    # 优化所有图片
./optimize-images.sh webp  # 生成WebP格式
./optimize-images.sh clean # 检查未使用图片
```

### 代码质量
```bash
npm run check     # 运行所有检查
npm run lint      # ESLint检查
npm run lint:fix  # 自动修复
npm run format    # Prettier格式化
```

## 📊 创建新PPT

### 方法1: 使用开发工具
```bash
npm run dev-tools
# 选择选项1: 创建新PPT
```

### 方法2: 直接命令
```bash
./create-ppt.sh my-awesome-ppt "我的精彩演示"
```

### 方法3: npm脚本
```bash
npm run create-ppt
```

## 🎨 自定义主题和组件

### 使用共享组件
```vue
<template>
  <SharedTextHighlight variant="primary" animation="highlight">
    高亮文本
  </SharedTextHighlight>
</template>

<script setup>
import { SharedTextHighlight } from '@/shared/components'
</script>
```

### 响应式样式
项目内置了完整的响应式样式系统：

```css
/* 使用CSS变量 */
.my-component {
  font-size: var(--text-base);
  padding: var(--space-md);
  color: var(--text-primary);
}

/* 使用工具类 */
<div class="container grid-responsive p-responsive">
  <div class="card text-responsive">内容</div>
</div>
```

## 🚀 构建和部署

### 本地构建
```bash
# 增强构建 (支持并行+优化)
npm run build:enhanced

# 标准构建
npm run build

# Shell构建 (兼容模式)
npm run build:shell
```

### Vercel部署
项目已配置Vercel部署，推送到main分支即可自动部署。

### 自定义部署
```bash
# 构建项目
npm run build:enhanced

# 部署dist目录到你的服务器
```

## 📈 性能优化

### 已实现的优化
- ✅ 并行构建系统
- ✅ 图片压缩和WebP支持
- ✅ 代码分割和懒加载
- ✅ 响应式设计优化
- ✅ 构建缓存机制
- ✅ 性能监控工具

### 推荐的优化流程
1. 运行性能分析: `npm run performance`
2. 优化图片: `npm run optimize:images`
3. 增强构建: `npm run build:enhanced`
4. 检查构建报告: `dist/build-report.json`

## 🔧 故障排除

### 常见问题

**构建失败**
```bash
# 清理项目
npm run clean

# 重新安装依赖
npm run setup

# 重新构建
npm run build:enhanced
```

**PPT无法访问**
```bash
# 检查PPT结构
npm run list-ppts

# 验证slides.md文件存在
ls ppt/[ppt-name]/slides.md
```

**图片显示问题**
```bash
# 检查图片路径
npm run performance images

# 优化图片
npm run optimize:images
```

### 开发环境问题

**端口冲突**
默认使用8080端口，如果冲突可以修改：
```bash
# 使用不同端口
python3 -m http.server 3000
```

**依赖安装失败**
```bash
# 清理npm缓存
npm cache clean --force

# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

## 📚 进阶指南

### 自定义构建配置
编辑 `build-enhanced.sh` 来修改构建行为：
```bash
# 启用/禁用并行构建
BUILD_PARALLEL=true

# 调整并行线程数
BUILD_THREADS=4

# 启用/禁用缓存
BUILD_CACHE=true
```

### 添加新的共享组件
1. 在 `shared/components/` 目录创建组件
2. 更新 `shared/utils/` 中的工具函数
3. 在PPT中导入使用

### 性能监控集成
项目支持多种性能监控方案：
- 构建时间分析
- 文件大小统计
- 重复文件检查
- 图片优化建议

## 🤝 贡献指南

1. Fork项目
2. 创建特性分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -m 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 提交Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 获取帮助

- 📖 查看 [Slidev文档](https://sli.dev/)
- 🐛 [提交Issue](https://github.com/your-repo/issues)
- 💬 [讨论区](https://github.com/your-repo/discussions)

---

**Happy Coding! 🎉**