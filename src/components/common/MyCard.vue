<script setup lang="ts">

import CustomSlider from "@/components/dynamic/CustomSlider.vue";

const title = '标题'
const subTitle = '子标题'
const thumb = 'https://img12.360buyimg.com/imagetools/jfs/t1/149875/20/11964/135544/5f7c42a5E6c6ea73d/b93c6e553725ddfb.png'

</script>

<template>
  <up-card :title="title" :sub-title="subTitle" margin="15rpx">
    <template #body>
      <CustomSlider/>
    </template>
    <template #foot>
      <up-button type="primary">操作</up-button>
    </template>
  </up-card>
</template>

<style scoped lang="scss">

</style>