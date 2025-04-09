<template>
  <AppSwiper />

  <up-gap height="10"></up-gap>
  <!--  搜索-->
  <Search />
  <up-gap height="10"></up-gap>
  <AppTags />

  <AppWaterFall />

  <div class="bg-blue"></div>

  <!--  <MaskEditor />-->
</template>
<script setup lang="ts">
import AppSwiper from '@/components/home/AppSwiper.vue'
import Search from '@/components/home/Search.vue'
import AppTags from '@/components/home/AppTags.vue'
import AppWaterFall from '@/components/home/AppWaterFall.vue'
// import MaskEditor from '@/components/editor/maskEditor.vue'
</script>
