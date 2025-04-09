<template>
  <view>
    <movable-area class="movable-area" :scale-area="false">
      <movable-view
          id="movable-view"
          class="movable-view" :class="!isRemove?'animation-info':''" style="pointer-events: auto;"
                    @click="clickBtn" @touchstart="touchstart" @touchend="touchend" @change="onChange" direction="all"
                    inertia="true" :x="btnPositon.x" :y="btnPositon.y" :disabled="disabled" :out-of-bounds="true" :damping="200" :friction="100">

        <slot>
          <view class="content-default">
            <slot name="text-content"></slot>
          </view>
        </slot>
      </movable-view>
    </movable-area>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, withDefaults, nextTick, watch} from 'vue';
import {onLoad} from "@dcloudio/uni-app";

interface Props{
  disabled?: boolean,
  canDocking?: boolean,
  bottomPx?: number,
  rightPx?: number
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  canDocking: true,
  bottomPx: 30,
  rightPx: 0
})
const windowWidth=ref(0)
const windowHeight=ref(0)
const btnWidth=ref(0)
const btnHeight=ref(0)

/** 按钮位置 */
const btnPositon =defineModel({
  default:{
    x:10000,
    y:10000
  }
})
const old = reactive({
  x: 0,
  y: 0
})

// watch(old,()=>{
//   console.log('old position',old)
//   console.log('btn position',btnPositon.value)
// },{
//   deep:true
// })
const  getSysInfo=()=> {
  let sysInfo = uni.getSystemInfoSync()
  windowWidth.value = sysInfo.windowWidth
  windowHeight.value = sysInfo.windowHeight
  btnPositon.value.x = sysInfo.windowWidth - props.rightPx
  btnPositon.value.y = sysInfo.windowHeight - props.bottomPx -300
}
onLoad(()=>{
  nextTick(()=>{
    getSysInfo()
  })
})

//移动按钮
const onChange=(e)=> {
  old.x = e.detail.x
  old.y = e.detail.y
}
const isRemove = ref(true)
//开始移动
const touchstart=(e)=> {
  isRemove.value = true
}
//结束移动
const touchend=(e)=> {
  if (props.canDocking && old.x !== undefined) {
    btnPositon.value.x = old.x
    btnPositon.value.y = old.y
    let bWidth = (windowWidth.value - btnWidth.value) / 2
    console.log('bwidth',bWidth)
    if (btnPositon.value.x <= 0 || (btnPositon.value.x >= 0 && btnPositon.value.x <= bWidth)) {
      nextTick(res => {
        btnPositon.value.x = 0
      })
    } else {
      nextTick(res => {
        // 靠右边缘
        btnPositon.value.x = windowWidth.value -
            btnWidth.value
      })
    }
    isRemove.value = false
  }
}

// 自定义事件
const emit = defineEmits(['clickBtn'])
//点击按钮
// 点击按钮
const clickBtn = () => {
  emit('clickBtn',null);
};

</script>
<style scoped lang="scss">
.movable-view {
  width: 100rpx;
  height: 100rpx;
  background: transparent;
  font-size: 26rpx;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-default{
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(360deg, $u-primary-dark 0%, $u-primary 100%);
  box-shadow: 0 4rpx 12rpx 0 #ADC3F8;
  border-radius: 50rpx;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: verticalMove 2s ease-in-out infinite;
}

.animation-info {
  transition: left .25s ease;
}

.movable-area {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999 !important;
  pointer-events: none;
}


</style>
