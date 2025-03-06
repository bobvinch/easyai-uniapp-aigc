<template>
  <view class="flex flex-col items-center justify-center space-y-4">
    <image class="w-20 h-20" src="/static/logo.png" />
    <view class="text-area">
      <text class="text-[#00f285] text-[88rpx] font-bold underline">{{ title }}</text>
    </view>
    <view :class="className">
      {{ className }}
    </view>
    <IceButton custom-class="bg-amber-600">
      获取值
    </IceButton>
  </view>
</template>

<script setup lang="ts">
import IceButton from '@/components/IceButton.vue'
import { ref } from 'vue'
const title = ref('Hello')
const className = ref('bg-[#00aa55]')
</script>


