<script setup lang="ts">
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import ParamCard from "@/components/common/ParamCard.vue";
import MyTitle from "@/components/common/MyTitle.vue";


const numberValue=defineModel({
  default:1
})
</script>

<template>
<ParamCard>

  <template #title>
    <View style="display: flex;justify-content: space-between;">
      <MyTitle title="图像批次"></MyTitle>
      <TnNumberBox v-model="numberValue" />
    </View>

  </template>

</ParamCard>

</template>

<style scoped lang="scss">


</style>