<script setup lang="ts">
import { provide, reactive } from 'vue'
import { onHide, onLoad, onShareAppMessage, onShareTimeline, onShow } from '@dcloudio/uni-app'
import { useAppStore } from '@/stores/appStore.ts'
import type { SocketState } from '@/types'


onShow(() => {
  console.log('App onShow')
})
onHide(() => {
  console.log('App onHide')
})

// 初始化store
useAppStore().init()

const socketState = reactive<SocketState>({ socket: null, isInitialized: false })
provide<SocketState>('socketState', socketState)

uni.getSystemInfo({
  success: res => {
    console.log('平台信息', res.uniPlatform)
  },
})
</script>

<style lang="css">
/*每个页面公共css */

@import '@tuniao/tn-style/dist/uniapp/index.css';

:root {
  /*    --tn-color-white: #bf9d45 !important; !* 全局变量 *!
    --tn-bg-color: #bf9d45 !important; !* 全局变量 *!
    --tn-gray-light_bg: #bf9d45 !important; !* 全局变量 *!*/
  --primary-color-base: #8ba2da;
  --primary-color-light: #636cd4;
  --primary-color: #4338ca;
}

body,
page {
  --tn-color-primary: #4338ca;
}

.container {
  margin: 0 5rpx 0 5rpx;
  background-color: #f6f7fa;
}

body {
  background: #f6f7fa;
  transition: background 1s ease-in-out; /* 背景颜色的过渡效果 */
  height: 100vh; /* 确保背景覆盖整个页面 */
  margin: 0; /* 去掉默认的外边距 */
}
</style>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';

</style>
