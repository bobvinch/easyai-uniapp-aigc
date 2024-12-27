<template>
  <BaseLayout>
    <!--    首页-->
      <Home/>
  </BaseLayout>
</template>

<script setup lang="ts">

import BaseLayout from "@/layouts/BaseLayout.vue";
import Home from "@/pages/home/home.vue";
import Creative from "@/pages/creative/creative.vue";
import TaskExcuting from "@/components/common/TaskExcuting.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";

import History from "@/pages/history/history.vue";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/appStore.ts";
import {EventType} from "@/types/event.types.ts";
import {on} from "@/utils/emitter.ts";
import PaymentPopup from "@/components/home/PaymentPopup.vue";

const {tabbarIndex} = storeToRefs(useAppStore())



</script>