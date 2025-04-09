<script setup lang="ts">

import TnNavbar from "@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue";
</script>

<template>
<!--  <TnNavbar-->
<!--      :opacity="0.5"-->
<!--      height="45px"-->
<!--      frosted-->
<!--      :bottom-shadow="false"-->
<!--      :safe-area-inset-right="true"></TnNavbar>-->

  <up-navbar-mini
      :autoBack="true"
      homeUrl="/pages/index/index"
  >
  </up-navbar-mini>
</template>

<style scoped lang="scss">

</style>