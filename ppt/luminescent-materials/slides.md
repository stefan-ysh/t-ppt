---
# 试试 write-good 和 grammarly
theme: default
image: './bj.jpg'
layout: image
# 一些关于幻灯片的信息，比如标题、作者等
title: 发光材料技术研究
info: |
  ## 演示文稿
# 应用 unocss 类到当前幻灯片
class: 'text-center flex flex-col justify-center items-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# https://sli.dev/guide/drawing
drawings:
  persist: false
# 幻灯片切换效果
transition: slide-left
addons:
  - slidev-addon-qrcode
# 使用 MDC 语法启用
mdc: true
fonts:
  # 基础字体
  sans: Robot
  # 与 UnoCSS 的 `font-serif` css 类一同使用
  serif: Robot Slab
  # 用于代码块、内联代码等
  mono: Fira Code
---

<span class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b  bg-clip-text text-center text-4xl font-semibold leading-none text-transparent from-white to-slate-900/10 absolute top-30">
  新能源光织物的开发及其在主动光安全系统中的应用
</span>
<div w-full h-auto flex="~ flex row items-center justify-right" text-sm absolute top="60" right="20">
<div>
  <span class="px-2 py-1 rounded">
  <mdi-school flex-shrink="0" class="text-blue-400 mx-2" />
    扬州大学
  </span>
</div>
<div>
  <span class="px-2 py-1 rounded">
  <mdi-account flex-shrink="0" class="text-blue-400 mx-2" />
    田甜
  </span>
</div>
<div>
  <mdi-email flex-shrink="0" class="text-blue-400 mx-2" />
  <a href="mailto:tiant91@yzu.edu.cn">tiant91@yzu.edu.cn</a>
</div>
</div>

<!--
这里是注释内容，不会在幻灯片中显示
-->

---
layout: default
transition: slide-left
---

<!--
## transition: fade-out -->
<!-- # 什么是 Slidev？ -->
<!-- 背景 -->

<!--
Slidev 是一个为开发者量身定制的演示文稿工具

- 📝 **基于文本** - 专注于内容，使用 Markdown
- 🎨 **可定制主题** - 主题可以在不同的演示文稿中共享和重用
- 🧑‍💻 **开发者友好** - 支持代码高亮、实时编辑
- 🤹 **交互式** - 嵌入 Vue 组件来增强您的表达
- 🎥 **录制** - 内置录制和摄像头视图
- 📤 **便携性** - 导出为 PDF、PNG 或可部署的 SPA
- 🛠 **可破解性** - 几乎所有东西都可以通过网络界面访问和定制

<br>
<br>


<img src="/tina.png" alt="Slidev Logo" class=" h-full w-auto" /> -->
<!-- <RenderWhen context="presenter">这只会在演讲者视图中显示。</RenderWhen> -->

<SelfIntroduction />

<!-- 阅读更多关于[为什么选择 Slidev？](https://sli.dev/guide/why) -->

<!--
您可以对每张幻灯片进行更多自定义，请阅读文档了解更多。
-->

---
theme: default
title: 欢迎使用 Slidev
transition: slide-left
mdc: true
---

<Three />

---
disabled: true
---

<div flex="~ col" h="full" justify="between" p="y-10">
  <div  flex="~ row justify-between gap-4">
    <div class="flex flex-col items-center justify-between border-1 border-gray-300 rounded-lg px-4 py-1" hover="border-blue-300 bg-blue-100" duration="500" >
      <img src="/xps.png" alt="Slidev Logo"   />
      <span>XPS</span>
    </div>
    <div class="flex flex-col items-center justify-between border-1 border-gray-300 rounded-lg px-4 py-1" hover="border-blue-300 bg-blue-100" duration="500">
      <img src="/tem.png" alt="Slidev Logo"  />
      <span>Tem</span>
    </div>
    <div class="flex flex-col items-center justify-between border-1 border-gray-300 rounded-lg px-4 py-1" hover="border-blue-300 bg-blue-100" duration="500">
      <img src="/xrd.png" alt="Slidev Logo"  />
      <span>XRD</span>
    </div>
    <div class="flex flex-col items-center justify-between border-1 border-gray-300 rounded-lg px-4 py-1" hover="border-blue-300 bg-blue-100" duration="500">
      <img src="/fe-sem.png" alt="Slidev Logo"  />
      <span>Fe-SEM</span>
    </div>
    <div class="flex flex-col items-center justify-between border-1 border-gray-300 rounded-lg px-4 py-1" hover="border-blue-300 bg-blue-100" duration="500">
      <img src="/raman.png" alt="Slidev Logo"  />
      <span>Raman</span>
    </div>
  </div>
  <ul class="pt-6 text-xs opacity-75">
    <li>平台已具备基础的试验条件和多种表征手段，申请经费主要用于采购小型试验装置、耗材、药品与试剂、及球差电镜、同步辐射测试等高级表征</li>
    <li>团队与加拿大萨斯喀彻温大学的Mohsen Shakouri教授（Canadian Light Source Inc.）、美国布鲁克海文国家实验室的National Synchrotron Light Source（NSLS-Ⅱ)、  阿贡国家实验室的合作</li>
  </ul>
</div>

---
disabled: true
---

<div flex="~ col" justify="center" items="center" p="y-10">
    <img src="/constract.png" w="5/6" />
    <span class="text-xs opacity-75 mt-5">
      与 江苏华富储能新技术股份有限公司、中汽研汽车检验中心（常州）有限公司、扬农化工集团、江苏富威能源有限公司、宁德时代新能源科技股份有限公司等企业合作，主持省重点研发项目1项（300万元） ，校企合作横向多项（500万元以上）
    </span>
  </div>

---

