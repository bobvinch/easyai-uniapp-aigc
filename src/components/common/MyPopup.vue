<script setup lang="ts">
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
const showPopup = defineModel({default:false})
</script>

<template>
  <TnPopup
      style="z-index: 100"
      v-model="showPopup"
      close-btn
      width="100%" height="100%">
    <slot name="default">
      <view class="tn-p-lg"> 弹框内容 </view>
    </slot>
  </TnPopup>
</template>

<style scoped lang="scss">

</style>