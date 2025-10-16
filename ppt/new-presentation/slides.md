---
# PPT配置
theme: default
title: 项目展示模板
info: |
  ## 项目展示模板
  通用项目展示PPT模板
author: Your Name
date: 2025-10
# 布局配置
layout: cover
class: 'text-center'
# 高亮器
highlighter: shiki
# 启用绘图
drawings:
  persist: false
# 切换效果
transition: slide-left
# 启用MDC语法
mdc: true
setup: |
  import { onMounted } from 'vue'

  const extractPptId = () => {
    if (typeof window === 'undefined') return ''
    const segments = window.location.pathname.split('/').filter(Boolean)
    if (segments.length < 2) return ''
    return segments[1]
  }

  const recordPptView = async () => {
    const pptId = extractPptId()
    if (!pptId) return
    const url = `/api/views?ppt=${encodeURIComponent(pptId)}`
    const payload = JSON.stringify({ event: 'ppt-view' })

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: payload,
        keepalive: true,
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`记录浏览量失败: ${response.status}`)
      }
    } catch (error) {
      console.warn('记录 PPT 浏览量失败，尝试备用方案', error)
      if (navigator.sendBeacon) {
        try {
          navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }))
        } catch (err) {
          console.warn('sendBeacon 也失败', err)
        }
      }
    }
  }

  onMounted(() => {
    recordPptView()
  })
---

# 新演示文稿

演示文稿副标题

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    按空格键开始 <carbon:arrow-right class="inline"/>
  </span>
</div>

<!--
演示文稿备注
-->

---

# 目录

<Toc />

---
layout: default
---

# 第一部分

- 📝 要点一
- 🎯 要点二
- 🚀 要点三

---

# 第二部分

内容...

---
layout: center
class: text-center
---

# 谢谢观看！

[文档](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev)
