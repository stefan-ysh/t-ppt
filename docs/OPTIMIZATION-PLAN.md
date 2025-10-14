# T-PPT 项目全面优化方案

## 1. 构建脚本对比分析

### `build` vs `build:enhanced`

| 特性           | build (build.js) | build:enhanced (shell) |
| -------------- | ---------------- | ---------------------- |
| **语言**       | Node.js          | Bash Shell             |
| **并行构建**   | ❌ 串行          | ✅ 支持并行 (4线程)    |
| **错误处理**   | ✅ 完整          | ✅ 完整 + 信号处理     |
| **构建缓存**   | ❌ 无            | ✅ 支持缓存控制        |
| **进度显示**   | ✅ 基础          | ✅ 彩色日志            |
| **构建报告**   | ❌ 无            | ✅ JSON报告            |
| **图片优化**   | ❌ 无            | ✅ 可选imagemin        |
| **重定向文件** | ✅ 自动生成      | ❌ 缺失                |
| **跨平台**     | ✅ 完全          | ⚠️ Unix/Linux          |

### 推荐方案

建议**合并两者优点**，创建统一的高性能构建脚本。

## 2. Package.json Scripts 优化

### 可删除的Scripts

```json
{
  "build:shell": "冗余，与build:enhanced重复",
  "dev:ppt": "功能过于简单",
  "optimize:images:stats": "路径错误",
  "setup": "与install:all重复",
  "check": "功能重复",
  "analyze": "依赖不存在",
  "webp:guide": "与webp:analyze重复"
}
```

### 可合并的Scripts

```json
{
  "test:ui": "合并到test",
  "seo:sitemap + seo:robots": "合并到seo:generate",
  "template:list + template:create": "合并到template"
}
```

## 3. PPT标题优化建议

### 当前标题问题

- `长余辉自发光材料` - 专业术语，不够通俗
- `新演示文稿` - 过于通用
- `测试演示文稿` - 测试用途

### 优化建议

- `长余辉自发光材料` → `发光材料技术研究`
- `新演示文稿` → `项目展示模板`
- `测试演示文稿` → `功能演示案例`

## 4. 项目结构问题

### 发现的问题

1. **重复文件**: ppt/test-presentation 是测试文件
2. **配置文件**: .env.example 存在但无文档
3. **依赖管理**: 混用npm和pnpm
4. **构建输出**: 缺少构建统计和监控

### 优化方案

1. 清理测试文件
2. 统一包管理器
3. 完善文档
4. 添加性能监控

## 5. 实施计划

### Phase 1: Scripts清理 (优先级: 高)

- [ ] 删除冗余scripts
- [ ] 合并相似功能
- [ ] 更新相关文档

### Phase 2: 构建优化 (优先级: 高)

- [ ] 创建统一构建脚本
- [ ] 添加并行支持
- [ ] 保留重定向文件生成

### Phase 3: 项目清理 (优先级: 中)

- [ ] 优化PPT标题
- [ ] 清理测试文件
- [ ] 统一包管理

### Phase 4: 文档完善 (优先级: 中)

- [ ] 更新README
- [ ] 添加.env文档
- [ ] 完善部署指南
