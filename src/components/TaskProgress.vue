<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import MyPopup from "@/components/common/MyPopup.vue";
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/appStore.ts";
import {onShow} from "@dcloudio/uni-app";


const currentSwiperIndex = ref(0)
watch(currentSwiperIndex, () => {
  console.log('currentSwiperIndex', currentSwiperIndex.value)
})

const loadingBackground = 'https://static.51easyai.com/comfy/onloading_bg.jpg'

const {localTasks} = storeToRefs(useAppStore())


// 如果任务完成则使用完成的图片，如果任务没有完成则是用loading图片
const swiperData = computed(() => {
  if (localTasks.value.length === 0) {
    return [loadingBackground]
  }
  return localTasks.value.map(item => {
    return item.status === 1 ? item.output[0] : loadingBackground
  })
})

// 当前任务的进度
const currentProgress = computed(() => {
  if (localTasks.value.length === 0) {
    return '暂无任务'
  }
  // 进度更新
  const currentTask = localTasks.value[currentSwiperIndex.value]
  if (currentTask && currentTask.status === 4) {
    return currentTask.progress + '%'
  } else if (currentTask && currentTask.status === 0 && currentTask.queue) {
    return `对列:${currentTask.queue},预计:${currentTask.time_remained}s`
  }
  return ''
})
//当前任务的图片张数
const currentImageCount = computed(() => {
  const currentTask = localTasks.value[currentSwiperIndex.value]
  if (currentTask && currentTask.status === 1) {
    return currentTask.output.length
  } else {
    return 0
  }
})

const showProgress = computed(() => {
  return localTasks.value[currentSwiperIndex.value]?.status !== 1
})

const progressAnimation = ref({}); // 存储动画数据
// 创建动画实例并设置动画效果
const createAnimation = () => {
  const animation = uni.createAnimation({
    duration: 500, // 动画时长
    timingFunction: 'ease', // 动画缓动函数
  });

  // 设置从透明到不透明的动画效果
  animation.opacity(0).step();
  progressAnimation.value = animation.export();
  return animation;
};

function handleChange(index: any) {
  currentSwiperIndex.value = index.current; // 更新当前索引
}

const showPopup = defineModel({
  default: false
})

// 处理触摸开始事件
const handleTouchStart = () => {
  const animation = createAnimation();

  // 在触摸开始时隐藏 progress-container
  animation.opacity(0).step(); // 透明度设置为0
  progressAnimation.value = animation.export(); // 应用动画
};

// 处理触摸结束事件
const handleTouchEnd = () => {
  const animation = createAnimation();

  // 在触摸结束时显示 progress-container
  animation.opacity(1).step(); // 透明度设置为1

  setTimeout(() => progressAnimation.value = animation.export(), 200)
};

const handleFindExecutingTaskIndex = () => {
  return localTasks.value.findIndex(item => item.status === 4)
}

onShow(() => {
  const excIndex = handleFindExecutingTaskIndex()
  console.log('task onshow', excIndex)
  if (excIndex !== -1) {
    currentSwiperIndex.value = handleFindExecutingTaskIndex()
  }
})


const generateParams = computed(() => {
  return localTasks.value[currentSwiperIndex.value]?.params
})

/*保存到相册*/
const handleSave = () => {
  const currentTask = localTasks.value[currentSwiperIndex.value]
  if (currentTask && currentTask.status === 1) {
    saveImage(currentTask.output[0])
  }
}

const handleGotoHistory= () => {
  uni.navigateTo({url: '/pages/history/history'})
}

