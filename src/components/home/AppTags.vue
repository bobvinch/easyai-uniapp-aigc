<script lang="ts" setup>
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import {computed, ref} from 'vue'
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/appStore.ts";

const {workflows_all,home_tagActiveIndex,home_tagsList} =storeToRefs(useAppStore())
const tabsData = computed(()=>{
  const tagsTemp = [] as {name:string,count:number}[]
  //增加一个全部的标签
  tagsTemp.push({name:'全部',count:0})
  workflows_all.value?.forEach(item => {
    item?.tags.forEach(tas=>{
      //如果tagsTemp中没有该标签，则添加
      if(!tagsTemp.find(tag=>{return tag.name === tas})) {
        tagsTemp.push({name:tas,count:1})
      }else {
        //如果已经存在，则计数加一
        const index = tagsTemp.findIndex(tag=>{return tag.name === tas})
        tagsTemp[index].count++
      }
    })
    //给全部标签计数加一
    tagsTemp[0].count++
  })
  //按照标签计数从大到小排列
  tagsTemp.sort((a,b)=>{return b.count - a.count})
  home_tagsList.value=[...tagsTemp]
  return tagsTemp
})


const handleTabClick=(item)=>{
  console.log(item)
  home_tagActiveIndex.value=item.index
}
</script>

<template>
  <up-tabs :list="tabsData" @click="handleTabClick"></up-tabs>
</template>