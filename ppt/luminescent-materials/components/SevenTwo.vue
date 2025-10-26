<template>
    <div v-motion :initial="{ x: 1350, y: 0 }" :enter="{ x: 1350, y: 0 }" :click-1="{ x: 1350, y: 0 }"
        :click-2="{ x: 560, y: -200 }" transition="ease-out" duration="1000" w="100" z-999 h="20" relative>
        <img src="/shou.png" z-1000 absolute top="0" left="0" bottom="0" right="0" />
        <img src="/image45.GIF" z-999 absolute top="8" left="2" w="66" h="30" />
    </div>
</template>
