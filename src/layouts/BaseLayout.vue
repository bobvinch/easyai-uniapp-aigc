<script setup lang="ts">


import TaskExcuting from "@/components/common/TaskExcuting.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
import PaymentPopup from "@/components/home/PaymentPopup.vue";
import MyBackToTop from "@/components/common/MyBackToTop.vue";



</script>

<template>
  <view class="baseLayoutContainer">
    <slot></slot>
    <BottomNavigation/>
    <TaskExcuting/>
    <PaymentPopup/>
    <MyBackToTop/>
  </view>
</template>

<style scoped lang="scss">
.baseLayoutContainer{
}

</style>