# Slidev 演示文稿项目

这是一个基于 [Slidev](https://sli.dev/) 的演示文稿项目。Slidev 是一个为开发者设计的演示文稿工具，支持使用 Markdown 语法创建美观的幻灯片。

## 项目特点

- 📝 **基于 Markdown** - 使用简单的 Markdown 语法编写幻灯片
- 🎨 **丰富的主题** - 内置多种主题，支持自定义样式
- 🧑‍💻 **开发者友好** - 支持代码高亮、语法突出显示
- 🤹 **Vue.js 集成** - 可以嵌入 Vue 组件来增强交互性
- 🎥 **多种导出格式** - 支持导出为 PDF、PNG 或可部署的 SPA
- 🔄 **实时预览** - 修改内容即时更新，提高开发效率

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器并自动打开浏览器：

```bash
npm run dev
```

### 构建生产版本

构建静态文件用于部署：

```bash
npm run build
```

### 导出为 PDF

将演示文稿导出为 PDF 格式：

```bash
npm run export
```

## 项目结构

```
slidev-pptx/
├── slides.md              # 主要的演示文稿内容
├── components/             # Vue 组件目录
│   └── Counter.vue        # 示例计数器组件
├── package.json           # 项目配置和依赖
├── .vscode/              # VS Code 配置
│   └── tasks.json        # 任务配置
└── README.md             # 项目说明文档
```

## 编辑演示文稿

1. 打开 `slides.md` 文件
2. 使用 Markdown 语法编写内容
3. 使用 `---` 分隔不同的幻灯片
4. 在 frontmatter 中配置主题和其他设置

### 基本语法示例

```markdown
---
theme: default
---

# 我的演示标题

这是第一张幻灯片的内容

---

# 第二张幻灯片

- 要点 1
- 要点 2
- 要点 3
```

## Vue 组件

您可以在 `components/` 目录中创建自定义 Vue 组件，并在幻灯片中使用：

```html
<Counter :count="10" />
```

## 主题定制

Slidev 支持多种内置主题，您也可以：

1. 在 frontmatter 中更改主题：`theme: seriph`
2. 创建自定义 CSS 样式
3. 使用 UnoCSS 类进行快速样式调整

## VS Code 扩展推荐

- **Slidev** - 官方 VS Code 扩展
- **Vue Language Features** - Vue.js 语言支持
- **Markdown Preview Enhanced** - Markdown 预览增强

## 键盘快捷键

在演示模式下：

- `空格键` / `→` - 下一张幻灯片
- `Shift + 空格键` / `←` - 上一张幻灯片
- `↑` / `↓` - 跳转到上一张/下一张幻灯片
- `f` - 全屏模式
- `o` - 概览模式

## 了解更多

- [Slidev 官方文档](https://sli.dev/)
- [Slidev GitHub 仓库](https://github.com/slidevjs/slidev)
- [主题库](https://sli.dev/themes/gallery.html)
- [示例展示](https://sli.dev/showcases.html)

## License

MIT