<script setup lang="ts">

import TnTabbarItem from "@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar-item.vue";
import TnTabbar from "@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar.vue";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/appStore.ts";

const {tabbarIndex}=storeToRefs(useAppStore())

//处理导航栏点击事件
const handleTabbarClick = (index: number) => {
  console.log('index',index)
  tabbarIndex.value=index
  if(tabbarIndex.value===0){
    uni.redirectTo ({
      url:'/pages/index/index'
    })
  }
  else if(tabbarIndex.value===1){
    uni.redirectTo ({
      url:'/pages/creative/creative'
    })
  }else if(tabbarIndex.value===2){
    uni.redirectTo ({
      url:'/pages/setting/setting'
    })
  }
}

// 导航栏数据
const tabbarData = [
  {
    name: '首页',
    icon: 'home',
    activeIcon: 'write-fill',
    to: '/pages/index/index',
    onClick: handleTabbarClick
  },
  {
    name: '创意',
    icon: 'edit-pen',
    activeIcon: 'shop-fill',
    to:'/pages/creative/creative',
    onClick:handleTabbarClick
  },
  {
    name: '我的',
    icon: 'account',
    activeIcon: 'my-circle-fill',
    onClick:handleTabbarClick,
  }
]



const handleChange = (index: number) => {
  console.log(index);
}
const handleClick = (index: number) => {
  console.log('click');
}

</script>

<template>
  <!--  底部导航-->
<!--  <TnTabbar v-model="currentTabbar" fixed @change="handleChange" @click="handleClick">-->
<!--    <TnTabbarItem-->
<!--        @click="handleClick"-->
<!--        v-for="(item, index) in tabbarData"-->
<!--        :key="index"-->
<!--        :icon="item.icon"-->
<!--        :active-icon="item.activeIcon"-->
<!--        :text="item.name"-->
<!--    />-->
<!--  </TnTabbar>-->


  <up-tabbar
      :value="tabbarIndex"
      :fixed="true"
      :placeholder="false"
      :safeAreaInsetBottom="false"
  >
    <template v-for="(item,index) in tabbarData">
      <up-tabbar-item :text="item.name" :icon="item.icon" @click="item.onClick" ></up-tabbar-item>
    </template>
  </up-tabbar>
</template>

<style scoped lang="scss">

</style>