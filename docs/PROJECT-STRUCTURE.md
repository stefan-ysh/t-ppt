# 📁 项目目录结构

## 🎯 整理后的目录结构

```
t-ppt/                          # 项目根目录
├── 📁 ppt/                     # PPT项目目录
│   ├── luminescent-materials/  # 发光材料PPT
│   ├── new-presentation/       # 新建PPT示例
│   └── test-presentation/      # 测试PPT
├── 📁 scripts/                 # 构建和开发脚本
│   ├── build-all.sh           # 批量构建脚本
│   ├── build-enhanced.sh      # 增强构建脚本 ⭐
│   ├── build.sh               # 基础构建脚本
│   ├── create-ppt.sh          # 创建新PPT脚本
│   ├── demo.sh                # 演示脚本
│   ├── dev-tools.sh           # 开发工具菜单 ⭐
│   └── performance-analysis.sh # 性能分析脚本 ⭐
├── 📁 tools/                   # 优化和分析工具
│   ├── optimize-images-js.js   # 图片优化分析 ⭐
│   ├── webp-guide.js          # WebP转换指南 ⭐
│   ├── optimization-checklist.sh # 优化功能清单 ⭐
│   ├── convert-to-webp.sh     # WebP转换脚本
│   ├── optimize-images.sh     # 图片优化脚本
│   └── image-optimization-report.json # 分析报告
├── 📁 docs/                    # 项目文档
│   ├── DEPLOYMENT.md          # 部署文档
│   ├── DEVELOPMENT.md         # 开发文档
│   ├── OPTIMIZATION-SUMMARY.md # 优化总结 ⭐
│   ├── TODO.md               # 待办事项
│   ├── VERCEL-FIX.md         # Vercel修复说明
│   └── image-optimization-fix.md # 图片优化修复说明
├── 📁 src/                     # 源码目录
├── 📁 shared/                  # 共享组件
├── 📁 dist/                    # 构建输出
├── 📄 README.md               # 项目说明
├── 📄 package.json            # 项目配置
├── 📄 build.js                # Node.js构建脚本
└── 📄 index.html              # 首页文件
```

## 🚀 快速导航

### 🛠️ 开发工具 (推荐)
```bash
# 启动开发工具菜单 - 最便捷的方式
./scripts/dev-tools.sh
# 或者
npm run dev-tools
```

### ⚡ 构建脚本
```bash
# 增强并行构建 (推荐)
npm run build:enhanced

# 标准构建
npm run build

# 批量构建所有PPT
npm run build:shell
```

### 📊 优化工具
```bash
# 图片分析和优化
npm run optimize:images

# WebP转换指南
npm run webp:guide
npm run webp:analyze

# 优化功能清单
./tools/optimization-checklist.sh
```

### 📈 性能分析
```bash
# 性能分析报告
npm run performance
```

### 📝 PPT管理
```bash
# 创建新PPT
npm run create-ppt

# 列出所有PPT
npm run list-ppts
```

## 📋 目录功能说明

### 📁 scripts/ - 开发脚本目录
| 脚本 | 功能 | 推荐使用 |
|------|------|----------|
| `dev-tools.sh` | 🌟 交互式开发菜单 | ⭐ 首选 |
| `build-enhanced.sh` | 🚀 并行构建系统 | ⭐ 构建推荐 |
| `performance-analysis.sh` | 📊 性能监控 | ⭐ 定期使用 |
| `create-ppt.sh` | 📝 PPT项目生成器 | 按需使用 |

### 📁 tools/ - 优化工具目录
| 工具 | 功能 | 使用频率 |
|------|------|----------|
| `optimize-images-js.js` | 🖼️ 图片智能分析 | ⭐ 经常 |
| `webp-guide.js` | 📸 WebP转换指南 | ⭐ 按需 |
| `optimization-checklist.sh` | 📋 功能清单 | ⭐ 参考 |

### 📁 docs/ - 文档目录
| 文档 | 内容 | 重要性 |
|------|------|--------|
| `OPTIMIZATION-SUMMARY.md` | 🎯 优化成果总结 | ⭐ 核心 |
| `DEPLOYMENT.md` | 🚀 部署指南 | 重要 |
| `DEVELOPMENT.md` | 🛠️ 开发指南 | 重要 |

## 🎯 使用建议

### 🚀 日常开发流程
1. 启动开发环境：`./scripts/dev-tools.sh`
2. 创建或编辑PPT内容
3. 构建项目：使用菜单选项或 `npm run build:enhanced`
4. 预览结果：`npm run dev:home`

### 📊 定期优化流程
1. 分析项目：`npm run optimize:images`
2. 查看性能：`npm run performance`
3. WebP优化：`npm run webp:analyze`
4. 清理项目：`npm run clean`

### 📖 查看帮助
```bash
# 快速功能清单
./tools/optimization-checklist.sh

# 完整优化文档
cat docs/OPTIMIZATION-SUMMARY.md

# 开发指南
cat docs/DEVELOPMENT.md
```

## ✨ 整理优势

### ✅ 优点
- 🗂️ **目录清晰**：脚本、工具、文档分类明确
- 🚀 **易于维护**：相关文件集中管理
- 📱 **使用便捷**：npm 脚本路径自动处理
- 🔍 **快速定位**：按功能分类，容易查找

### 🎯 核心原则
- `scripts/` - 开发和构建相关脚本
- `tools/` - 优化和分析工具
- `docs/` - 所有项目文档
- 根目录 - 只保留核心配置文件

---

*整理完成时间: $(date)*
*新结构版本: v3.0.0*