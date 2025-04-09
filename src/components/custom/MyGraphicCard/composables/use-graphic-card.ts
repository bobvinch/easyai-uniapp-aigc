import { computed, ref } from 'vue'
import { isEmptyVariableInDefault } from '@tuniao/tnui-vue3-uniapp/utils'

import type { SetupContext } from 'vue'
import type { GraphicCardEmits, GraphicCardProps } from '../types'

export const useGraphicCard = (
    props: GraphicCardProps,
    emits: SetupContext<GraphicCardEmits>['emit']
) => {
    // 分割显示的查看用户头像列表和头像数量
    const viewUserAvatars = ref<string[]>([])
    const viewUserCount = ref<number>(0)

    if (props.showViewUser) {
        viewUserAvatars.value = props.viewUserAvatars.slice(
            0,
            props.maxViewUserAvatarCount
        )
        viewUserCount.value = props.viewUserAvatars.length
    }

    // 图片数量
    const imageCount = computed<number>(() =>
        isEmptyVariableInDefault(props?.images?.length, 0)
    )

    // 预览图片
    const previewImageHandle = (index: number) => {
        uni.previewImage({
            urls: props.images,
            current: index,
        })
    }

    // 卡片点击事件
    const cardClickEvent = () => {
        emits('click')
    }

    // 用户头像点击事件
    const handleAvatarClick = () => {
        emits('avatar-view-click')
    }

    // 更多按钮点击事件
    const handleMoreClick = () => {
        emits('more-click')
    }

    // 点击热度数量
    const handleHotClick = () => {
        emits('hot-click')
    }

    // 点击评论数量
    const handleCommentClick = () => {
        emits('comment-click')
    }

    // 点击点赞数量
    const handleLikeClick = () => {
        emits('like-click')
    }

    return {
        viewUserAvatars,
        viewUserCount,
        imageCount,
        previewImageHandle,
        cardClickEvent,
        handleAvatarClick,
        handleMoreClick,
        handleHotClick,
        handleCommentClick,
        handleLikeClick,
    }
}
