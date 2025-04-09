<template>
  <BaseLayout>
    <!--    首页-->
    <Home />
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import Home from '@/pages/home/home.vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { globalAppData } from '@/cofigs'
import { useAppStore } from '@/stores'

// 分享
onShareAppMessage(() => {
  const inviteCode = useAppStore().user.my_invite_code
  // 在页面中定义分享方法
  return {
    title: globalAppData.share.appInfo,
    path: `/pages/index/index?inviteCode=${inviteCode}`
  }
})
// 朋友圈
onShareTimeline(() => {
  const inviteCode = useAppStore().user.my_invite_code
  return {
    title: globalAppData.share.appInfo,
    path: `/pages/index/index?inviteCode=${inviteCode}`
  }
})
</script>
