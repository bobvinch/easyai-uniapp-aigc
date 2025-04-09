<script setup lang="ts">

import CustomSlider from "@/components/dynamic/CustomSlider.vue";

const modelValue=defineModel({
  default:512
})


</script>

<template>
    <CustomSlider v-model="modelValue" title="高度"/>
</template>

<style scoped lang="scss">

</style>