<div absolute inset-0 w-full flex="~ row">
<h4 absolute z="20" w="1/2" class="bg-[#0a1522]" p="2">研究背景</h4>
 <img src="/3-1.jpg" w="1/2"/>
 <span absolute left-0 bottom-0 w="1/2" z="12" text-sm p="2" text-white>主动安全技术是通过预先防范，在突发情况下， 辅助驾驶员在轻松和舒适的驾驶条件下自如地操纵汽车，避免交通事故。</span>
 <div w="1/2" absolute inset-0 style="background: linear-gradient(0deg, #53658f99 0%,  #ffffff00 50%)" z-11 class="bg-opacity-200"></div>

 <img src="/3-2.jpg" w="1/2"/>
 <div absolute right-0 top-0 w="1/2" z="12" p="2" text-white>
 <span>什么是主动光安全系统？</span>
 <br />
 <span text-sm>集成光学材料、智能传感与响应控制技术的先进安全系统，旨在通过​<TextHighlight class="bg-gradient-to-r from-blue-300 to-red-300">​主动发光、动态提示与环境交互​
      </TextHighlight>​的方式，提升人、车、环境之间的可视化与通信能力，从而预防事故、增强安全性能。</span>
 </div>

 <div w="1/2" absolute right-0 top-0 bottom-0 style="background: linear-gradient(180deg, #53658f99 0%,  #ffffff00 100%)" z-11 class="bg-opacity-200"></div>

</div>

---

<div absolute inset-0 w-full flex="~ row">
  <h5 absolute z="20" w="1/2" p="2" text-center>新能源光织物的研发意义</h5>
 <span absolute left-0 top="50" w="1/2" z="12" text-sm word-wrap p-5>
  新能源光织物作为一种融合光电材料与纺织技术的新型功能材料，具备​<TextHighlight class="bg-gradient-to-r from-blue-300 to-red-300">柔性、轻质、高亮度及环境响应</TextHighlight>等特点。通过​​自发光、动态提示与环境自适应​​能力，显著增强人、车、环境在低可视条件下的安全性，尤其适用于交通、救援、户外作业等领域。
 </span>
  <img src="/4-2.png" w="160" absolute left="70" top="34" z="12"/>
 <img src="/4-1.jpg" w="1/2" absolute right-0 top-0/>
</div>

---

<div flex="~ col justify-center items-center" h="full" p="y-10" relative>
  <span
    class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
  >
    项目1 ：大面积绿光光织物的开发和应用
  </span>
  <ParticlesBg
      :key="$slidev.nav.currentPage"
      class="absolute inset-0"
      :quantity="100"
      :ease="100"
      color="#FFF"
      :staticity="10"
      refresh
    />
</div>

---
clicks: 2
---

<!-- 必须加enter 和 leave -->
<div>
<SevenOne />

<img
  src="/11111.png"
  v-motion
  :initial="{ x: 1000, y: 0 }"
  :enter="{ x: 1000, y: 10 }"
  :click-1="{x: 400, y: 100}"
  :click-2="{x: 0, y: 100}"
  :leave="{ x: 0 }"
  transition="ease-out"
  duration="1000"
  z-999
  w="1/2"
/>

<SevenTwo />
</div>

---

<h3 text="center" mb="10">
  防水发光纤维膜的合成机理
</h3>

<div w="full" h="1/2" flex="~ cols-2 justify-end items-center" absolute top="30"> 
  <span absolute left="25" top="-10">CsPbBr3@HPβCD@PFOS composites</span>
  <img src="/只要圆 拷贝.png" w="1/2" absolute top="-10" left="0" />
  <span absolute  top="-15" right="50">water repelling</span>
  <span absolute  top="35" right="20">CsPbBr3@HPβCD@PFOS fiber</span>
  <span absolute  top="80" right="5">CsPbBr3@HPβCD on PS matrix</span>
  <span absolute  top="90" right="40" font="bold">sectional drawing</span>
  <span absolute  top="98" left="20">Br</span>
  <span absolute  top="98" left="50">Pb</span>
  <span absolute  top="98" left="75">Cs</span>
  <span absolute  top="98" left="100">CsPbBr3 nanocrystal</span>
  <span absolute  top="98" left="170">HPBCD cluster</span>
  <span absolute  top="98" right="8">PFOS</span>
  <img src="/未标题-1 拷贝.png" w="1/2"  absolute top="-20" right="0" />
</div>
<div w="full" flex="~ justify-center items-center" absolute bottom="-3">
  <img src="/图例.png"  />
</div>

---

<h3 text="center" mb="5">
  形貌表征
</h3>
<div grid="~ cols-2 gap-2">
  <img border="rounded" src="/---.png" w="6/7" >
  <div grid="~ cols-2 rows-3 gap-2">
  <div relative>
    <span absolute color="white" left="2">a</span>
    <img border="rounded" src="/a.jpg" w="6/7" h="full" >
  </div>
  <div relative>
    <span absolute color="white" left="2">b</span>
    <img border="rounded" src="/b.jpg" w="6/7" h="full" >
  </div>
  <div relative>
    <span absolute color="white" left="2">c</span>
    <img border="rounded" src="/c.jpg" w="6/7" h="full" >
  </div>
  <div relative>
    <span absolute color="white" left="2">d</span>
    <img border="rounded" src="/d.jpg" w="6/7" h="full" >
      </div>
  </div>
</div>
<span absolute color="white" text="0.8rem" top="20" left="41">CsPbBr3</span>
<span absolute color="white" text="0.8rem" top="57" left="28">CsPbBr3@HPβCD</span>
<span absolute color="white" text="0.8rem" top="93" left="18">CsPbBr3@HPβCD/PFOS</span>
<div absolute bottom="7" right="30">环糊精在改善CsPbBr3晶体质量中的作用</div>

<!--
<div grid="~ cols-2 gap-2" m="t-2">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-default/01.png?raw=true" alt="">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-apple-basic/01.png?raw=true" alt="">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-bricks/01.png?raw=true" alt="">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-seriph/01.png?raw=true" alt="">

</div>
-->

---

<h3 text="center" mb="5">
  防水发光纤维膜的应用
