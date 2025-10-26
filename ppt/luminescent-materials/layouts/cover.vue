<!-- default.vue -->
<template>
  <div class="slidev-layout-cover cover" dark:bg="gray-900" light:bg="white" p="0">
    <!-- <SlideCurrentNo /> -->

    <slot />
  </div>
</template>
<style scoped>
.slidev-layout-cover.cover {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>