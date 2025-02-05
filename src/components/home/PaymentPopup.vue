<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue';
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue';
import { type IProduct, IWebsocketSceneType } from '@/types';
import { getProductList, isLogin } from '@/composables/useCommon.ts';
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue';
import { usePayHandlePayment } from '@/composables/usePayment.ts';
import { onLoad, onReady } from '@dcloudio/uni-app';
import useWorkFlow from '@/composables/useWorkFlow.ts';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/appStore.ts';
import { emit } from '@/utils/emitter.ts';
import { EventType } from '@/types/event.types.ts';
import { parseJSONToObject } from '@/utils/common.ts';

interface Props{
  title?:string;
}
const props=withDefaults(defineProps<Props>(),{
  title:'请选择充值套餐'
})
const {showPay}=storeToRefs(useAppStore())


const showPopup =computed({
  set:(newValue)=>{
    showPay.value=newValue
    if(!newValue){
      selectedIndex.value=0
    }
  },
  get:()=>{
      //获取当前的平台信息，ios平台不能弹出支付
      const {osName} = uni.getSystemInfoSync()
      if(showPay.value && (osName === 'ios' || osName==='macos')){
        uni.showToast({
          title:'IOS暂不支持在线支付',
          icon:'none'
        })
        showPay.value=false
      }
      return showPay.value
  }
})
watch(showPopup,()=>{
  if(showPopup.value){
    socketInit()
  }
})

//自定义事件
defineEmits(['showPay'])

// const showPopup = defineModel({
//   default: true,
// })

const products=ref<IProduct[]>([])

const handleInitData=async () => {
  const res = await getProductList()
  if (res) {
    products.value = res
  }
}

const selectedIndex =ref(0)
watch(selectedIndex,()=>{
  console.log(selectedIndex.value)
})


const {socketInit}=useWorkFlow()

onReady(()=>{
  handleInitData()
  socketInit({
    params:{
      type:IWebsocketSceneType.payStatusPush
    },
    onMessage:(msg)=>{
      console.log('handle pay success message');
      const msgObj=parseJSONToObject<{type:string,order_id:string}>(msg)
      const {type}=msgObj
      if(type==='pay_success'){
        showPay.value=false
        emit(EventType.PAY_SUCCESS, {order_id:msgObj.order_id})
      }
    }
  })
})





const handlePayment =async ()=>{
  if(!isLogin.value){
    //未登录
    uni.switchTab({
      url:'/pages/setting/setting'
    })
    uni.showToast({
      title:'请先登录',
      icon:'none'
    })
    return
  }
  await socketInit({
    params:{
      type:IWebsocketSceneType.payStatusPush
    }
  })
  usePayHandlePayment(products.value[selectedIndex.value])
}

</script>

<template>
  <TnPopup
      close-btn
      height="66%"
      open-direction="bottom"
      v-model="showPopup">
    <view class="popup-container">
<!--      标题-->
      <view class="tn-text-center title tn-text-xl tn-gray-dark_text">
        <text>{{ title }}</text>
      </view>
<!--      套餐-->
      <view>
        <TnScrollList>
          <view class="item-container">
            <view
                v-for="(item,index)  in products"
                :key="item._id"
                :class="{'selected': selectedIndex === index}"
                @click="selectedIndex=index"
                class="scroll-item tn-flex-center tn-flex-column"
            >
              <view
                  @click="selectedIndex=index"
                  :class="{'selected': selectedIndex === index}"
                  class="empty">
                <view class="tn-text" style="margin-bottom: 10rpx">{{item.name}}</view>
<!--                价格-->
                <view>
                  <span class="tn-text-sm">￥</span><span class="tn-text-bold tn-text-xl">{{item.amount/100}}</span>
                </view>
<!--                介绍-->
                <view class="tn-text-xs" style="margin-top: 20rpx">{{item.desc}}</view>

                <view class="selected-icon">

                  <TnIcon
                      v-if="index===selectedIndex"
                      name="check"/>
                </view>
              </view>

            </view>
          </view>
        </TnScrollList>
      </view>
<!--      购买按钮-->
      <view style="margin: 10rpx 10%;width: 80%;">
        <up-button
            type="primary"
            @click="handlePayment"
            class="button-pay"
            shape="circle" >立即购买</up-button>
      </view>
    <view>

    </view>
    </view>
  </TnPopup>
</template>

<style scoped lang="scss">
.popup-container {
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  .title{
    margin: 20rpx 0;
  }
}

.item-container {
  position: relative;
  width: fit-content;



  display: flex;
  flex-wrap: nowrap;

  .scroll-item {
    flex-grow: 1;
    flex-shrink: 0;
    .empty {
      margin: 10rpx 10rpx;
      width: 220rpx;
      height: 300rpx;
      border-radius: 15rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #F2F4F6;
      transition: all 0.3s ease; // 添加平滑过渡效果

      &.selected {
        background: linear-gradient(to bottom, #FDF8F0, #F2E1C9);
        border: 2rpx solid #D6AE70;
        transform: scale(1.05); // 选中时放大效果
      }
    }

    .title {
      margin-top: 10rpx;
    }
  }
}

.button-pay {
  background: linear-gradient(to right, $u-primary-lighten, $u-primary);
  border-radius: 50px;
  box-shadow: 0 3px 5px var(--primary-color-light);
}

.selected-icon{
  position: absolute;
  bottom: 0;
  right: 0;
  -moz-border-radius-bottomright: 15rpx;
  background-color: #CB9749;
  color: white;
}

</style>