</h3>

<div grid="~ cols-2 gap-2" m="t-2">
  <div relative text-center>
    <div grid="~ rows-2 gap-5" flex="~ col justify-center items-center">
        <img border="rounded" src="/666 拷贝.png" w="4/5" >
        <!-- 底部放大图 -->
        <img border="rounded" absolute left="3" bottom="10" src="/1111图片 1.png" w="4/5">
    </div>
    <!-- 放大的光束 -->
    <div absolute top="55" left="-3" class="aurora-shape"/>
    <span absolute bottom="-5" left="0" right="0" text="0.9rem">CsPbBr3 防水纺织品用于救生衣显示</span>
  </div>
  <div relative>
  <div grid="~ rows-2 gap-5">
    <div relative grid="~ cols-3 gap-2" text="center">
      <img border="rounded" src="/11 拷贝.png" w="4/5" m="x-auto">
      <img border="rounded" src="/22 拷贝.png" w="4/5" m="x-auto">
      <img border="rounded" src="/33 拷贝.png" w="4/5" m="x-auto">
      <span absolute bottom="10" left="0" right="0" text="0.9rem">在制备多色发光织物中依旧有效</span>
    </div>
    <div relative grid="~ cols-2 gap-2">
      <div relative text-center>
        <div m="b-8">
          <img border="rounded" src="/10-3.png" w="4/5" >
        </div>
        <span absolute bottom="-5" left="0" right="0" text="0.9rem">三种钙钛矿纤维制备的WLED</span>
      </div>
      <div relative text-center>
        <div m="b-8">
          <img border="rounded" src="/555 拷贝.png" w="" >
        </div>
        <span absolute bottom="-5" left="0" right="0" text="0.9rem">CsPbBr3用于图案化显示</span>
      </div>
    </div>
  </div>
  </div>
</div>

<style>
.aurora-shape {
  /* 定义我们形状的视口大小 */
  width: 450px;
  height: 450px;
  rotate: 306deg;

  /*
   * 这是实现效果的核心。
   * 我们创建了一个径向渐变，它的形状、大小、位置和颜色都经过了精心调整。
   */
  background: radial-gradient(
    /* * 1. 形状和大小: 'ellipse 70% 60%'
     * - 定义渐变为椭圆形。
     * - 它的宽度是容器的70%，高度是容器的60%。
     */
    ellipse 70% 60% 

    /*
     * 2. 位置: 'at 90% 10%'
     * - 将渐变的中心点放在距离容器左边90%、顶部10%的位置。
     * - 这个定位是关键，它使得渐变的弧形边缘和中心都在容器的右上角区域，
     * 而容器的左边和底边则形成了锐利的直线边缘。
     */
    at 90% 10%,

    /*
     * 3. 颜色和过渡点:
     * - #1E6143 0%: 渐变的中心是实心的绿色（从图片中提取的颜色）。
     * - rgba(30, 97, 67, 0) 60%: 在半径的60%处，颜色完全过渡到透明。
     * - 这就创造了从中心向外的柔和模糊边缘。
     */
    #40bf8690 0%,
    rgba(30, 97, 67, 0) 80%
  );
}
</style>

---
clicks: 8
---

