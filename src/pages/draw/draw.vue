<template>
  <BaseLayout>

    <view class="main-container">
      <!--首页轮播图-->
      <TnTitle title="上传图片" mode="vLine"/>


      <TnTitle title="提示词"  mode="vLine"/>
      <up-textarea v-model="value1" placeholder="请输入提示词"/>


    </view>
    <GetUserInfoPopup/>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import AppSwiper from '@/components/home/AppSwiper.vue'

import GetUserInfoPopup from "@/components/GetUserInfoPopup.vue";


import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'
import TnImageUpload from '@tuniao/tnui-vue3-uniapp/components/image-upload/src/image-upload.vue'



// import io from '@hyoga/uni-socket.io';

import {useAppStore} from "@/stores/appStore.ts";
import {ref} from 'vue';

const title = 'EasyAI'
const value1 = ref('22222222222222222')


const {toggleShowExecuting}=useAppStore()
const handleSubmitTask =async () => {
  const userinfo=await uni.getUserInfo()
  console.log("userinfo",userinfo)
  // 请求登录
  uni.login({
    provider: 'weixin',
    success: (res) => {
      console.log(res);
    },
    fail: (err) => {
      console.log(err);
    },
  })
  console.log(value1.value)
  toggleShowExecuting()
}





const agent = ref(false)


import type {
  ImageUploadCustomFunction,
  ImageUploadFile,
} from '@tuniao/tnui-vue3-uniapp'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNlMTljZDRmYTlkODA3ODM4NWM3YzkiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE3MzQyNDQ3NjIsImV4cCI6MTczNDI1MDc2Mn0.vyJ7pBPumT5j6fAW7K2IhpJsxG6iXF7dEemOIYd_2cE'




// socket.on('connect', () => {
//   // ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
//   // 连接建立后，本插件的功能已完成，接下来的操作参考socket.io官方客户端文档即可
//   console.log('ws 已连接');
//   // socket.io 唯一连接id，可以监控这个id实现点对点通讯
//   const {id} = socket;
//   socket.on(id, (message) => {
//     // 收到服务器推送的消息，可以跟进自身业务进行操作
//     console.log('ws 收到服务器消息：', message);
//   });
//   // 主动向服务器发送数据
//   socket.emit('message', {
//     time: +new Date(),
//   });
// });




</script>

<style scoped lang="scss">
.main-container{
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
