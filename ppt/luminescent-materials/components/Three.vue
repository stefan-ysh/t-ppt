<template>
  <h5 style="margin-bottom:20px;">
    科研团队近三年来发表论文80篇，主流期刊11篇，分布如下：
  </h5>
  <div class="research-slide" style=" padding: 0;" flex="~ row" h="full">
    <!-- 研究方向说明 -->
    <div w="full" flex="~ col" justify="center" relative>
      <h3 style="font-size:1.3rem;" m="t-40">研究方向</h3>
      <div style="margin-bottom:18px;">
        <h5 m="b-4" font="bold">1. 源材料合成</h5>
        <span text="sm">
          聚焦于先进能源材料的合成方法与生长机制，构建智能化材料研发体系，以加速新材料的发现与优化
        </span>
      </div>
      <div>
        <h5 m="b-4" font="bold">2. 光电转化</h5>
        <span text="sm">
          构建从“材料合成-器件集成-系统验证”的一站式研发平台，旨在实现兼具高效稳定、多能互补与轻质柔性等特点的先进光电系统,聚焦能源材料智能化合成、高效光电转化器件开发与电化学储能体系核心技术的研究,推动地区产业化布局、经济发展，服务国家能源转型战略目标
        </span>
      </div>
      <!-- 饼状图部分 -->
      <img src="/chart.png" w="80%" alt="" absolute top="0" right="0" v-motion :initial="{ y: -80 }" :enter="{ x: 0, y: 0 }" duration="1000" transition="ease-out" />
    </div>

  </div>
</template>
