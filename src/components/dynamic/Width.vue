<script setup lang="ts">

import CustomSlider from "@/components/dynamic/CustomSlider.vue";
import type { IDynamicOptions } from '@/types';

interface Props{
  title: string;
  options: IDynamicOptions;
}

const props= withDefaults(defineProps<Props>(), {
  title: '宽度',
  options:()=>{
    return {
      min: 256,
      max: 1024,
      step: 64,
      hint: '图片宽度',
    }
  }
})

const modelValue =defineModel({
  default:512
})

</script>

<template>
    <CustomSlider
        v-model="modelValue"
        :title="title"
        :options="options"/>
</template>

<style scoped lang="scss">

</style>