declare module 'vue' {
  export interface GlobalComponents {
    // uview-plus 组件

    'up-gap': (typeof import('uview-plus/components/u-button/u-gap.vue'))['default']
    'up-button': (typeof import('uview-plus/components/u-button/u-button.vue'))['default']
    'up-search': (typeof import('uview-plus/components/u-search/u-search.vue'))['default']
    // ... 其他 uview-plus 组件
  }
}

// 确保 TS 将此文件视为模块
export {}
