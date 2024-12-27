<script lang="ts" setup>
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPhotoAlbum from '@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.vue'
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnAvatarGroup from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar-group.vue'
import TnLazyLoad from '@tuniao/tnui-vue3-uniapp/components/lazy-load/src/lazy-load.vue'
import { graphicCardEmits, graphicCardProps } from './types'
import { useGraphicCard, useGraphicCardCustomStyle } from './composables'

const props = defineProps(graphicCardProps)
const emits = defineEmits(graphicCardEmits)

const {
  viewUserAvatars,
  viewUserCount,
  imageCount,
  previewImageHandle,
  cardClickEvent,
  handleAvatarClick,
  handleMoreClick,
  handleCommentClick,
  handleHotClick,
  handleLikeClick,
} = useGraphicCard(props, emits)
const {
  ns,
  tagClass,
  tagStyle,
  hotClass,
  hotStyle,
  commentClass,
  commentStyle,
  likeClass,
  likeStyle,
} = useGraphicCardCustomStyle(props)
</script>

<template>
  <view :class="[ns.b()]" @tap="cardClickEvent">
    <!-- 简要信息 -->
    <view :class="[ns.e('brief-info')]">
      <view :class="[ns.e('brief-info__content')]">
        <view
            :class="[ns.e('brief-info__avatar')]"
            @tap.stop="handleAvatarClick"
        >
<!--          <image class="image" :src="avatar" mode="aspectFill" />-->
          <TnAvatar v-if="avatar" :url="avatar"/>
          <TnAvatar v-else :size="80" >{{username?.slice(0,1)}}</TnAvatar>
        </view>
        <view :class="[ns.e('brief-info__data')]">
          <view class="title tn-text-ellipsis-1">{{ title }}</view>
          <view v-if="description" class="desc tn-text-ellipsis-1">
            {{ description }}
          </view>
        </view>
      </view>
      <view v-if="showMore" :class="[ns.e('brief-info__operation')]">
        <slot name="briefOperation">
          <view
              :class="[ns.em('brief-info__operation', 'more')]"
              @tap.stop="handleMoreClick"
          >
            <TnIcon name="more-vertical" />
          </view>
        </slot>
      </view>
    </view>
    <!-- 内容容器 -->
    <view :class="[ns.e('container')]">
      <!-- 内容 -->
      <view :class="[ns.e('content')]">
        <!-- 标签和内容 -->
        <view :class="[ns.e('content__tags')]">
          <view
              v-for="(tagItem, tagIndex) in tags"
              :key="tagIndex"
              class="tag-item"
              :class="[tagClass]"
              :style="tagStyle"
          >
            <TnIcon name="topics-fill" />
            {{ tagItem }}
          </view>
        </view>
        <view :class="[ns.e('content__data')]">
          {{ content }}
        </view>
      </view>
      <!-- 图片列表 -->
      <view v-if="!!imageCount" :class="[ns.e('images')]">
        <!-- 一张图片 -->
        <view
            v-if="imageCount === 1"
            :class="[ns.em('images', 'item'), ns.is('one')]"
            @tap.stop="previewImageHandle(0)"
        >
          <TnLazyLoad mode="aspectFit"  :src="images[0]" />
        </view>
        <!-- 两张图片 -->
        <view
            v-if="imageCount === 2"
            :class="[ns.em('images', 'item'), ns.is('two')]"
        >
          <TnPhotoAlbum :data="images" :column="2" />
        </view>
        <!-- 三张图片 -->
        <view
            v-if="imageCount === 3"
            :class="[ns.em('images', 'item'), ns.is('three')]"
        >
          <view class="image-wrapper-left">
            <view class="image-container" @tap.stop="previewImageHandle(0)">
              <TnLazyLoad mode="aspectFit" :src="images[0]" />
            </view>
          </view>
          <view class="image-wrapper-right">
            <view class="image-container" @tap.stop="previewImageHandle(1)">
              <TnLazyLoad  :src="images[1]" />
            </view>
            <view class="image-container" @tap.stop="previewImageHandle(2)">
              <TnLazyLoad  :src="images[2]" />
            </view>
          </view>
        </view>
        <!-- 四张图片 -->
        <view
            v-if="imageCount === 4"
            :class="[ns.em('images', 'item'), ns.is('four')]"
        >
          <TnPhotoAlbum :data="images" :column="2" />
        </view>
        <TnPhotoAlbum v-if="imageCount >= 5" :data="images" />
      </view>
    </view>

    <!-- 底部信息 -->
    <view
        :class="[ns.e('bottom-info'), ns.is('no-content', !!$slots.bottomRight)]"
    >
      <view :class="[ns.e('bottom-info__left')]">
        <view
            v-if="showHot"
            class="count-item-data"
            :class="[hotClass]"
            :style="hotStyle"
            @tap.stop="handleHotClick"
        >
          <TnIcon :name="activeHot ? activeHotIcon : hotIcon" />
          <view class="count">{{ hotCount }}</view>
        </view>
        <view
            v-if="showComment"
            class="count-item-data"
            :class="[commentClass]"
            :style="commentStyle"
            @tap.stop="handleCommentClick"
        >
          <TnIcon :name="activeComment ? activeCommentIcon : commentIcon" />
          <view class="count">{{ commentCount }}</view>
        </view>
        <view
            v-if="showLike"
            class="count-item-data"
            :class="[likeClass]"
            :style="likeStyle"
            @tap.stop="handleLikeClick"
        >
          <TnIcon :name="activeLike ? activeLikeIcon : likeIcon" />
          <view class="count">{{ likeCount }}</view>
        </view>
      </view>
      <view
          v-if="(showViewUser && viewUserAvatars.length) || $slots.bottomRight"
          :class="[ns.e('bottom-info__right')]"
      >
        <slot name="bottomRight">
          <!-- 查看用户头像列表 -->
          <view :class="[ns.e('view-user-list')]">
            <TnAvatarGroup border size="sm">
              <TnAvatar
                  v-for="(viewUserAvatar, viewUserIndex) in viewUserAvatars"
                  :key="viewUserIndex"
                  :url="viewUserAvatar"
              />
            </TnAvatarGroup>
          </view>
          <!-- 查看用户数量 -->
          <view :class="[ns.e('view-user-count')]">
            {{ viewCount !== undefined ? viewCount : viewUserCount }}人
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './theme-chalk/index.scss';
</style>