<div flex="~" absolute h="full" top="0" left="0" bottom="0" right="0">
  <SlidevVideo autoplay loop muted playsinline>
    <!-- 可以加入 HTML video 元素中能包含的任何内容。 -->
    <source src="/发光材料水下可见性演示.mov" type="video/mp4" />
    <p>
      你的浏览器不支持播放该视频，请点击
      <a href="/发光材料水下可见性演示.mov">此处</a>
      下载。
    </p>
  </SlidevVideo>
  <span
    w="full"
    text="center"
    v-motion
    :initial="{ x: 0, y: -25 }"
    :enter="{ x: 0, y: -25 }"
    :click-4="{x: 0, y: 0}"
    :click-5="{x: 0, y: 1000}"
    transition="ease-out"
    duration="500"
  >PVK 纤维膜在水中浸泡 3260h 后，荧光强度仍保持 85%，且几乎无铅泄露</span>
  <!-- 右侧背景图 -->
  <img
    src="/0000.png"
    absolute
    w="4/5"
    h="full"
    right="-42"
    v-motion
    :initial="{ x: 0, y: -1000 }"
    :enter="{ x: 0, y: -1000 }"
    :click-5="{x: 0, y: 0}"
    transition="ease-out"
    duration="500"
  />
  <!-- 右侧文字背景 -->
  <div
    absolute
    bg="#082c47bb"
    w="full"
    h="full"
    v-motion
    :initial="{ x: 1000, y: 0 }"
    :enter="{ x: 1000, y: 0 }"
    :click-6="{x: 368, y: 0}"
    transition="ease-out"
    duration="500"
  />
  <!-- 右侧文字-1 -->
  <div
    bg="#dbe2f1"
    w="140"
    rounded="lg"
    flex="~ col justify-center items-center"
    absolute
    p="2" 
    v-motion
    :initial="{ x: 1000, y: 50 }"
    :enter="{ x: 1000, y: 50 }"
    :click-6="{x: 395, y: 50}"
    transition="ease-out"
    duration="500"
  >
    <h3 color="lightblue" w="full" text="left">全球首创​​</h3>
    <h5 color="black" text="left" w="full">室温空气环境下制备柔性绿光纤维膜，突破传统钙钛矿环境敏感性限制</h5>
  </div>
  <!-- 右侧文字-2 -->
  <div
    bg="#dbe2f1"
    w="140"
    rounded="lg"
    flex="~ col justify-center items-center"
    absolute
    p="2" 
    v-motion
    :initial="{ x: 1000, y: 230 }"
    :enter="{ x: 1000, y: 230 }"
    :click-7="{x: 395, y: 230}"
    transition="ease-out"
    duration="500"
  >
    <h3 color="lightblue" w="full" text="left">​超强稳定性​​</h3>
    <h5 color="black" text="left" w="full">3260小时水下浸泡后荧光强度保持85%，铅泄露量低于安全标准（Editors' Highlights认证）</h5>
  </div>
  <!-- 右侧文字-3 -->
  <div
    bg="#dbe2f1"
    w="140"
    rounded="lg"
    flex="~ col justify-center items-center"
    absolute
    p="2" 
    v-motion
    :initial="{ x: 1000, y: 430 }"
    :enter="{ x: 1000, y: 430 }"
    :click-8="{x: 395, y: 430}"
    transition="ease-out"
    duration="500"
  >
    <h3 color="lightblue" w="full" text="left">多场景应用​​</h3>
    <h5 color="black" text="left" w="full">深海救援标识（救生衣）、动态显示织物（广告/安防）、节能照明（WLED）</h5>
  </div>
  <img
    src="/r.png"
    absolute
    w="140"
    bottom="0"
    right="13"
    v-motion
    :initial="{ x: 0, y: 0 }"
    :enter="{ x: 0, y: 0 }"
    :click-4="{x: 0, y: 0}"
    :click-5="{x: 0, y: 1000}"
    transition="ease-out"
    duration="500"
  />
  <!-- 左侧图表背景 -->
  <div
    absolute
    bg="#081d57dd"
    w="92"
    h="full"
    v-motion
    :initial="{ x: 0, y: -1000 }"
    :enter="{ x: 0, y: -1000 }"
    :click-1="{x: 0, y: 0}"
    :leave="{ x: 0, y: 0 }"
    transition="ease-out"
    duration="1000"
  />
  <!-- 图表-1 -->
  <img
    src="/111111.png"
    absolute
    v-motion
    :initial="{ x: 0, y: -1000 }"
    :enter="{ x: 0, y: -1000 }"
    :click-1="{x: 0, y: 10}"
    :leave="{ x: 0, y: 10 }"
    transition="ease-out"
    duration="500"
    w="1/3"
  >
  <!-- 图表-2 -->
  <img
    src="/22222.png"
    absolute
    v-motion
    :initial="{ x: 0, y: -1000 }"
    :enter="{ x: 0, y: -1000 }"
    :click-2="{x: 0, y: 182}"
    :leave="{ x: 0, y: 182 }"
    transition="ease-out"
    duration="500"
    w="1/3"
  >
  <!-- 图表-3 -->
  <img
    src="/33333.png"
    absolute
    v-motion
    :initial="{ x: 0, y: -1000 }"
    :enter="{ x: 0, y: -1000 }"
    :click-3="{x: 0, y: 359}"
    :leave="{ x: 0, y: 359 }"
    transition="ease-out"
    duration="500"
    w="1/3"
  >
</div>

---

<div flex="~ col justify-center items-center" h="full" p="y-10" relative>
  <span
    class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
  >
    项目2：主动发光膜的开发和节能应用
  </span>
  <ParticlesBg
    :key="$slidev.nav.currentPage"
    class="absolute inset-0"
    :quantity="100"
    :ease="100"
    :staticity="10"
    refresh
  />
</div>

---
layout: two-cols
---

<template v-slot:default>
<img src="/13l.png" alt="Slidev Logo" w="110" />
<span absolute bottom="5" w="110" text="center" class="text-sm">
  余辉时间突破 30 小时，光致发光量子产率达 68.8%
</span>
<span absolute top="2" left="1/2" translate-x="-1/2" w="110" text="center">
  室温空气中制备大面积超长余晖多色稀土薄膜
</span>

</template>
<template v-slot:right>
  <SlidevVideo autoplay loop muted playsinline absolute w="108" m="l-5">
    <!-- 可以加入 HTML video 元素中能包含的任何内容。 -->
    <source src="/13r.mp4" type="video/mp4" />
    <p>
      你的浏览器不支持播放该视频，请点击
      <a href="/cover.mp4">此处</a>
      下载。
    </p>
  </SlidevVideo>
<span absolute bottom="5" m="l-5" w="108" text="0.9rem">
  以通过精确调控红、绿、蓝三色稀土荧光粉与ZnS的空间分布与界面相互作用，成功制备出面积达0.4m×3m的超长余辉膜
</span>
</template>

---
clicks: 1
---

<h3 text="center" mb="5">
  防水发光纤维膜的应用
</h3>
<div flex="~" absolute h="full" top="0" left="0" bottom="0" right="0">
  <img
    src="/14-1.png"
    absolute
    v-motion
    :initial="{ x: 0, y: 50 }"
    :enter="{ x: 0, y: 50 }"
    :leave="{ x: 0, y: -1000 }"
    transition="ease-out"
    duration="500"
    w="full"
  >
  <div
    v-motion
    :initial="{ x: 0, y: 10 }"
    :enter="{ x: 0, y: 10 }"
    :click-1="{x: 1000, y: 20}"
    :leave="{ x: 10, y: 10 }"
    transition="ease-out"
    duration="500"
    dark:bg="gray-900"
    light:bg="white"
    w="full"
    h="1/3"
    z='1'
    absolute
    bottom="0"
  />
  <img
    src="/14-2.png"
    absolute
    v-motion
    :initial="{ x: 0, y: -100 }"
    :enter="{ x: 0, y: 400, opacity: 0 }"
    :click-1="{x: 0, y: 400, opacity: 1}"
    :leave="{ x: 0, y: 400, opacity: 1 }"
    transition="ease-out"
    duration="500"
    w="full"
  >
</div>

---
clicks: 1
---

<h3 text="center" mb="5">
  长余辉光织物的光学表征
