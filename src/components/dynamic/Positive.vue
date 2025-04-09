<script setup lang="ts">

import ParamCard from "@/components/common/ParamCard.vue";
import MyTitle from "@/components/common/MyTitle.vue";
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'

const inputValue=defineModel({
  default: ''
})


</script>

<template>
<ParamCard>
  <template #title>
    <MyTitle title="提示词"/>
  </template>
  <template #body>
    <TnInput
        height="150"
        v-model="inputValue"
        type="textarea"
        clearable
        placeholder="请输入内容" />
  </template>
</ParamCard>
</template>

<style scoped lang="scss">

</style>