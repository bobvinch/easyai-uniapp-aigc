<script setup lang="ts">
import { ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
// 创建响应式数据 scrollTop
const scrollTop = ref(0);

// onPageScroll 方法来更新 scrollTop 的值
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});
</script>

<template>
  <up-back-top :scroll-top="scrollTop"></up-back-top>
</template>

<style scoped lang="scss">

</style>