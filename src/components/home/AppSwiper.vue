<script setup lang="ts">
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import {ref, reactive, computed} from 'vue'
import type {IBanner, IMiniProgramContent} from "@/types";
import {getPageContent} from "@/composables/useCommon.ts";
import {onLoad} from "@dcloudio/uni-app";

const currentSwiperIndex = ref(0)

// 轮播图数据
// const swiperData1 = [
//   'https://resource.tuniaokj.com/images/xiongjie/x14.jpg',
//   'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-2.jpg',
//   'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
//   'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
// ]


// const swiperData = reactive([{
//   url: 'https://wangbo0808.oss-cn-shanghai.aliyuncs.com/aidraw/image/temps/ComfyUI_temp_urfvg_00032_.png',
//   title: 'x14',
//   poster: 'https://resource.tuniaokj.com/images/xiongjie/x14.jpg'
// }, {
//   url: 'https://wangbo0808.oss-cn-shanghai.aliyuncs.com/aidraw/image/temps/ComfyUI_temp_alvso_00018_.png',
//   title: 'xiong-3d-2',
//   poster: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-2.jpg'
// }, {
//   url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
//   title: 'xiong-3d-new',
//   poster: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg'
// }, {
//   url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
//   title: 'xiong-3d-new1',
//   poster: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png'
// }])

const pageContent=ref<IMiniProgramContent>()
onLoad(async ()=>{
  pageContent.value=await getPageContent()
})

const swiperData=computed(()=>{
  return pageContent.value?.home_banner.map(item =>{
    return {
      url: item.src,
      title: item.label,
    }
  })
})

</script>

<template>
  <view class="swiper-container">
<!--      <TnSwiper-->
<!--          v-model="currentSwiperIndex"-->
<!--          :data="swiperData1"-->
<!--          autoplay-->
<!--          width="100%"-->
<!--          height="600rpx"-->
<!--      >-->
<!--        <template #default="{ data }">-->
<!--          <view class="swiper-data">-->
<!--            <image class="image" :src="data" mode="aspectFill" />-->
<!--          </view>-->
<!--        </template>-->
<!--      </TnSwiper>-->
    <up-swiper
        :list="swiperData"
        imgMode="aspectFill"
        height="300"
        indicator
        indicatorMode="line"
        circular
        radius="0"
        keyName="url"
        indicatorStyle="bottom"
    ></up-swiper>
  </view>

</template>

<style scoped lang="scss">

</style>