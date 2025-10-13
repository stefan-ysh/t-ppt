<template>
  <span 
    :class="cn('inline-block px-2 py-1 rounded-md transition-all duration-300', computedClass)"
    :style="computedStyle"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils/styles'
import { highlightConfig } from '../utils/animation'

interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger'
  animation?: 'none' | 'typewriter' | 'highlight' | 'pulse'
  delay?: number
  duration?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  animation: 'highlight',
  delay: 0,
  duration: 800
})

const computedClass = computed(() => {
  const baseClasses = 'relative overflow-hidden'
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 border border-blue-200',
    secondary: 'bg-green-100 text-green-800 border border-green-200',
    accent: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    danger: 'bg-red-100 text-red-800 border border-red-200'
  }
  
  return cn(baseClasses, variantClasses[props.variant], props.class)
})

const computedStyle = computed(() => ({
  '--delay': `${props.delay}ms`,
  '--duration': `${props.duration}ms`,
  animationDelay: `${props.delay}ms`,
  animationDuration: `${props.duration}ms`
}))
</script>

<style scoped>
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes highlight {
  0% {
    background-size: 0% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* 动画类 */
.animate-typewriter {
  animation: typewriter var(--duration) steps(40, end) var(--delay) forwards;
}

.animate-highlight {
  animation: highlight var(--duration) ease-out var(--delay) forwards;
}

.animate-pulse {
  animation: pulse var(--duration) ease-in-out var(--delay) infinite;
}
</style>