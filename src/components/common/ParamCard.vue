<script setup lang="ts">

</script>

<template>
<view class="param-card">
  <up-gap height="10"></up-gap>
  <slot name="title"></slot>
  <up-gap height="10"></up-gap>
  <slot name="body"></slot>
</view>
</template>

<style scoped lang="scss">

.param-card {
  border: 2rpx solid #F6F7FA;
  border-radius: 5rpx;
  background-color: #FFFFFF;
  padding: 8rpx;
  margin: 0 8rpx 8rpx 8rpx;
}
</style>