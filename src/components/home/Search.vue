<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')

const searchInputEvent = (value: string) => {
   
  console.log('searchInputEvent', value)
}
const searchBtnClickEvent = (value: string) => {
   
  console.log('searchBtnClickEvent', value)
}
</script>

<template>
  <up-search placeholder="搜应用搜创意，一键直达" v-model="searchValue"></up-search>
</template>

<style>
.search{
  margin: 0 5rpx 0 5rpx;
}
</style>