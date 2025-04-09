<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'

import TnWaterFall from '@tuniao/tnui-vue3-uniapp/components/water-fall/src/water-fall.vue'
import { request } from '@/utils/request.ts'
import type { IDrawHistoryItem } from '@/types'
import TnGraphicCard from 'tnuiv3p-tn-graphic-card/index.vue'
import MyGraphicCard from '@/components/custom/MyGraphicCard/MyGraphicCard.vue'
import { formatDateTime } from '@/utils/common.ts'

onMounted(() => {
  getTestImageData()
})

onUnmounted(() => {
  //   销毁当前组件
  imageData.value = []
})

const getTestImageData = async () => {
  imageData.value = await request<IDrawHistoryItem[]>('draw/history/findMany', {
    method: 'POST',
    data: {
      history: {
        is_deleted: false,
        is_public: true,
      },
    },
  })
}
const imageData = ref<IDrawHistoryItem[]>([])

/**图文卡片展示的数据 */
const graphicDatas = computed(() => {
  return imageData.value.map(item => {
    return {
      id: item._id,
      avatar: item.user_id?.avatar_url || '',
      username: item.user_id?.nickname || item.user_id?.username,
      title: item.options?.workflow_title,
      description: formatDateTime(new Date(item.created_at)),
      tags: item.tags,
      content: item.params?.positive?.slice(0, 120) || '' + '...',
      images: (() => {
        // 生成参数
        const inputImages = []
        for (const key in item.params) {
          if (key.startsWith('image_path') && item.params[key]) {
            inputImages.push(item.params[key])
          }
        }
        if (!item.output) {
          return inputImages
        }
        return [...inputImages, ...item.output]
      })(),
      commentCount: item.comment?.length,
    }
  })
})

console.log('graphicDatas:', graphicDatas)

// const graphicData = {
//   id: 1,
//   avatar: 'https://tnuiimage.tnkjapp.com/uniapp_market/circle/3-image.jpg',
//   title: '文章标题',
//   description: '2023年6月30日',
//   tags: ['标签1', '标签2'],
//   content:
//       '看看打开打开年份记得当年开始放假哦额外欺骗人u饿哦漂亮放佛怕打雷舒服呢我脾气破费了发多少呢；否，可能打飞机哦喷泉哦怕可能地方打开螺丝粉年份的肌肤看能否。',
//   images: [
//     'https://tnuiimage.tnkjapp.com/swiper/ad1.jpg',
//     'https://tnuiimage.tnkjapp.com/swiper/ad2.jpg',
//     'https://tnuiimage.tnkjapp.com/swiper/ad3.jpg',
//     'https://tnuiimage.tnkjapp.com/swiper/ad4.jpg',
//   ],
//   viewCount: 100,
//   commentCount: 101,
//   likeCount: 102,
//   viewUserAvatars: [
//     'https://tnuiimage.tnkjapp.com/avatar/normal/1.png',
//     'https://tnuiimage.tnkjapp.com/avatar/normal/2.png',
//     'https://tnuiimage.tnkjapp.com/avatar/normal/3.png',
//     'https://tnuiimage.tnkjapp.com/avatar/normal/4.png',
//     'https://tnuiimage.tnkjapp.com/avatar/normal/5.png',
//     'https://tnuiimage.tnkjapp.com/avatar/normal/6.png',
//     'https://tnuiimage.tnkjapp.com/avatar/normal/7.png',
//     'https://tnuiimage.tnkjapp.com/avatar/normal/8.png',
//   ],
// }
</script>

<template>
  <BaseLayout>
    <view>
      <up-status-bar />
      <template v-for="graphicData in graphicDatas">
        <MyGraphicCard
          :avatar="graphicData.avatar"
          :title="graphicData.title"
          :username="graphicData.username"
          :description="graphicData.description"
          :tags="graphicData.tags"
          :content="graphicData.content"
          :images="graphicData.images"
          :view-count="graphicData.viewCount"
          :comment-count="graphicData.commentCount"
          :like-count="graphicData.likeCount"
          :view-user-avatars="graphicData.viewUserAvatars"
        ></MyGraphicCard>
      </template>
    </view>

    <!--    <TnWaterFall :data="imageData" mode="calc">-->
    <!--      <template #left="{ item }">-->
    <!--        <view class="image-data">-->
    <!--          <image class="image" :src="item.output[0]" mode="widthFix" />-->
    <!--        </view>-->
    <!--      </template>-->
    <!--      <template #right="{ item }">-->
    <!--        <view class="image-data">-->
    <!--          <image class="image" :src="item.output[0]" mode="widthFix" />-->
    <!--        </view>-->
    <!--      </template>-->
    <!--    </TnWaterFall>-->
  </BaseLayout>
</template>

<style scoped lang="scss">
.image-data {
  width: calc(100% - 20rpx);
  margin: 10rpx;
  .image {
    width: 100%;
    height: auto;
  }
}
</style>
