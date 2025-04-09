import type { ICanvasPlugin } from '../types'
import { Canvas } from '@/editor'
import { BasePlugin } from '@/editor/plugins/BasePlugin.ts'

// 定义图片插件的扩展方法类型
type ImageExtensions = {
  loadImage(url: string): Promise<void>
  test(): void
}

export class ImagePlugin extends BasePlugin implements ICanvasPlugin<ImageExtensions> {
  constructor() {
    super()
  }
  creatImage(path: string) {
    const image = this.canvas.canvas.createImage()
    image.src = path
    return image
  }

  extensions: ImageExtensions = {
    loadImage: (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // For H5 environment
        if (typeof window !== 'undefined') {
          const img = new Image()
          img.crossOrigin = 'anonymous' // Handle CORS if needed
          img.onload = () => {
            this.canvas.getContext().drawImage(img, 0, 0, this.getWidth(), this.getHeight())
            resolve()
          }
          img.onerror = reject
          img.src = url
        }
        // For Mini Program environment
        else {
          uni.downloadFile({
            url,
            success: result => {
              const image = this.creatImage(result.tempFilePath)
              image.onload = () => {
                this.ctx.drawImage(image, 0, 0, this.canvas.getWidth(), this.canvas.getHeight())
                resolve()
              }
            },
          })
        }
      })
    },
    test(this: Canvas) {
      const ctx = this.getContext()
      // 开始绘制
      ctx.strokeStyle = '#00ff00'
      ctx.lineWidth = 5
      ctx.rect(0, 0, 200, 200)
      ctx.stroke()

      ctx.strokeStyle = '#ff0000'
      ctx.lineWidth = 2

      // 画圆
      ctx.beginPath()
      ctx.arc(100, 100, 60, 0, 2 * Math.PI, true)

      // 画笑脸弧线
      ctx.moveTo(140, 100)
      ctx.arc(100, 100, 40, 0, Math.PI, false)

      // 画眼睛
      ctx.moveTo(85, 80)
      ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
      ctx.moveTo(125, 80)
      ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)

      ctx.stroke()
    },

    // drawImage(
    //   this: Canvas,
    //   url: string,
    //   x: number,
    //   y: number,
    //   width: number,
    //   height: number
    // ): Promise<void> {
    //   // ... implementation
    //   return Promise.resolve()
    // },
  }
}
