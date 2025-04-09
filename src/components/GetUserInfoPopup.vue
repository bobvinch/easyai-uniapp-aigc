<script setup lang="ts">
import TnUpdateUserInfoPopup from 'tnuiv3p-tn-update-user-info-popup/index.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { ref } from 'vue'
import {getBaseURL, getToken, uploadFile} from "@/utils/request.ts";
import {saveLoginInfo, updateUserInfo} from "@/composables/useCommon.ts";


const showPopup = ref<boolean>(false)
const nickname = ref<string>('')
const avatar = ref<string>('')

// 头像选择事件
const avatarChooseHandle = async (url: string) => {
  // 换成自己的上传接口
  const result=await uploadFile(url)
  //更新用户头像和昵称
  if(result){
    avatar.value=result
  }
}

const handleUpdateUser = async () => {
  // 更新用户昵称
  const user = await updateUserInfo({nickname: nickname.value,avatar_url:avatar.value})
  //   保存用户
  saveLoginInfo(user)
}
</script>

<template>

  <TnButton size="sm" plain @click="() => (showPopup = true)">
    <TnIcon name="edit"/>
    完善用户信息 </TnButton>

  <TnUpdateUserInfoPopup
      v-model:show="showPopup"
      v-model:nickname="nickname"
      v-model:avatar="avatar"
      @choose-avatar="avatarChooseHandle"
      @confirm="handleUpdateUser"
  />
</template>