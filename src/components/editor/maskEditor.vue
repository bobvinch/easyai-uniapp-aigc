<template>
  <view class="scratch-container">
    222

    <!--    <image v-if="bgImage" :src="bgImage" class="bg-image" />-->
    <canvas
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      type="2d"
      canvas-id="myCanvas"
      id="myCanvas"
      style="width: 300px; height: 300px"
    />
  </view>
</template>

<script setup lang="ts">
import { onLoad, onReady } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
import { Canvas, type ICanvas, ImagePlugin, MaskPlugin } from '@/editor'

const testImage =
  'https://qnoss.51easyai.com/image/temps/67bec7973d1c1940ed61044a/rKTbgp-ComfyUI_01732_.png'

const canvas = ref<ICanvas<[ImagePlugin, MaskPlugin]>>(null)

const initCanvas = async () => {
  const _canvas = new Canvas({ canvasId: 'myCanvas', width: 300, height: 300 })
  canvas.value = _canvas.use(new ImagePlugin()).use(new MaskPlugin())
  await canvas.value.init()
  await canvas.value.loadImage(testImage)
  // enhanceCanvas.test()
}

const handleTouchStart = (e: any) => {
  const point = {
    x: e.touches[0].x,
    y: e.touches[0].y,
  }
  canvas.value?.handleTouchStart(point)
}

const handleTouchMove = (e: any) => {
  console.log('handleTouchMove', e)
  const point = {
    x: e.touches[0].x,
    y: e.touches[0].y,
  }
  canvas.value?.handleTouchMove(point)
}

const handleTouchEnd = () => {
  canvas.value?.handleTouchEnd()
}
onReady(() => {
  initCanvas()
})
onMounted(() => {
  initCanvas()
})

// 暴露方法给父组件使用
defineExpose({})
</script>

<style>
.scratch-container {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc; /* 添加边框便于调试 */
  position: relative; /* 添加相对定位 */
}

.bg-image {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 确保 canvas 有正确的尺寸 */
#myCanvas {
  width: 100%;
  height: 100%;
}
</style>
