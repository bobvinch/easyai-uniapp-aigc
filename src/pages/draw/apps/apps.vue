<script setup lang="ts">
import {computed, inject, onMounted, ref, nextTick} from "vue";


import BaseLayout from "@/layouts/BaseLayout.vue";
import useWorkFlow from "@/composables/useWorkFlow.ts";
import ImageUpload from "@/components/dynamic/ImageUpload.vue";
import CustomSlider from "@/components/dynamic/CustomSlider.vue";
import Height from "@/components/dynamic/Height.vue";
import MyCard from "@/components/common/MyCard.vue";
import {onLoad, onReady} from "@dcloudio/uni-app";
import Positive from "@/components/dynamic/Positive.vue";
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import MyTitle from "@/components/common/MyTitle.vue";
import MyNavbar from "@/components/common/MyNavbar.vue";
import Picker from "@/components/dynamic/Picker.vue";
import CustomNumberBox from "@/components/dynamic/CustomNumberBox.vue";
import Width from "@/components/dynamic/Width.vue";
import Seed from "@/components/dynamic/Seed.vue";
import ImageSelectPreview from "@/components/dynamic/ImageSelectPreview.vue";
import type {IComfyUIProperties, IImageSelectItem} from "@/types";
import ModeSelect from "@/components/dynamic/ModeSelect.vue";
import MyPopup from "@/components/common/MyPopup.vue";
import TaskProgress from "@/components/TaskProgress.vue";
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnSuspendButton from 'tnuiv3p-tn-suspend-button/index.vue'
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/appStore.ts";
import {randomId} from "@/utils/common.ts";
import DragButton2 from "@/components/common/DragButton2.vue";

/** 所有的组件 */
const components = {
  ImageUpload,
  CustomSlider,
  Height,
  Positive,
  Picker,
  CustomNumberBox,
  Width,
  Seed,
  ImageSelectPreview,
  ModeSelect
}

/** 参数名称与组件名称的映射 */
export interface ParamToComponentMapping {
  param: keyof IComfyUIProperties
  component: keyof typeof components
  title?: string
}

// 获取页面的query的应用ID

const {
  workflow,
  handleGetWorkFlwById,
  workFlowParamLists,
  bindParam,
  params_component_list,

  socketInit,
  handleFindComponentName,

  handleSubmitTaskTask
} = useWorkFlow()

const workflowId = ref('')

onLoad(async () => {
  const currentPage = getCurrentPages().pop(); // 获取当前页面栈中的最后一个页面
  const query = currentPage?.options; // 获取 query 参数
  workflowId.value = query.id
  handleGetWorkFlwById(query.id).then(() => console.log(workflow.value))
  socketInit()
})


const showPopup = ref(false)


const {localTasks} = storeToRefs(useAppStore())
const currentProgress = computed(() => {
  const excuTask = localTasks.value.find(item => item.status === 4)
  if (!excuTask) {
    return '空闲'
  }
  return excuTask.progress + '%'
})



// 定义动画相关的响应式数据
const endPos = ref({x: 0, y: 0});


const getBoundingClientRectAsync = async (selectQuery: string) => {
  await nextTick(); // 确保 DOM 完全渲染后再执行
  const query = uni.createSelectorQuery();
  return new Promise((resolve, reject) => {
    query.select(selectQuery).boundingClientRect(res => {
      console.log('res',res)
      resolve(res);
    }).exec();
  });
};


const anims = ref<any[]>([]);

const startAnimation = async () => {
  if(seedRef.value && seedRef.value.length>0){
    for(const item of seedRef.value){
      item.getSeed()
    }
  }
  handleSubmitTaskTask()
  const key = randomId(5);
  anims.value.push({
    key,
    id: "addBtn",
    left: 0,
    top: 0,
    y: 0,
    x: 0,
  });
  // 获取点击元素的节点信息

  await nextTick(); // 确保 DOM 完全渲染后再执行
  const submitBtn = uni.createSelectorQuery().select('#submit-btn');
  const cartBtn = uni.createSelectorQuery().select('#cartBtn');

  submitBtn.boundingClientRect().exec((rect) => {
    // console.log('rect',rect)
    // submitBtnCenter.value={x:rect[0].left+rect[0].width/2,y:rect[0].top}
    // //运动物体初始化位置
    // ballTop.value=submitBtnCenter.value.y
    // ballLeft.value=submitBtnCenter.value.x

    //初始化位置
    // 初始化起始位置
    anims.value.some((citem) => {
      if (citem.key === key) {
        citem.top = rect[0].top;
        citem.left = rect[0].left+rect[0].width/2;
        return true;
      }
      return false;
    });
    nextTick(() => {
      // 设置目标位置，目前位置在右侧时需要做处理
      let end={x:0,y:0}
      if(endPos.value.x>300){
        end={x:endPos.value.x-50,y:endPos.value.y}
      }else {
        end={x:endPos.value.x,y:endPos.value.y}
      }
      anims.value.some((citem) => {
        if (citem.key === key) {
          citem.y = end.y-rect[0].top;
          citem.x = end.x-rect[0].left-rect[0].width/2;
          setTimeout(() => { // 等待动画执行完毕移除元素
            anims.value.splice(anims.value.findIndex((v: any) => v.key === key), 1);
          }, 500);
          return true;
        }
        return false;
      });
    });

    })
};

