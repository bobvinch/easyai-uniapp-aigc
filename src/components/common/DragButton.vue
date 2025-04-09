<template>
  <view class="page-container">
    <!-- 页面上的其他内容 -->
    <view class="content">
      <slot></slot>
    </view>

    <!-- 可拖动按钮的区域 -->
    <movable-area class="movable-area" :scale="true" :out-of-bounds="false">
      <!-- 可拖动按钮 -->
      <movable-view
          class="draggable-btn"
          :style="buttonStyle"
          :direction="'all'"
          :scale="true"
          :inertia="true"
          :momentum="true"
          @change="onMoveChange"
      >
          <!-- 显示拖动按钮 -->
          <view class="button">
            拖动我
            <view class="wave" :style="waveStyle"></view>
          </view>
      </movable-view>
    </movable-area>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const progress = ref(0);

// 计算按钮的样式
const buttonStyle = computed(() => {
  return {
    position: 'absolute',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    backgroundColor: 'transparent', // 背景透明
    color: '#ff6a00',
    borderRadius: '50%',
    fontSize: '16px',
    cursor: 'pointer',
    pointerEvents: 'auto', // 确保按钮响应触摸
  };
});

// 计算波浪样式
const waveStyle = computed(() => {
  const waveHeight = (100 - progress.value) * 0.4;
  const wavePosition = (progress.value) * 0.3;

  return {
    position: 'absolute',
    bottom: `${wavePosition}px`,
    left: 0,
    right: 0,
    height: `${waveHeight}px`,
    width: '100%',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    transform: `rotate(${progress.value * 1.8}deg)`,
  };
});

const updateProgress = (percent) => {
  progress.value = percent;
};

const onMoveChange = (e) => {
  console.log('移动后的位置:', e.detail);
};

setInterval(() => {
  if (progress.value < 100) {
    progress.value += 1;
  }
}, 100);
</script>

<style scoped>
/* 页面容器样式 */
.page-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  overflow: hidden; /* 防止拖动区域超出屏幕时出现滚动条 */
}

/* 内容区域 */
.content {
  position: relative;
  z-index: 1;
}

/* 可拖动区域样式 */
.movable-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999; /* 保证拖动按钮的区域在内容上面 */
  pointer-events: none; /* 禁用可拖动区域的交互，只让按钮响应触摸 */
}

/* 可拖动按钮的样式 */
.draggable-btn {
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: transparent; /* 背景透明 */
  color: #ff6a00;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  pointer-events: auto; /* 使按钮响应触摸 */
}


/* 按钮内容样式 */
.btn-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160rpx;
  height: 160rpx;
  background-color: #ff6a00;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  animation: verticalMove 2s ease-in-out infinite;
}

/* 波浪样式 */
.wave {
  position: absolute;
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  bottom: 0;
  left: 0;
  animation: waveAnimation 2s ease-in-out infinite;
}

/* 上下移动动画 */
@keyframes verticalMove {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);  /* 上移 */
  }
  100% {
    transform: translateY(0);  /* 恢复到原位 */
  }
}

@keyframes waveAnimation {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(30px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
