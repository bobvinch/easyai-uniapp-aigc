<script setup lang="ts">
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import ParamCard from "@/components/common/ParamCard.vue";
import MyTitle from "@/components/common/MyTitle.vue";
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import type {IDynamicOptions} from "@/types";
import {generateRandomNumber} from "@/utils/common.ts";
import {onLoad, onReady} from "@dcloudio/uni-app";

const inputValue = defineModel({
  default: 0
})

interface Props {
  title?: string
  options?: IDynamicOptions
}

const props = withDefaults(defineProps<Props>(), {
  title: '随机种子',
  options: {}
})
const getSeed = () => {
  inputValue.value = generateRandomNumber(15)
}
onLoad(() => {
  console.log('Seed page onLoad')
  if (!inputValue.value || inputValue.value === 0) {
    //没有默认值或者默认值为0，才重新获取种子
    getSeed()
  }
})
onReady(()=>{
  console.log('Seed page onReady')
  if (!inputValue.value || inputValue.value === 0) {
    //没有默认值或者默认值为0，才重新获取种子
    getSeed()
  }
})


defineExpose({
  getSeed
})

</script>

<template>
  <ParamCard>
    <template #title>
      <MyTitle :title="title"></MyTitle>
    </template>

    <template #body>
      <TnInput
          type="number"
          v-model="inputValue" placeholder="请输入用户名">
        <template #suffix>
          <TnIcon name="cube" @click="getSeed"/>
        </template>
      </TnInput>
    </template>

  </ParamCard>

</template>

<style scoped lang="scss">

</style>