const handToggelePregress=()=>{
  showPopup.value=!showPopup.value
}


// 随机种子操作
const seedRef=ref<any[]>([])


</script>

<template>
  <BaseLayout>
    <MyNavbar/>
    <up-status-bar/>
      <view class="page">
        <view class="container">
          <view class="tn-flex-column tn-text tn-text-center tn-pb-xs">
            {{ workflow.title }}
          </view>
          <template v-for="(item,index) in workFlowParamLists">
            <template v-if="handleFindComponentName(item.name)==='Seed'">
              <Seed
                  ref="seedRef"
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='ImageUpload'">
              <ImageUpload
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='Width'">
              <Width
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='Height'">
              <Height
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='Positive'">
              <Positive
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='ModeSelect'">
              <ModeSelect
                  :title="item.title"
                  :workflow_id="workflow._id"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='Picker'">
              <Picker
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='CustomNumberBox'">
              <CustomNumberBox
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>
            <template v-else-if="handleFindComponentName(item.name)==='ImageSelectPreview'">
              <ImageSelectPreview
                  :title="item.title"
                  v-model="bindParam[item.name]"
                  :options="item.attributes"
              />
            </template>


          </template>
          <TaskProgress v-if="showPopup" v-model="showPopup"/>
          <!--        <ModeSelect :workflow_id="workflow._id"/>-->

          <!--        <ImageUpload/>-->
          <!--        <CustomSlider/>-->
          <!--        <Width/>-->
          <!--        <Height/>-->
          <!--        <Positive/>-->
          <!--        <Picker/>-->
          <!--        <CustomNumberBox/>-->
          <!--        <Seed/>-->
          <!--        <ImageSelectPreview title="选择Lora" :options="{-->
          <!--          imageSelectItems:images-->
          <!--        }"/>-->
          <view id="submit-btn" class="floating-button">
            <up-button
                icon="edit-pen"
                class="submit-button"
                @click="startAnimation"
                type="primary" shape="circle">开始创作
            </up-button>
          </view>

          <view
              v-for="item in anims" :key="item.key"
              style="position: fixed; transition: transform 0.5s linear;"
              :style="{
        top: `${item.top}px`,
        left: `${item.left}px`,
        transform: `translate(${item.x}px, ${item.y}px)`,
      }"
              class="add-icon"
              id="addBtn">
            <tn-icon name="rocket" size="40rpx"></tn-icon>
          </view>
        </view>
        <!--      加号按钮-->


      </view>
    <DragButton2 v-model="endPos" >
      <view class="content-default" id="cartBtn" @click="handToggelePregress">
        {{currentProgress}}
      </view>
    </DragButton2>
  </BaseLayout>
</template>

<style scoped lang="scss">
/* 页面样式 */
.page {
  position: relative;
  min-height: 100vh; /* 确保页面内容撑满屏幕 */
}

.container {
  position: relative;
  padding-top: 80rpx; /* 顶部导航栏的高度 + 小间距 */
  padding-bottom: 120px; /* 底部导航栏的高度 + 小间距 */
}

/* 居中按钮样式 */
.floating-button {
  width: 80%;
  position: fixed;
  bottom: 70px; /* 底部导航栏的高度 + 小间距 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10; /* 确保按钮在底部导航栏上方 */
}

.submit-button {
  background: linear-gradient(to right, $u-primary-lighten, $u-primary);
  border-radius: 50px;
  box-shadow: 0 3px 5px var(--primary-color-light);
}


.cart {
  position: absolute;
  top: 50px;
  right: 30px;
  background-color: #f0f0f0;
  padding: 10px;
}

.add-icon {
  position: absolute;
  background-color: $u-primary;
  color: white;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  animation: moveAnimation 1s ease-in-out forwards;
}
.content-default{
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(360deg, $u-primary-lighten 0%, $u-primary 100%);
  box-shadow: 0 4rpx 12rpx 0 #ADC3F8;
  border-radius: 50rpx;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: verticalMove 2s ease-in-out infinite;
}
/* 上下移动动画 */
@keyframes verticalMove {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);  /* 上移 */
  }
  100% {
    transform: translateY(0);  /* 恢复到原位 */
  }
}
</style>