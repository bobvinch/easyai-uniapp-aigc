<script setup lang="ts">
import {ref, reactive, computed} from 'vue';
import ParamCard from "@/components/common/ParamCard.vue";
import MyTitle from "@/components/common/MyTitle.vue";
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import type {IDynamicOptions} from "@/types";
const show = ref(false);

interface Props{
  title?:string
  options?:IDynamicOptions | any[]
}
const props = withDefaults(defineProps<Props>(),{
  title:'请选择',
  options:{
    selectItems:[]
  } as IDynamicOptions
})

/** picker的数据 */
const pickerData = computed(()=> {
  if (!props.options) {
    return []
  }
  //兼容直接拆传入数组
  if (Array.isArray(props.options)){
    //兼容早期设定，传入的是title，value格式
    if(props.options[0] && props.options[0].title){
      return props.options.map(item=>({label:item.title,value:item.value}))
    }
    if(props.options[0] && (typeof props.options[0])!=='object'){
      //直接传入字符串数组
      return props.options.map(item=>({label:item,value:item}))
    }
    return props.options
  }
  //传入items
  if(props.options.selectItems){
    return props.options.selectItems
  }
  return []
})

const selected = defineModel()
const handleConfirm=(item: any)=> {
  console.log('confirm',item)
  if(!item)return
  selected.value = item;
  show.value = false;
}
const handleCancel=(value: any)=> {
  show.value = false;
}


const inputValue = computed(()=>{
  return pickerData.value.find(item =>item.value===selected.value)?.label || ''
})


</script>

<template>
  <ParamCard>
    <template #title>
      <MyTitle :title="title"></MyTitle>
    </template>
    <template #body>
      <view style="display: flex;justify-content: start;align-items: start;">
        <TnInput
            v-model="inputValue"
            type="select"
            style="width: 100%"
            placeholder="请选择"
            @click="show=true"
        />
      </view>


      <TnPicker
          v-model="selected"
          v-model:open="show"
          @cancel="handleCancel"
          :data="pickerData"
          @confirm="handleConfirm"
      />
<!--      <up-picker-->
<!--          :show="show"-->
<!--          :columns="columns"-->
<!--          @cancel="handleCancel"-->
<!--          @confirm="handleConfirm"></up-picker>-->
    </template>
  </ParamCard>
</template>

<style scoped lang="scss">

</style>