<template>
  <BaseLayout>
    <view class="main-container">
      <!--首页轮播图-->
      <TnTitle title="上传图片" mode="vLine" />

      <TnTitle title="提示词" mode="vLine" />
      <up-textarea v-model="value1" placeholder="请输入提示词" />
    </view>
    <GetUserInfoPopup />
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GetUserInfoPopup from '@/components/GetUserInfoPopup.vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'

import { useAppStore } from '@/stores/appStore.ts'
import { ref } from 'vue'

const title = 'EasyAI'
const value1 = ref('22222222222222222')

const { toggleShowExecuting } = useAppStore()
const handleSubmitTask = async () => {
  const userinfo = await uni.getUserInfo()
  console.log('userinfo', userinfo)
  // 请求登录
  uni.login({
    provider: 'weixin',
    success: res => {
      console.log(res)
    },
    fail: err => {
      console.log(err)
    },
  })
  console.log(value1.value)
  toggleShowExecuting()
}
</script>

<style scoped lang="scss">
.main-container {
  padding: 4px;
}
.content {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
