<template>
  <view class="flex">
    <image class="w-20 h-20" src="/static/logo.png" />
    <view class="text-area">
      <text class="text-red-500 text-3xl font-bold underline">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
</script>

<style></style>
