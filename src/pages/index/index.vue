<template>
  <BaseLayout>
    <!--    首页-->
      <Home/>
  </BaseLayout>
</template>

<script setup lang="ts">

import BaseLayout from "@/layouts/BaseLayout.vue";
import Home from "@/pages/home/home.vue";

import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

// 分享
onShareAppMessage(()=>{
  return {
    title:'这款全民使用的AI程序，简直好用到爆炸',
    path:'/pages/index/index'
  }
})
// 朋友圈
onShareTimeline(() => {
  return {
    title:'这款全民使用的AI程序，简直好用到爆炸',
    path:'/pages/index/index'
  }
})

</script>