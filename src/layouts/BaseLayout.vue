<script setup lang="ts">
import TaskExcuting from '@/components/common/TaskExcuting.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import PaymentPopup from '@/components/home/PaymentPopup.vue'
import MyBackToTop from '@/components/common/MyBackToTop.vue'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'
const { showPay } = storeToRefs(useAppStore())
import { useAppStore } from '@/stores'

onLoad(options => {
  console.log('App onLoad,options is:', options)
  if (options?.inviteCode) {
    useAppStore().setInviteCode(options.inviteCode)
  }

  // on(EventType.AUTH_LOGOUT,()=>{
  //   console.log('退出登录事件')
  // })
})
</script>

<template>
  <view class="baseLayoutContainer">
    <slot></slot>
    <BottomNavigation />
    <TaskExcuting />
    <PaymentPopup v-if="showPay" />
    <MyBackToTop />
  </view>
</template>

<style scoped lang="scss">
.baseLayoutContainer {
}
</style>
