/**
 * 通用动画配置
 */
export const animationConfig = {
  // 默认动画持续时间
  defaultDuration: 500,
  
  // 常用缓动函数
  easing: {
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // 预设动画
  presets: {
    slideIn: (direction = 'right') => ({
      initial: { x: direction === 'right' ? 1000 : -1000, y: 0 },
      enter: { x: 0, y: 0 },
      transition: 'ease-out',
      duration: 800
    }),
    
    fadeIn: (delay = 0) => ({
      initial: { opacity: 0 },
      enter: { opacity: 1 },
      transition: 'ease-out',
      duration: 600,
      delay
    }),
    
    scaleIn: () => ({
      initial: { scale: 0, opacity: 0 },
      enter: { scale: 1, opacity: 1 },
      transition: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      duration: 700
    })
  }
}

/**
 * 文本高亮配置
 */
export const highlightConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    danger: '#ef4444'
  },
  
  animations: {
    typewriter: 'typewriter 2s steps(40, end)',
    highlight: 'highlight 0.8s ease-out forwards'
  }
}