</h3>
<div flex="~" absolute h="full" top="0" left="0" bottom="0" right="0">
  <img
    src="/15-1.png"
    absolute
    v-motion
    :initial="{ x: 0, y: 150 }"
    :enter="{ x: 0, y: 150 }"
    :click-1="{x: 0, y: 80}"
    transition="ease-out"
    duration="500"
    w="full"
    z="2"
  >
  <div
    v-motion
    :initial="{ x: 0, y: 10 }"
    :enter="{ x: 0, y: 10 }"
    :click-1="{x: 1000, y: 20}"
    transition="ease-out"
    duration="500"
    dark:bg="gray-900"
    light:bg="white"
    w="full"
    h="1/2"
    z='1'
    absolute
    bottom="0"
  />
  <img
    src="/15-2.png"
    absolute
    v-motion
    :initial="{ x: 0, y: -100 }"
    :enter="{ x: 0, y: 320, opacity: 0 }"
    :click-1="{x: 0, y: 320, opacity: 1}"
    transition="ease-out"
    duration="500"
    w="1/4"
  >
  <img
    src="/15-3.png"
    absolute
    v-motion
    :initial="{ x: 240, y: -100 }"
    :enter="{ x: 240, y: 330, opacity: 0 }"
    :click-1="{x: 240, y: 330, opacity: 1}"
    transition="ease-out"
    duration="500"
    w="3/4"
  >
  <div
    absolute
    v-motion
    :initial="{ x: 280, y: -100 }"
    :enter="{ x: 280, y: 500, opacity: 0 }"
    :click-1="{x: 280, y: 500, opacity: 1}"
    transition="ease-out"
    duration="500"
    w="4/6"
    text="xs"
    class="flex justify-between"
  >
  <span>
    超长余晖寿命
  </span>
  <span>
    具有全光谱余晖发射
  </span>
  <span>
    接受激发的光源波段范围广
  </span>
  <span>
    超长白色余晖
  </span>
  </div>
</div>

---

<div flex="~" absolute h="full" top="0" left="0" bottom="0" right="0">
  <img
    src="/16-1.png"
    absolute
    v-motion
    :initial="{ x: 0, y: 0 }"
    :enter="{ x: 0, y: 0 }"
    :leave="{ x: 0, y: 0 }"
    transition="ease-out"
    duration="500"
    w="full"
  >
  <SlidevVideo autoplay loop muted playsinline absolute w="79" right="12" top="6">
    <!-- 可以加入 HTML video 元素中能包含的任何内容。 -->
    <source src="/16-2.mp4" type="video/mp4" />
    <p>
      你的浏览器不支持播放该视频，请点击
      <a href="/cover.mp4">此处</a>
      下载。
    </p>
  </SlidevVideo>
</div>

---

<div p="r-5">
  <img
    src="/17-1.png"
    absolute
    w="1/2"
  >
  <img
    src="/17-2.png"
    absolute
    v-motion
    :initial="{ x: 0, y: 150 }"
    :enter="{ x: 0, y: 150 }"
    :leave="{ x: 0, y: 150 }"
    transition="ease-out"
    duration="500"
    w="1/2"
    h="93"
  >
</div>
<div relative w="110" h="full" float="right" style="background: linear-gradient(270deg, #53658f 0%, #ffffff, 100%, #ffffff 100%)">
  <img
    src="/sun.gif"
    absolute
    top="2"
    left="2"
    w="15"
  >
  <!-- 太阳光彩虹箭头 -->
  <svg 
    absolute 
    top="12" 
    left="12" 
    w="20" 
    h="30" 
    viewBox="0 0 100 50" 
    style="transform: rotate(150deg)"
    class="sunlight-arrow"
  >
    <defs>
      <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
        <stop offset="16.67%" style="stop-color:#FF7F00;stop-opacity:1" />
        <stop offset="33.33%" style="stop-color:#FFFF00;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#00FF00;stop-opacity:1" />
        <stop offset="66.67%" style="stop-color:#0000FF;stop-opacity:1" />
        <stop offset="83.33%" style="stop-color:#4B0082;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#9400D3;stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- 箭头主体 - 加宽版本 -->
    <path d="M 0 15 L 70 15 L 70 8 L 90 25 L 70 42 L 70 35 L 0 35 Z" fill="url(#rainbowGradient)" opacity="0.9">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </path>
  </svg>
  <img
    src="/moon.gif"
    absolute
    top="0"
    right="0"
    w="20"
  >
  <img
    src="/17-3.png"
    absolute
    top="18"
    left="4"
    w="full"
  >
</div>

<style>
.sunlight-arrow {
  animation: sunlightPulse 2s ease-in-out infinite;
}

@keyframes sunlightPulse {
  0%, 100% {
    opacity: 0.6;
    transform: rotate(50deg) scale(1);
  }
  50% {
    opacity: 1;
    transform: rotate(50deg) scale(1.05);
  }
}
</style>

---

<h3 text="center">
  柔性大面积多色长余辉纤维膜应用
</h3>
<img
src="/18.png"
w="full"
h="full"
/>

---

<div absolute inset="0" bg="black">
<!-- <h3 text="center" z="11" absolute top="0" left="0" right="0" class="text-[#410903]">
  柔性大面积多色长余辉纤维膜应用光织材料辅助汽车安全预警照明
</h3> -->
<img
src="/19-3.png"
w="74"
absolute
right="0"
top="0"
z="10"
/>
right="0"
top="0"
/>
<SlidevVideo autoplay loop muted playsinline absolute w="full" top="0">
  <!-- 可以加入 HTML video 元素中能包含的任何内容。 -->
  <source src="/19-1.mp4" type="video/mp4" />
  <p>
    你的浏览器不支持播放该视频，请点击
    <a href="/cover.mp4">此处</a>
    下载。
  </p>
</SlidevVideo>
<SlidevVideo autoplay loop muted playsinline absolute w="50" bottom="10" right="10">
  <!-- 可以加入 HTML video 元素中能包含的任何内容。 -->
  <source src="/19-2.mp4" type="video/mp4" />
  <p>
    你的浏览器不支持播放该视频，请点击
    <a href="/cover.mp4">此处</a>
    下载。
  </p>
