<script setup lang="ts">
import {ref, watch} from 'vue'
import {useAppStore} from '@/stores/appStore.ts'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnCircleProgress from '@tuniao/tnui-vue3-uniapp/components/circle-progress/src/circle-progress.vue'
import {storeToRefs} from "pinia";

const {showExecuting} = storeToRefs(useAppStore())
watch(showExecuting,()=>{
  console.log('showExcuting', showExecuting)
})

const progressPercent = ref(30)

</script>
<template>
  <TnPopup v-model="showExecuting"
           v-if="showExecuting"
           width="80%" height="450"
           close-btn
           :overlay-closeable="false">
    <view class="tn-p-lg tn"> 正在绘图中

    </view>
    <view class="tn-flex-center">
      <TnCircleProgress :percent="progressPercent" >
        <text>{{progressPercent}}%</text>
      </TnCircleProgress>
    </view>
  </TnPopup>
</template>

<style scoped lang="scss">

</style>