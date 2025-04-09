<template>
  <BaseLayout>
  <view>
    <MyNavbar/>
    <up-status-bar/>
      <view class="u-flex u-row-right" style="width: 100%;">
        <view class="camera u-flex u-row-center">
        </view>
      </view>
    <view class="u-flex u-flex-y-center u-flex-around user-box u-p-l-30 u-p-r-20 u-p-b-30">
      <view class="u-m-r-10">
        <up-avatar
            @click="handleLogin"
            :src="user.avatar_url"
            size="80">
        </up-avatar>
        <view
            v-if="!isLogin"
            class="tn-text-center tn-text-sm tn-gray-dark_text"
            style="position: relative;bottom: 0;">点击头像登录</view>
      </view>
      <view class="u-flex-1">
        <view
            v-if="isLogin"
            class="u-font-18 u-p-b-10 tn-text">昵称：{{ user.nickname }}</view>
        <view
            v-else
            class="u-font-18 u-p-b-10 tn-gray-dark_text">未登录</view>
<!--        会员信息-->
        <view>
          <UserMemberInfo></UserMemberInfo>
        </view>
<!--        完善用户信息-->
        <view
            v-if="isLogin"
            class="tn-text-xs tn-gray-dark_text">余额：{{user.balance}}</view>
        <GetUserInfoPopup/>

      </view>
      <view class="u-m-l-10 u-p-10">
        <up-icon name="scan" color="#969799" size="28"></up-icon>
      </view>
      <view class="u-m-l-10 u-p-10">
        <up-icon name="arrow-right" color="#969799" size="28"></up-icon>
      </view>
    </view>

    <view class="u-m-t-20">
      <up-cell-group>
        <up-cell icon="rmb-circle" title="成为会员" @click="showPay=true"></up-cell>
      </up-cell-group>
    </view>

    <view class="u-m-t-20">
      <up-cell-group>
<!--        <up-cell icon="star" title="收藏(暂未开放)"></up-cell>-->
        <up-cell icon="photo" title="绘图历史" @click="handleGotoHistory"></up-cell>
        <up-cell icon="setting" title="退出登录" @click="handleLoginOut">
          <template #icon>
            <tn-icon name="logout"/>
          </template>
        </up-cell>
<!--        <up-cell icon="coupon" title="卡券(暂未开放)"></up-cell>-->
<!--        <up-cell icon="heart" title="关注(暂未开放)"></up-cell>-->
      </up-cell-group>
    </view>

    <view class="u-m-t-20">
      <up-cell-group>
<!--        <up-cell icon="setting" title="设置(暂未开放)"></up-cell>-->

      </up-cell-group>
    </view>
  </view>
  </BaseLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import MyNavbar from "@/components/common/MyNavbar.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import GetUserInfoPopup from "@/components/GetUserInfoPopup.vue";
import {
  creatOrder,
  getLoginInfo,
  getOrderInfoById,
  getPrePay,
  getProductList,
  isLogin,
  loginByUsername,
  loginByWechatCode,
  loginOut,
  refreshUserInfo,
  saveLoginInfo
} from "@/composables/useCommon.ts";
import {useAppStore} from "@/stores/appStore.ts";
import {storeToRefs} from "pinia";
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import {onReady} from "@dcloudio/uni-app";
import useWorkFlow from "@/composables/useWorkFlow.ts";
import {on} from "@/utils/emitter.ts";
import {EventType} from "@/types/event.types.ts";
import UserMemberInfo from "@/components/home/UserMemberInfo.vue";

const {user}=storeToRefs(useAppStore())
const { getInviteCode } = useAppStore()

const show = ref(true)
const pic = ref('')
function handleGotoHistory() {
  uni.navigateTo({
    url: '/pages/history/history'
  })
}


const handleLogin=async ()=>{
  if (isLogin.value) {
    return
  }
  uni.showLoading({
    title: '正在登录...',
    mask: true
  })
  //获取平台信息
  const {uniPlatform}=uni.getSystemInfoSync()

  if (uniPlatform !== 'web') {
    // 非开发者工具环境，执行登录操作
    handleLoginByWechat()
  } else {
    console.log('dev')
    // 开发者工具环境，模拟登录 todo

    const user=await loginByUsername({
      username:'test456',
      password:'123456'
    })
    saveLoginInfo(user)
    uni.hideLoading()
  }
}

/** 通过微信登录 */
const handleLoginByWechat=()=>{
  uni.login({
    success: async function  ({code}) {
      const result = await loginByWechatCode(code,getInviteCode())
      saveLoginInfo(result)
      uni.hideLoading()
    },
    fail: function (err) {
      uni.showToast({
        title: '登录错误',
        icon: 'none'
      })
    }
  })
}

const {socketInit}=useWorkFlow()

onReady(()=>{
  socketInit()
  on(EventType.PAY_SUCCESS, ({order_id})=>handlePayMessage(order_id))
})


const handlePayMessage=async (order_id:string) => {
    // 监听到支付成功事件
    console.log('收到支付成功消息',order_id)
    //查询订单支付状态进行复核
    const order = await getOrderInfoById(order_id)
    if (order[0] && order[0].order_status===1){
       uni.showToast({
        title: '支付成功',
        icon: 'none'
      })
      refreshUserInfo()
    }
}



const handleLoginOut=()=>{
  uni.showLoading({
    title: '正在退出登录...',
    mask: true
  })
  loginOut()

  uni.hideLoading()
  uni.showToast({
    title: '退出成功',
    icon: 'none'
  })
}


/** 支付 **/

const {showPay}=storeToRefs(useAppStore())
</script>

<style lang="scss">
page{
  background-color: #ededed;
}

.camera{
  width: 54px;
  height: 44px;

  &:active{
    background-color: #ededed;
  }
}
.user-box{
  background-color: #fff;
}
.u-cell-group {
  background-color: #fff;
}
</style>
