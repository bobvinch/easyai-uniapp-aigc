<script setup lang="ts">
import TnTimeLine from 'tnuiv3p-tn-time-line/time-line.vue'
import TnTimeLineItem from 'tnuiv3p-tn-time-line/time-line-item.vue'
import TnTimeLineData from 'tnuiv3p-tn-time-line/time-line-data.vue'
import TnPhotoAlbum from '@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.vue'
import TnSwitchTab from '@tuniao/tnui-vue3-uniapp/components/switch-tab/src/switch-tab.vue'
import TnLazyLoad from '@tuniao/tnui-vue3-uniapp/components/lazy-load/src/lazy-load.vue'
import {computed, ref} from 'vue'
import { request } from '@/utils/request.ts'
import {formatDateTime} from "@/utils/common.ts";
import type {IDrawHistoryItem} from "@/types";
import BaseLayout from "@/layouts/BaseLayout.vue";
import MyNavbar from "@/components/common/MyNavbar.vue";
import {onLoad, onReady} from "@dcloudio/uni-app";
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'


interface TimeLineData {
  day: string
  icon?: string
  data: IDrawHistoryItem[]
}

interface IHistoryResponse{
  total:number,
  items:IDrawHistoryItem[]
}

onLoad(()=>{
  getHistoryData()
})


const historyData= ref<IDrawHistoryItem[]>([])

// 根据用户获取绘图历史数据
const getHistoryData = async (pageNumber?:number) => {
  const {items}=await request<IHistoryResponse>(`/draw/history/${pageNumber}`)
  historyData.value=items
}
//将获取的数据转换为时间轴数据computed
const timeLineDataComptRef=computed(()=>{
  const tempTimeLineData: TimeLineData[] = []
  historyData.value.forEach(item =>{
  //   从历史数据中去除日期并格式化为2023-07-22
    const date = formatDateTime(new Date(item.created_at as number), 'YYYY-MM-DD')
    // 获取日期对应的数据
    const data = tempTimeLineData.find(i => i.day === date)
    if (data) {
      data.data=[...data.data,item]
    } else {
      tempTimeLineData.push({
        day: date,
        icon: "creative",
        data: [item]
      })
    }
  })
  console.log('tempTimeLineData:', tempTimeLineData)
  return tempTimeLineData.sort((a, b) => {
    return new Date(b.day).getTime() - new Date(a.day).getTime()
  })
})

const PhotoAlbumImages=computed<string[]>(()=>{
  let _imageList=[] as string[]
  historyData.value.forEach(item =>{
    if(item.output){
      _imageList=[..._imageList,...item.output]
    }
  })
  return _imageList
})

const testData=["https://qnoss.51easyai.com/image/temps/6645ef57e981d9abc4e833b4/0yMoXg-ComfyUI_00827_.png"]

const currentTabIndex=ref(0)
const tabs=ref(['时间轴模式','相册模式'])

</script>

<template>
  <BaseLayout>
    <MyNavbar/>
    <view class="main-container">
      <up-status-bar/>
      <up-status-bar/>
      <TnSwitchTab v-model="currentTabIndex" :tabs="tabs">
        <view v-if="currentTabIndex === 0" class="tn-p">
          <view class="content">
            <TnTimeLine>
              <TnTimeLineItem
                  v-for="(item, index) in timeLineDataComptRef"
                  :key="index"
                  :title="item.day"
                  :title-icon="item.icon !== undefined ? item.icon : ''"
              >
                <TnTimeLineData
                    v-for="(dataItem, dataIndex) in item.data"
                    :key="dataIndex"
                >
                  <view>
                    <TnTag type="success" v-if="dataItem.status===1" shape="circle">已完成</TnTag>
                    <TnTag type="danger" v-else-if="dataItem.status===2 || +dataItem.created_at<(Date.now()-3600*24*1000)" shape="circle">任务出错</TnTag>
                    <TnTag type="success" v-else-if="dataItem.status===0" shape="circle">进行中</TnTag>
                    <TnTag type="warning" v-else-if="dataItem.status===3" shape="circle">任务取消</TnTag>
                  </view>

                  <view
                      v-if="dataItem?.output && dataItem.output.length>0"
                      class="time-line__title tn-flex justify-between items-center tn-gray-dark_text"
                  >
                    <view style="width: 100%;height: 100%">
                      <TnPhotoAlbum
                          :data="dataItem.output" :column="dataItem.output.length>4?4:dataItem.output.length" />
                    </view>

                  </view>
                  <view class="time-line__data">
                    {{ dataItem.params?.positive }}
                  </view>
                </TnTimeLineData>
              </TnTimeLineItem>
            </TnTimeLine>
          </view>
        </view>
        <view v-if="currentTabIndex === 1" class="tn-p">
          <view class="content">
            <view class="photo-album">
              <template v-for="item in PhotoAlbumImages">
                <TnLazyLoad width="100%" height="300" :src="item"/>
              </template>
            </view>
          </view>
        </view>
      </TnSwitchTab>
    </view>


  </BaseLayout>
</template>

<style lang="scss" scoped>
.main-container{
  padding:0 10rpx;
}
.content {
  position: relative;
  width: 100%;

  .time-line {
    &__title {
      font-size: 32rpx;
      margin-bottom: 20rpx;
    }
  }
}

.photo-album{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200rpx, 1fr));
  grid-gap: 15rpx;
}
</style>