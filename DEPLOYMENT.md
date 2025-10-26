# 浏览量功能部署指南

## 📋 功能说明

浏览量功能使用 Vercel KV（基于 Redis 的边缘数据库）来存储每个 PPT 的浏览次数。

### 功能特性

- ✅ **实时统计** - 基于 Vercel Edge Runtime，全球低延迟
- ✅ **自动增加** - 打开 PPT 详情页时自动增加浏览量
- ✅ **首页显示** - 在首页 PPT 卡片上显示浏览量
- ✅ **详情页显示** - 在 PPT 播放页右上角显示浏览量

## 🚀 部署步骤

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "feat: add view counter with Vercel KV"
git push
```

### 2. 在 Vercel 上创建/连接项目

如果还没有部署：
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **Add New Project**
3. 导入你的 GitHub 仓库
4. 点击 **Deploy**

### 3. 创建 KV 数据库

部署成功后：

1. 在 Vercel Dashboard 中打开你的项目
2. 点击顶部导航栏的 **Storage** 标签
3. 点击 **Create Database** 按钮
4. 选择 **KV** (Key-Value Store)
5. 输入数据库名称（例如：`ppt-views`）
6. 选择地区（建议选择离你用户最近的地区）
7. 点击 **Create**

### 4. 连接数据库到项目

创建 KV 数据库后：

1. 在数据库详情页，点击 **Connect** 标签
2. 选择你的项目
3. 点击 **Connect Database**
4. Vercel 会自动添加以下环境变量到你的项目：
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### 5. 重新部署

连接数据库后，需要重新部署项目以使环境变量生效：

1. 在项目页面，点击 **Deployments** 标签
2. 找到最新的部署，点击右侧的三个点
3. 选择 **Redeploy**
4. 等待部署完成

## ✅ 验证功能

部署完成后，访问你的网站：

1. **首页** - 每个 PPT 卡片下方应该显示浏览量（初始为 0）
2. **点击进入任意 PPT** - 右上角显示浏览量，并自动 +1
3. **返回首页** - 刷新后浏览量应该更新为 1
4. **再次进入** - 浏览量继续增加

## 📊 查看数据

在 Vercel Dashboard 的 KV 数据库页面：

1. 点击 **Data Browser** 标签
2. 可以看到所有存储的 key-value 对
3. 格式为：`ppt:view:{ppt-id}` -> `浏览次数`

例如：
- `ppt:view:luminescent-materials` -> `15`
- `ppt:view:sample-presentation` -> `8`

## 🛠️ 本地开发测试

如果需要在本地测试浏览量功能：

### 1. 获取 KV 凭证

在 Vercel Dashboard 的 KV 数据库页面：
1. 点击 **Settings** 标签
2. 找到 **REST API** 部分
3. 复制以下信息：
   - REST API URL
   - REST API Token
   - REST API Read Only Token

### 2. 配置本地环境变量

创建 `.env.local` 文件：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`，填入刚才复制的值：

```env
KV_REST_API_URL=https://xxxxx.kv.vercel-storage.com
KV_REST_API_TOKEN=xxxxx
KV_REST_API_READ_ONLY_TOKEN=xxxxx
```

### 3. 重启开发服务器

```bash
pnpm dev
```

现在本地开发环境也可以使用浏览量功能了！

## 📈 API 使用

### 获取浏览量

```bash
GET /api/views?ppt=luminescent-materials

# 响应
{
  "pptId": "luminescent-materials",
  "count": 15
}
```

### 增加浏览量

```bash
POST /api/views?ppt=luminescent-materials
Content-Type: application/json

{
  "source": "page-view"
}

# 响应
{
  "pptId": "luminescent-materials",
  "count": 16,
  "source": "page-view"
}
```

## 🔧 故障排除

### 浏览量显示为 0 且不增加

1. 检查 Vercel Dashboard 中 KV 数据库是否已创建
2. 检查环境变量是否已正确注入（Settings -> Environment Variables）
3. 检查是否已重新部署项目

### 本地开发浏览量不工作

1. 确认 `.env.local` 文件存在且包含正确的凭证
2. 检查 `.env.local` 是否在 `.gitignore` 中（应该被忽略）
3. 重启开发服务器

### 浏览量显示但不准确

这是正常的，因为：
- Edge Function 可能有缓存
- 多个用户同时访问时的竞态条件
- 可以在 KV Data Browser 中手动重置某个 PPT 的浏览量

## 💡 提示

- KV 数据库是全球分布的，读写速度非常快
- 免费计划有使用限制，查看 [Vercel KV Pricing](https://vercel.com/docs/storage/vercel-kv/usage-and-pricing)
- 可以在代码中添加防刷机制（例如：同一 IP 短时间内只计数一次）
