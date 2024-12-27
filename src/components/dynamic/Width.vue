<script setup lang="ts">

import CustomSlider from "@/components/dynamic/CustomSlider.vue";
import type {IDynamicOptions} from "@/types";


interface Props {
  title?: string
  options?:IDynamicOptions
}


const props= withDefaults(defineProps<Props>(), {
  title: '宽度',
  options:{
    min:512,
    max:1024,
    step:8
  }
})

const modelValue =defineModel({
  default:512
})
console.log(111111,props.options)

</script>

<template>
    <CustomSlider
        v-model="modelValue"
        :title="title"
        :options="options"/>
</template>

<style scoped lang="scss">

</style>