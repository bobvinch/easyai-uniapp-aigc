<script setup lang="ts">

import TnImageUpload from "@tuniao/tnui-vue3-uniapp/components/image-upload/src/image-upload.vue";

import type {ImageUploadCustomFunction, ImageUploadFile,TnImageUploadInstance} from "@tuniao/tnui-vue3-uniapp";
import {ref, watch} from "vue";
import { uploadFile} from "@/utils/request.ts";
import MyTitle from "@/components/common/MyTitle.vue";
import ParamCard from "@/components/common/ParamCard.vue";
import {onLoad, onReady} from "@dcloudio/uni-app";
import type {IDynamicOptions} from "@/types";


interface Props{
  title?:string
  options?:IDynamicOptions
}

const props = withDefaults(defineProps<Props>(), {
  title: "图像上传",
})


const modelValue =defineModel({
  default:""
})


const imageList = ref<string[]>([])
onReady(()=>{
imageList.value=modelValue.value?[modelValue.value]:[]
})
watch(imageList,()=>{
  console.log("imageList",imageList)
  modelValue.value=imageList.value[0]
})

const uploadFilePromise: ImageUploadCustomFunction = async (file: ImageUploadFile) => {
  const url = (file as UniApp.ChooseImageSuccessCallbackResultFile).path
  return new Promise(async (resolve, reject) => {
    const uploadResult= await uploadFile<string>(url)
    console.log("uploadResult",uploadResult)
    if(uploadResult){
      resolve(uploadResult)
    }
  })
};
const imageUploadRef = ref<TnImageUploadInstance>()
const chooseFile = () => {
  imageUploadRef.value?.chooseFile()
}
</script>

<template>
  <ParamCard>
    <template #title>
      <MyTitle :title="title"/>
    </template>
    <template #body>
      <TnImageUpload
          ref="imageUploadRef"
          v-model="imageList"
          :limit="1"
          :custom-upload-handler="uploadFilePromise"
      >
<!--        <template #uploadBtn>-->

<!--          <view class="upload-new-btn tn-flex-center tn-flex-column" @tap.stop="chooseFile">-->
<!--            <tn-icon name="upload" size="40"></tn-icon>-->
<!--            请上传图片-->
<!--          </view>-->
<!--        </template>-->
<!--        <template #uploadImage="{ data }">-->
<!--          <view class="tn-flex-center" style="max-height: 260px">-->
<!--            <image-->
<!--                class="tn-flex-center-center"-->
<!--                :src="data.url"-->
<!--                mode="widthFix"-->
<!--            />-->
<!--          </view>-->
<!--        </template>-->
      </TnImageUpload>
    </template>

  </ParamCard>

</template>

<style scoped lang="scss">
.upload-new-btn{
  width: 100%;
  height: 300rpx;
  background-color: #f4f5f6;
  border-radius: 10rpx;
}


</style>