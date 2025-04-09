<!--会员信息-->
<script setup lang="ts">
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import {computed, ref, watch} from 'vue'
import type {IMember} from "@/types";
import {getUserVipInfo, isLogin} from "@/composables/useCommon.ts";
import {formatDateTime} from "@/utils/common.ts";
import {onLoad, onReady, onUnload} from "@dcloudio/uni-app";
import {off, on} from "@/utils/emitter.ts";
import {EventType} from "@/types/event.types.ts";

const vipInfo=ref<IMember>()

const handleInit=async () => {
  if(!isLogin.value){
    return
  }
  const res = await getUserVipInfo()
  if(res){
    vipInfo.value=res
  }
}
handleInit()


watch(isLogin,()=>{
  if(isLogin.value){
    handleInit()
  }
})

const userInfor=computed(()=>{
  if(!isLogin.value){
    return null
  }
  return {
    vipName:vipInfo.value?.org_id.name,
    expire_date:formatDateTime(new Date(vipInfo.value?.expire_date),'YYYY-MM-DD')
  }
})

onLoad(()=>{
  // 监听支付成功事件
  on(EventType.PAY_SUCCESS, ()=>{
    handleInit()
  })
})
onUnload(()=>{
  off(EventType.PAY_SUCCESS)
})


</script>

<template>
  <view v-if="vipInfo">
    <slot name="username"></slot>
      <span class="tag" >
    <TnIcon name="vip-diamond" />{{userInfor?.vipName}}
  </span>
  </view>

  <view v-if="vipInfo">
    <span class="tn-text-sm tn-gray_text">有效期{{userInfor?.expire_date}}</span>
  </view>

</template>

<style scoped lang="scss">
.tag{
  background-color: goldenrod;
  color: white;
  padding: 0 20rpx;
  border-radius: 20rpx;
}



</style>