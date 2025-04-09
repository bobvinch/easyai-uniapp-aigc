<script setup lang="ts">
import { ref } from 'vue'
import MyTitle from "@/components/common/MyTitle.vue";
import ParamCard from "@/components/common/ParamCard.vue";
import type {IDynamicOptions} from "@/types";
const sliderValue = defineModel({
  default: 512,
})


interface Props {
  title?: string
  options?:IDynamicOptions
}


const props= withDefaults(defineProps<Props>(), {
  title: '选择大小',
  options:{
    min:512,
    max:1024,
    step:8
  }
})

console.log(props.options,typeof props.options)





</script>


<template>
  <ParamCard>
    <template #title>
      <MyTitle :title="title"></MyTitle>
    </template>
    <template #body>
      <up-slider
          showValue
          v-model="sliderValue"
          :step="options.step"
          :min="options.min"
          :max="options.max"></up-slider>
    </template>
  </ParamCard>
</template>

<style scoped lang="scss">

</style>