// 下载网络图片并保存到相册
const saveImage = (url: string) => {
  // 第一步：下载图片
  uni.downloadFile({
    url: url, // 图片的网络地址
    success: (res) => {
      if (res.statusCode === 200) {
        // 第二步：下载成功后，获取本地路径
        const localPath = res.tempFilePath;
        console.log('localPath', localPath);
        // 第三步：保存图片到相册
        uni.saveImageToPhotosAlbum({
          filePath: localPath,
          success: () => {
            uni.showToast({
              title: '图片已保存',
              icon: 'success'
            });
          },
          fail: (error) => {
            uni.showToast({
              title: '保存失败',
              icon: 'none'
            });
            console.error('保存图片失败:', error);
          }
        });
      } else {
        uni.showToast({
          title: '下载失败',
          icon: 'none'
        });
      }
    },
    fail: (error) => {
      uni.showToast({
        title: '下载失败',
        icon: 'none'
      });
      console.error('下载图片失败:', error);
    }
  });
}

/**预览图片 */
const handlePreview = () => {
  const currentTask = localTasks.value[currentSwiperIndex.value]
  if (currentTask && currentTask.status === 1) {
    console.log("preview")
    uni.previewImage({urls: currentTask.output})
  }
}


</script>

<template>
  <MyPopup v-model="showPopup">
    <view style="padding: 200rpx 40rpx 0 40rpx;position: relative;"
          @touchend="handleTouchEnd"
          @touchstart="handleTouchStart">
      <view>
        <up-swiper
            @click="handlePreview"
            @change="handleChange"
            :current="currentSwiperIndex"
            :list="swiperData"
            previousMargin="20"
            nextMargin="20"
            imgMode="aspectFill"
            height="500"
            indicator
            indicatorMode="line"
            circular
            :autoplay="false"
            radius="20"
            keyName="url"
            indicatorStyle="bottom"
        >
        </up-swiper>
        <!--显示图片数量-->
        <view class="image-count">
          <TnIcon style="color: gainsboro;" name="image"></TnIcon>
          <span style="color: gainsboro;margin-left: 3rpx;" class="tn-text-sm">{{currentImageCount}}</span>
        </view>

        <view class="progress-container" v-if="showProgress" :animation="progressAnimation">
          <view class="tn-text-center">
            <TnIcon name="starry" size="100" color="tn-white"/>
          </view>
          <view class="tn-text tn-text-center tn-text-bold tn-white_text">
            {{ currentProgress }}
          </view>
          <view class="tn-text-sm tn-text-center tn-white_text">
            关闭页面不影响生成结果
          </view>
        </view>
      </view>


      <view style="margin-top: 6rpx;">
        <view>
          <TnIcon name="starry" size="50" class="params-icon"/>
          <span class="tn-text ">提示词</span>
        </view>
        <span style="padding: 10rpx;" class="tn-text tn-text-ellipsis-3">{{ generateParams?.positive }}</span>
        <view>
        </view>
      </view>

    </view>
    <!--      底部按钮-->
    <view class="bottom-container">
      <view style="display: flex; ">
        <view class="bottom-icon">
          <tn-icon name="download-simple" size="50rpx" @click="handleSave"></tn-icon>
        </view>
        <view class="bottom-icon">
          <tn-icon name="send" size="50rpx"></tn-icon>
        </view>
      </view>

      <view class="bottom-icon">
        <tn-icon name="right-arrow" size="50rpx" @click="handleGotoHistory"></tn-icon>
      </view>
    </view>
  </MyPopup>

</template>

<style scoped lang="scss">
.progress-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bottom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 40rpx;
  width: 100%;
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
}

.bottom-icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90rpx;
  height: 90rpx;
  color: $u-primary-lighten;
  margin-right: 20rpx;
  background-color: $u-bg-color;
  border-radius: 50%;
  font-size: 70rpx;
  box-shadow: 0 5px 15px rgba(46, 54, 80, .3);
  overflow: hidden; /* 确保水波纹不超出圆形按钮 */
}

.bottom-icon::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.6s, opacity 0.6s;
}

.bottom-icon:active::before {
  transform: scale(4);
  opacity: 1;
}

.params-icon {
  color: gray;
  margin-right: 20rpx;
}

.image-count{
  position: absolute;
  right: 120rpx;
  bottom: 120rpx;
}
</style>