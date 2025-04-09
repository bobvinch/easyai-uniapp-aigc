import type { ICanvasPlugin, Point } from '../types'
import { BasePlugin } from './BasePlugin.ts'

interface PenOptions {
  color?: string
  lineWidth?: number
}

export interface MaskExtensions {
  loadMask: (url: string) => Promise<void>
}

export class MaskPlugin extends BasePlugin implements ICanvasPlugin<MaskExtensions> {
  private isDrawing: boolean = false
  private lastPoint: Point | null = null
  private color: string
  private lineWidth: number

  extensions: MaskExtensions = {
    loadMask: async (url: string) => {
      console.log('loadMask', url)
    },
  }

  constructor(options: PenOptions = {}) {
    super()
    this.color = options.color || '#000000'
    this.lineWidth = options.lineWidth || 20
  }
  onInit(): void {
    // 设置画笔初始样式
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
  }

  onTouchStart(point: Point): void {
    console.log('handleStart', point)

    if (!this.ctx) return

    this.isDrawing = true
    this.lastPoint = point

    // 开始新的路径
    this.ctx.beginPath()
    this.ctx.moveTo(point.x, point.y)
  }

  onTouchMove(point: Point): void {
    if (!this.ctx || !this.isDrawing || !this.lastPoint) return

    // 计算中点，用于二次贝塞尔曲线
    const midPoint = {
      x: (this.lastPoint.x + point.x) / 2,
      y: (this.lastPoint.y + point.y) / 2,
    }

    // 使用二次贝塞尔曲线绘制平滑线条
    this.ctx.beginPath()
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y)
    this.ctx.quadraticCurveTo(this.lastPoint.x, this.lastPoint.y, midPoint.x, midPoint.y)

    // 设置线条末端样式为圆形
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.stroke()

    // 更新最后一个点
    this.lastPoint = point
  }

  onTouchEnd(): void {
    this.isDrawing = false
    this.lastPoint = null
  }

  // 扩展方法：设置画笔颜色
  setColor(color: string): void {
    this.color = color
    if (this.ctx) {
      this.ctx.strokeStyle = color
    }
  }

  // 扩展方法：设置画笔粗细
  setLineWidth(width: number): void {
    this.lineWidth = width
    if (this.ctx) {
      this.ctx.lineWidth = width
    }
  }

  private getCanvas() {
    return (this as any).canvas
  }
}