</SlidevVideo>
<span absolute left="35" bottom="0" text-xs text-red>
仅在光织物照明下的辅助行驶
</span>
<span absolute right="25" bottom="0" text-xs text-red>
耐揉搓，可压电发光
</span>
</div>

---

<div absolute inset="0" bg-black class="flex items-center justify-center">
<Compare
  first-image="before.png"
  second-image="after.jpg"
  :autoplay="true"
  :autoplay-duration="9000"
  first-content-class="object-cover object-left-top rounded-xl overflow-hidden p-0 sm:p-20"
  second-content-class="object-cover object-left-top rounded-xl overflow-hidden p-0 sm:p-10"
  class="h-[400px] w-[650px] sm:h-[500px] sm:w-[650px] mx-auto"
/>
</div>

---

<div absolute inset="0" bg="black" class="flex items-center justify-center">
<SlidevVideo loop controls playsinline absolute h="full">
  <!-- 可以加入 HTML video 元素中能包含的任何内容。 -->
  <source src="/20.mp4" type="video/mp4" />
  <p>
    你的浏览器不支持播放该视频，请点击
    <a href="/cover.mp4">此处</a>
    下载。
  </p>
</SlidevVideo>
</div>

---

<img
src="/21.png"
w="full"
h="full"
absolute
inset="0"
z="10"
/>

---

<h3 text="center">
  柔性绿光透明膜
</h3>
<img
src="/22.png"
w="full"
absolute
right="0"
top="15"
z="10"
/>

---
clicks: 3
---

<h3 text="center">
  柔性绿光透明膜
</h3>
<div
absolute
top="15"
z="10"
v-motion
:initial="{ x: 100, y: 40, opacity: 1, width: '350px' }"
:enter="{ x: 100, y: 40, opacity: 1, width: '350px' }"
:click-1="{ x: 100, y: 40, opacity: 0, width: '350px' }" 
:click-2="{ x: 20, y: 60, opacity: 1, width: '250px' }"
>
<img src="/23-1.png" w="full" h="full"/>
<div text-center w="full">light on</div>
</div>
<div
absolute
top="15"
z="10"
v-motion
:initial="{ x: 100, y: 40, opacity: 0 , width: '350px' }"
:enter="{ x: 100, y: 40, opacity: 0 , width: '350px' }"
:click-1="{ x: 100, y: 40, opacity: 1 , width: '350px' }"
:click-2="{ x: 300, y: 60, opacity: 1, width: '250px' }"
>
<img src="/23-2.png" w="full" h="full"/>
<div text-center w="full">light off</div>
</div>
<img
src="/23-3.png"
w="1/3"
absolute
v-motion
:initial="{ x: 600, y: -400 }"
:enter="{ x: 600, y: -400 }"
:click-2="{ x: 600, y: 50 }"
/>
<img
src="/23-4.png"
w="1/3"
absolute
v-motion
:initial="{ x: 595, y: -400 }"
:enter="{ x: 595, y: -400 }"
:click-3="{ x: 595, y: 85 }"
z='1'
/>
<div
  w="1/3"
  h="3/5"
  absolute
  v-motion
  :initial="{ x: 600, y: -650 }"
  :enter="{ x: 600, y: -650 }"
  :click-3="{ x: 600, y: 50 }"
  bg="#110055"
/>

---
clicks: 3
layout: two-cols
---

<template v-slot:default>
<div
  absolute
  inset="0"
  dark:bg="#121826"
  light:bg="#fff"
/>
<h3 absolute left="1/2" class="-translate-x-1/2" text="center">
  柔性透明光织膜主动发光应用
</h3>
<img
src="/24-1.png"
absolute
v-motion
:initial="{ x: 85, y:80, width: '700px' }"
:enter="{ x: 85, y:80, width: '700px' }"
:click-1="{ x: 0, y:80, width: '400px'}"
z='1'
/>
<div
v-motion
:initial="{ x: 85, y: 410, width: '700px' }"
:enter="{ x: 85, y: 410, width: '700px' }"
:click-1="{ x: 0, y: 280, width: '400px'}"
flex="~ justify-around"
>
<span text-xs text-red>
Indoor Light
</span>
<span text-xs text-red>
Light Off
</span>
</div>
<h3
absolute
text-center
v-motion
:initial="{ x: 85, bottom: 50, width: '700px' }"
:enter="{ x: 85, bottom: 50, width: '700px' }"
:click-1="{ x: 0, bottom: 100, width: '430px'}"
>
  将透明膜作为指环用于自发光照明指示
</h3>
</template>
<template v-slot:right>
<img
src="/24-2.png"
w="1/3"
absolute
v-motion
:initial="{ x: 100, y: 80, opacity: 0, width: 300 }"
:enter="{ x: 100, y: 80, opacity: 0, width: 300 }"
:click-1="{ x: 100, y: 80, opacity: 1, width: 300 }"
:click-3="{ x: 20, y: 80, opacity: 1, width: 200 }"
z='1'
/>
<span
absolute
v-motion
:initial="{ x: 240, bottom: 110, opacity: 0 }"
:enter="{ x: 240, bottom: 110, opacity: 0 }"
:click-1="{ x: 240, bottom: 110, opacity: 1 }"
:click-2="{ x: 240, bottom: 110, opacity: 0 }"
:click-3="{ x: 100, bottom: 210, opacity: 1, width: 200 }"
text-xs
text-red
>
Light off
</span>
<img
src="/24-3.png"
w="1/3"
absolute
v-motion
:initial="{ x: 100, y: 80, opacity: 0, width: 300 }"
:enter="{ x: 100, y: 80, opacity: 0, width: 300 }"
:click-2="{ x: 100, y: 80, opacity: 1, width: 300 }"
:click-3="{ x: 250, y: 80, opacity: 1, width: 200 }"
z='1'
/>
<span
absolute
v-motion
:initial="{ x: 200, bottom: 110, opacity: 0 , width: 200 }"
:enter="{ x: 200, bottom: 110, opacity: 0 , width: 200 }"
:click-2="{ x: 200, bottom: 110, opacity: 1, width: 200 }"
:click-3="{ x: 290, bottom: 210, opacity: 1, width: 200 }"
text-xs
text-red
>
Light off after 10 hours
</span>
<h3
absolute
text="center"
v-motion
:initial="{ x: 140, bottom: 50, opacity: 0 , width: 250 }"
:enter="{ x: 140, bottom: 50, opacity: 0 , width: 250 }"
:click-1="{ x: 140, bottom: 50, opacity: 1, width: 250 }"
:click-3="{ x: 120, bottom: 100, opacity: 1, width: 250 }"
>
  夜间自发光信息储存
