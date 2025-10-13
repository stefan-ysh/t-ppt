<template>
    <div v-motion :initial="{ x: 0, y: 100, width: '100%' }" :enter="{ x: 0, y: 100 }"
        :click-1="{ x: 0, y: 50, width: '50%' }" :leave="{ x: 0 }" transition="ease-out" duration="500">
        <img src="/1231232.png" z-999 />
        <span v-motion :initial="{ x: 100, y: 100, width: '100%' }" :enter="{ x: 570, y: 180, fontSize: '1rem' }"
            :click-1="{ x: 245, y: 68, fontSize: '0.7rem' }" :leave="{ x: 0 }" transition="ease-out" duration="500" absolute
            top="10" left="20">PFOS</span>
        <span v-motion :initial="{ x: 100, y: 100, width: '100%' }" :enter="{ x: 370, y: 220, fontSize: '1rem' }"
            :click-1="{ x: 140, y: 88, fontSize: '0.6rem' }" :leave="{ x: 0 }" transition="ease-out" duration="500" absolute
            top="10" left="20">CsPbBr3</span>
        <span v-motion :initial="{ x: 50, y: 100, width: '100%' }" :enter="{ x: 380, y: 180, fontSize: '1rem' }"
            :click-1="{ x: 145, y: 68, fontSize: '0.6rem' }" :leave="{ x: 0 }" transition="ease-out" duration="500" absolute
            top="10" left="20">HPβCD cluster</span>
        <span v-motion :initial="{ x: 100, y: 100, width: '100%' }" :enter="{ x: 500, y: 220, fontSize: '1rem' }"
            :click-1="{ x: 205, y: 88, fontSize: '0.6rem' }" :leave="{ x: 0 }" transition="ease-out" duration="500" absolute
            top="10" left="20">CsPbBr3@HPβCD</span>
    </div>
</template>
