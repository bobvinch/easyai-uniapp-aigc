<script setup lang="ts">
import {computed, onMounted, ref, watch, watchEffect} from 'vue';
import TnWaterFall from "@tuniao/tnui-vue3-uniapp/components/water-fall/src/water-fall.vue";
import {useAppStore} from "@/stores/appStore.ts";
import {storeToRefs} from "pinia";
import {isVideo} from "@/utils/common.ts";
import type { IWorkFlow } from '@/types';


onMounted(() => {
  useAppStore().initWorkFlows_All().then(()=>getshowApps())

})
const {workflows_all, home_tagActiveIndex, home_tagsList} = storeToRefs(useAppStore())
// 获取所有的媒体尺寸

const waterfallElement=ref()

const showApps=ref<IWorkFlow[]>()
const getshowApps = ()=>{
  console.log('home_tagActiveIndex', home_tagActiveIndex.value)
  if (home_tagActiveIndex.value === 0) {
    showApps.value= [...workflows_all.value]
    return
  }
  // 筛选当前标签
  const result = workflows_all.value.filter(item => item.tags?.includes(home_tagsList.value[home_tagActiveIndex.value].name))
  console.log('result', result)
  showApps.value=[...result]
}

watch(home_tagActiveIndex,()=>{

  // showApps.value=[]
  if(waterfallElement.value){
    waterfallElement.value.reset()
  }
  getshowApps()

})

const appStore=useAppStore()
//跳转到指定应用
const handleNavigate = (item: IWorkFlow) => {
  appStore.tabbarIndex=null
  uni.redirectTo({url: '/pages/draw/apps/apps?id=' + item._id});
}
</script>

<template>

<!--  <upwaterfall ref="waterfallElement" v-model="showApps" value="111">-->
<!--    <template v-slot:left="{leftList}">-->
<!--      <view v-for="(item, index) in leftList" :key="index">-->
<!--        &lt;!&ndash; 这里编写您的内容，item为您传递给v-model的数组元素 &ndash;&gt;-->
<!--                <view class="waterfall-data">-->
<!--                  <video class="video" v-if="isVideo(item.cover)"-->
<!--                         autoplay-->
<!--                         loop-->
<!--                         muted-->
<!--                         style="width:100%;"-->
<!--                         object-fit="cover"-->
<!--                         :controls="false"-->
<!--                         :src="item.cover" />-->
<!--                  <image class="image" v-else :src="item.cover" mode="widthFix" />-->
<!--                </view>-->
<!--      </view>-->
<!--    </template>-->
<!--    <template v-slot:right="{rightList}">-->
<!--      <view v-for="(item, index) in rightList" :key="index">-->
<!--        &lt;!&ndash; 这里编写您的内容，item为您传递给v-model的数组元素 &ndash;&gt;-->
<!--                <view class="waterfall-data">-->
<!--                  <video class="video" v-if="isVideo(item.cover)"-->
<!--                         autoplay-->
<!--                         loop-->
<!--                         muted-->
<!--                         style="width:100%;"-->
<!--                         object-fit="cover"-->
<!--                         :controls="false"-->
<!--                         :src="item.cover" />-->
<!--                  <image class="image" v-else :src="item.cover" mode="widthFix" />-->
<!--                </view>-->
<!--      </view>-->
<!--    </template>-->
<!--  </upwaterfall>-->

    <TnWaterFall ref="waterfallElement" :data="showApps">
      <template #left="{ item }">
        <view class="waterfall-data" @click="handleNavigate(item)">
          <video class="video" v-if="isVideo(item.cover)"
                 autoplay
                 loop
                 muted
                 style="width:100%;"
                 object-fit="cover"
                 :controls="false"
                 :src="item.cover" />
          <image class="image" v-else :src="item.cover" mode="widthFix" />
        </view>
      </template>
      <template #right="{ item }">
        <view class="waterfall-data" @click="handleNavigate(item)">
          <video class="video" v-if="isVideo(item.cover)"
                 autoplay
                 loop
                 muted
                 style="width:100%;"
                 object-fit="cover"
                 :controls="false"
                 :src="item.cover" />
          <image class="image" v-else :src="item.cover" mode="widthFix" />
        </view>
      </template>
    </TnWaterFall>

</template>

<style scoped lang="scss">
.waterfall-data {
  width: calc(100% - 20rpx);
  margin: 10rpx;
  border-radius: 15rpx;
  background-color: #f8f8f8;
  box-shadow: #c8c7cc;

  .image {
    width: 100%;
    height: auto;
  }

  .video {
    border-radius: 15rpx;
  }
}
</style>