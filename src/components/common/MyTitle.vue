<script setup lang="ts">
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'

interface Props{
    title:string;
}
const props = withDefaults(defineProps<Props>(), {
    title: "默认标题"
})



</script>

<template>
  <TnTitle :title="title" mode="vLine"  />
</template>

<style scoped lang="scss">

</style>