</h3>
</template>

---
clicks: 3
class: 'p-0'
---

<img
src="/25-bg.png"
absolute
inset="0"
v-motion
:initial="{ x: 0  }"
:enter="{ x: 0 }"
:click-1="{ x: -500 }"
transition="ease-out"
duration="1300"
/>

<div
absolute
inset="0"
v-motion
:initial="{ x: 0, opacity: 0  }"
:enter="{ x: 0, opacity: 0  }"
:click-1="{ x: -500, opacity: 1  }"
transition="ease-out"
duration="1300"
bg="#11005580"
/>
<img
src="/25-2.png"
absolute
inset="0"
v-motion
:initial="{ x: 0  }"
:enter="{ x: 0 }"
:click-1="{ x: 500 }"
transition="ease-out"
duration="1300"
/>
<img
src="/25-4.png"
absolute
v-motion
w="180"
:initial="{ x: 80, y: -20  }"
:enter="{ x: 80, y: -20  }"
:click-1="{ x: 580, y: -20  }"
transition="ease-out"
duration="1300"
class="[filter:drop-shadow(20px_20px_20px_rgba(26,202,47,1))]"
/>
<!-- 左侧文案 -->
<div
absolute
v-motion
:initial="{ x: -1000  }"
:enter="{ x: -1000  }"
:click-1="{ x: 0  }"
transition="ease-out"
duration="1300"
w="110"
bg="#79848960"
p="5"
rounded-lg
flex="~ items-center justify-between"
text-white
>
<mdi-currency-usd-off text-5xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
发光篷布​​能耗极低​​且寿命长、维护频率低，长期使用能大幅压缩“照明+传统篷布”的综合成本
</span>
</div>
<div
absolute
v-motion
top="54"
:initial="{ x: -1000  }"
:enter="{ x: -1000  }"
:click-2="{ x: 0  }"
transition="ease-out"
duration="1300"
w="110"
bg="#79848960"
text-white
p="5"
rounded-lg
flex="~ items-center justify-between"
>
<mdi-safety-goggles text-5xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
发光篷布本身就是一盏柔和的大面光源。
夜间装卸时，它既满足了现场作业的基本照明，又避免了传统强光灯的眩光和扰民问题
</span>
</div>
<div
absolute
top="100"
v-motion
:initial="{ x: -1000  }"
:enter="{ x: -1000  }"
:click-3="{ x: 0  }"
transition="ease-out"
duration="1300"
w="110"
bg="#79848960"
text-white
p="5"
rounded-lg
flex="~ items-center justify-between"
>
<mdi-racing-helmet text-5xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
夜间无照明路段、暴雨雾天等低可视环境，大幅提升自身被其他车辆、行人“主动发现”的概率，从源头减少碰撞、剐蹭等交通事故风险
</span>
</div>

---
clicks: 3
---

<h3 text-center>柔性大面积多色长余辉纤维膜在建筑修饰中的应用</h3>
<!-- <img
src="/26-1.jpeg"
absolute
inset="0"
v-motion
:initial="{ x: 0  }"
:enter="{ x: 0 }"
:click-1="{ x: 500 }"
transition="ease-out"
duration="1300"
/> -->
<img
src="/26-2.jpeg"
absolute
inset="0"
v-motion
:initial="{ x: 0  }"
:enter="{ x: 0 }"
:click-1="{ x: 0 }"
transition="ease-out"
duration="1300"
/>

<div
absolute
v-motion
:initial="{ x: -36, y: 500  }"
:enter="{ x: -36,y: 500  }"
:click-1="{ x: -36,y: 390  }"
w="68"
bg="#79848960"
p="5"
rounded-lg
flex="~ items-center justify-between"
style="transform: skew(-12deg)"
text-white
>
<span class="text-xs">
户外发光步道
<br/>
在广场、公园铺设，营造梦幻互动夜景及安全指引功能，有效吸引人流，提升商业价值
</span>
</div>
<div
absolute
v-motion
:initial="{ x: 240, y: 500  }"
:enter="{ x: 240,y: 500  }"
:click-2="{ x: 240,y: 390  }"
w="91"
bg="#79848960"
style="transform: skew(-12deg)"
p="5"
rounded-lg
flex="~ items-center justify-between"
text-white
>
<span class="text-xs">
室内墙面装饰
<br />
贴合墙面与天花板，为KTV、展厅等空间营造如极光般绚烂的沉浸式氛围，提升空间的艺术感与科技感
</span>
</div>
<div
absolute
v-motion
:initial="{ x: 610, y: 500  }"
:enter="{ x: 610,y: 500  }"
:click-3="{ x: 610,y: 390  }"
w="88"
bg="#79848960"
p="5"
rounded-lg
flex="~ items-center justify-between"
style="transform: skew(-12deg)"
text-white
>
<span class="text-xs">
发光艺术装置
<br />
结合花坛、雕塑等打造夜晚的视觉焦点，创造“网红打卡点”，吸引游客拍照传播，迅速提升项目人气
</span>
</div>

---
clicks: 2
---

