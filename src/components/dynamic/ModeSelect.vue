<script setup lang="ts">

import Picker from "@/components/dynamic/Picker.vue";
import { ref } from "vue";
import {getModelListByWorkflowId} from "@/composables/useWorkFlow.ts";
import type {IDynamicOptions} from "@/types";
interface Props{
  title?:string;
  workflow_id:string
  options?:IDynamicOptions
}

const props = withDefaults(defineProps<Props>(),{
  workflow_id:"",
  title:"选择大模型",
  options:{}
})


const selectValue=defineModel()

const modelList =ref<string[]>([])
const handleInitData=async ()=>{
  if(!props.workflow_id){
    return
  }
  const result = await getModelListByWorkflowId(props.workflow_id)
  if(result){
    modelList.value=result
  }
}

handleInitData()



</script>

<template>
<Picker
    :title="title"
    v-model="selectValue"
    :options="modelList"/>
</template>

<style scoped lang="scss">

</style>