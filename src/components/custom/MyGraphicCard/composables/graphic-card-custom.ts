import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '@tuniao/tnui-vue3-uniapp/hooks'

import type { CSSProperties } from 'vue'
import type { GraphicCardProps } from '../types'

export const useGraphicCardCustomStyle = (props: GraphicCardProps) => {
    const ns = useNamespace('graphic-card')

    // 解析颜色
    const [tagBgColorClass, tagBgColorStyle] = useComponentColor(
        toRef(props, 'tagBgColor'),
        'bg'
    )
    const [tagTextColorClass, tagTextColorStyle] = useComponentColor(
        toRef(props, 'tagTextColor'),
        'text'
    )
    const [hotColorClass, hotColorStyle] = useComponentColor(
        toRef(props, 'hotColor'),
        'text'
    )
    const [activeHotColorClass, activeHotColorStyle] = useComponentColor(
        toRef(props, 'activeHotColor'),
        'text'
    )
    const [commentColorClass, commentColorStyle] = useComponentColor(
        toRef(props, 'commentColor'),
        'text'
    )
    const [activeCommentColorClass, activeCommentColorStyle] = useComponentColor(
        toRef(props, 'activeCommentColor'),
        'text'
    )
    const [likeColorClass, likeColorStyle] = useComponentColor(
        toRef(props, 'likeColor'),
        'text'
    )
    const [activeLikeColorClass, activeLikeColorStyle] = useComponentColor(
        toRef(props, 'activeLikeColor'),
        'text'
    )

    // 标签对应的类
    const tagClass = computed<string>(() => {
        const cls: string[] = []

        if (tagBgColorClass.value) cls.push(tagBgColorClass.value)
        if (tagTextColorClass.value) cls.push(tagTextColorClass.value)

        return cls.join(' ')
    })
    // 标签对应的样式
    const tagStyle = computed<CSSProperties>(() => {
        const style: CSSProperties = {}

        if (!tagBgColorClass.value) {
            style.backgroundColor =
                tagBgColorStyle.value || 'var(--tn-color-gray-disabled)'
        }

        if (tagTextColorStyle.value) {
            style.color = tagTextColorStyle.value
        } else if (!tagTextColorClass.value && !tagBgColorClass.value) {
            style.color = 'var(--tn-text-color-primary)'
        }

        return style
    })

    // 热度对应的类
    const hotClass = computed<string>(() => {
        const cls: string[] = [ns.e('hot')]

        if (props.activeHot) {
            if (activeHotColorClass.value) cls.push(activeHotColorClass.value)
        } else {
            if (hotColorClass.value) cls.push(hotColorClass.value)
        }

        return cls.join(' ')
    })
    // 热度对应的样式
    const hotStyle = computed<CSSProperties>(() => {
        const style: CSSProperties = {}

        if (props.activeHot) {
            if (!activeHotColorClass.value) {
                style.color = activeHotColorStyle.value || 'var(--tn-color-primary)'
            }
        } else {
            if (!hotColorClass.value) {
                style.color = hotColorStyle.value || 'var(--tn-color-gray)'
            }
        }

        return style
    })

    // 评论对应的类
    const commentClass = computed<string>(() => {
        const cls: string[] = [ns.e('comment')]

        if (props.activeComment) {
            if (activeCommentColorClass.value) cls.push(activeCommentColorClass.value)
        } else {
            if (commentColorClass.value) cls.push(commentColorClass.value)
        }

        return cls.join(' ')
    })
    // 评论对应的样式
    const commentStyle = computed<CSSProperties>(() => {
        const style: CSSProperties = {}

        if (props.activeComment) {
            if (!activeCommentColorClass.value) {
                style.color = activeCommentColorStyle.value || 'var(--tn-color-primary)'
            }
        } else {
            if (!commentColorClass.value) {
                style.color = commentColorStyle.value || 'var(--tn-color-gray)'
            }
        }

        return style
    })

    // 点赞对应的类
    const likeClass = computed<string>(() => {
        const cls: string[] = [ns.e('like')]

        if (props.activeLike) {
            if (activeLikeColorClass.value) cls.push(activeLikeColorClass.value)
        } else {
            if (likeColorClass.value) cls.push(likeColorClass.value)
        }

        return cls.join(' ')
    })
    // 点赞对应的样式
    const likeStyle = computed<CSSProperties>(() => {
        const style: CSSProperties = {}

        if (props.activeLike) {
            if (!activeLikeColorClass.value) {
                style.color = activeLikeColorStyle.value || 'var(--tn-color-red)'
            }
        } else {
            if (!likeColorClass.value) {
                style.color = likeColorStyle.value || 'var(--tn-color-gray)'
            }
        }

        return style
    })

    return {
        ns,
        tagClass,
        tagStyle,
        hotClass,
        hotStyle,
        commentClass,
        commentStyle,
        likeClass,
        likeStyle,
    }
}