<img
src="/27.png"
absolute
v-motion
:initial='{ x: "200px", y: 180, width: "100px" }'
:enter='{ x: "310px",y: 155, width: "650px" }'
:click-1='{ x: "465px",y: 240, width: "500px" }'
transition="ease-out"
duration="1300"
z="12"
/>

<span
class="text-xs"
absolute
v-motion
:initial="{ x: 600, y: 200,opacity: 0  }"
:enter="{ x: 600, y: 200,opacity: 1  }"
:click-1='{ opacity: 0 }'
transition="ease-out"
duration="1300"
p="x-5 y-2"
z="13"
rounded-lg
text-white
flex="~ items-center justify-between">
Multicolor rare-earth ultra-long afterglow film
</span>
<span
class="text-xs"
absolute
v-motion
:initial="{ x: 600, y: 220,opacity: 0  }"
:enter="{ x: 600, y: 220,opacity: 1  }"
:click-1='{ opacity: 0 }'
transition="ease-out"
duration="1300"
p="x-5 y-2"
z="13"
rounded-lg
text-white
flex="~ items-center justify-between">
政策相关：符合国家"新材料十四五规划"重点发展方向
</span>

<div
absolute
v-motion
:initial="{ x: -1000, y: -36  }"
:enter="{ x: -1000,y: -36  }"
:click-1="{ x: -20,y: -36  }"
w="1/2"
h="1/2"
bg="#31462e"
transition="ease-out"
duration="1300"
z="11"
text-xs
flex="~ items-center"
p="l-2"
text-white
>
核心优势
</div>

<!-- 核心优势 -->
<div
absolute
v-motion
:initial="{ x: -1000, y: -20  }"
:enter="{ x: -1000, y: -20  }"
:click-1="{ x: 50, y: -20  }"
transition="ease-out"
duration="1300"
bg="#79848960"
p="x-5 y-2"
z="12"
rounded-lg
text-white
flex="~ items-center justify-between"
>
<mdi-sun-time text-4xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
30小时余辉​​：全球首个 实现米级连续生产的自发光材料
</span>
</div>
<div
absolute
v-motion
:initial="{ x: -1000, y: 75  }"
:enter="{ x: -1000, y: 75  }"
:click-1="{ x: 50, y: 75  }"
transition="ease-out"
duration="1300"
bg="#79848960"
p="x-5 y-2"
z="12"
rounded-lg
text-white
flex="~ items-center justify-between"
>
<mdi-shield-sun text-4xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
光能循环​​：70 米车灯光捕获能力（隧道照明节能 60%）
</span>
</div>
<div
absolute
v-motion
:initial="{ x: -1000, y: 165  }"
:enter="{ x: -1000, y: 165  }"
:click-1="{ x: 50, y: 165  }"
transition="ease-out"
duration="1300"
bg="#79848960"
p="x-5 y-2"
z="12"
rounded-lg
text-white
flex="~ items-center justify-between"
>
<mdi-regenerative-agriculture text-4xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
农业革命​​：红光补偿使小麦叶绿素提升 39.4%
</span>
</div>
<!-- 商业化路径​​ -->
<div
absolute
v-motion
:initial="{ x: -1000, y: 240  }"
:enter="{ x: -1000,y: 240  }"
:click-2="{ x: -20,y: 240  }"
w="1/2"
h="1/2"
bg="#293e6a"
transition="ease-out"
duration="1300"
text-xs
flex="~ items-center"
p="l-2"
text-white
>
商业化路径​​
</div>

<div
absolute
v-motion
:initial="{ x: -1000, y: 255  }"
:enter="{ x: -1000, y: 255  }"
:click-2="{ x: 50, y: 255  }"
transition="ease-out"
duration="1300"
bg="#79848960"
p="x-5 y-2"
z="12"
text-white
rounded-lg
flex="~ items-center justify-between"
>
<mdi-handshake text-4xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
战略合作：已与 中铁建 达成隧道照明试点协
</span>
</div>
<div
absolute
v-motion
:initial="{ x: -1000, y:350  }"
:enter="{ x: -1000, y:350  }"
:click-2="{ x: 50, y:350  }"
transition="ease-out"
duration="1300"
bg="#79848960"
p="x-5 y-2"
z="12"
rounded-lg
text-white
flex="~ items-center justify-between"
>
<mdi-checkbox-marked-circle-auto-outline text-4xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
首年落地场景：消防警示服（单价￥200/㎡，毛利率 65%）
</span>
</div>
<div
absolute
v-motion
:initial="{ x: -1000, y: 445  }"
:enter="{ x: -1000, y: 445  }"
:click-2="{ x: 50, y: 445  }"
transition="ease-out"
duration="1300"
bg="#79848960"
p="x-5 y-2"
z="12"
rounded-lg
text-white
flex="~ items-center justify-between"
>
<mdi-sun-protection text-4xl flex-shrink="0" class="text-gray-400 mx-2" />
<span class="text-xs">
技术延展：X-ray屏蔽效率 99.8%（医疗/核电防护蓝海市场）
</span>
</div>

<div class="gradient-circle" absolute top="-50" left="40" z="11"></div>

<style>
  .gradient-circle {
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      #000000 0%,
      #000000 40%,
      #121826 60%
    );
  }
</style>

---
theme: default
image: './last-bg.jpg'
layout: image
title: 长余辉自发光材料
---

<div class="pt-12" text-center>
  <span class="px-2 py-1 rounded">
        ​从实验室纳米发光颗粒到商用自发光膜，重新定义发光材料的边界。
  </span>
</div>
<div class="pt-15" text-center>
  <span class="px-2 py-1 rounded">
        谢谢！
  </span>
</div>
<QRCode
  absolute
  right-0
  :width="250"
  :height="250"
  type="svg"
  data="https://u.wechat.com/ENlWXIR-iMEhMaamDD7FI0Q?s=4"
  :margin="30"
  :dotsOptions="{ type: 'classy', color: '#0bc4d5ff', shape: 'circle' }"
/>
