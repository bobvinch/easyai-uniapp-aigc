import type { ICanvas, ICanvasPlugin, Point } from './types'
import { BasePlugin } from './plugins/BasePlugin.ts'
import { getCurrentInstance } from 'vue'

export class Canvas<P extends ICanvasPlugin[] = []> implements ICanvas<P> {
  private ctx: CanvasRenderingContext2D
  private plugins: Set<ICanvasPlugin>
  private canvasId: string
  private width: number
  private height: number
  private extensions: Map<string, Function>
  private canvas
  constructor(options: { canvasId: string; width: number; height: number }) {
    this.canvasId = options.canvasId
    this.width = options.width
    this.height = options.height
    this.plugins = new Set()
    this.extensions = new Map()
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height
  }

  public init() {
    return new Promise((resolve, reject) => {
      const instance = getCurrentInstance()

      const query = uni.createSelectorQuery().in(instance?.proxy)
      query
        .select(`#${this.canvasId}`)
        .fields({ node: true, size: true })
        .exec(res => {
          console.log('Canvas node info:', res[0]?.node)
          // Your drawing code here

          if (!res[0]?.node) throw new Error('Canvas node not found')

          const _canvas = res[0].node

          // 设置画布尺寸（建议考虑设备像素比）
          const dpr = uni.getSystemInfoSync().pixelRatio
          _canvas.width = res[0].width * dpr
          _canvas.height = res[0].height * dpr
          this.ctx = _canvas.getContext('2d')
          this.canvas = _canvas
          // 缩放以适应设备像素比
          this.ctx.scale(dpr, dpr)

          // 在 ctx 初始化完成后，注入 context
          this.plugins.forEach(plugin => {
            if (plugin instanceof BasePlugin) {
              plugin.setContext(this)
            }
            plugin.onInit?.()
          })
          resolve(true)
        })
    })
  }

  use<T extends ICanvasPlugin>(plugin: T): Canvas<[...P, T]> {
    this.plugins.add(plugin)

    if (plugin.extensions) {
      Object.entries(plugin.extensions).forEach(([name, fn]) => {
        if (typeof fn === 'function') {
          ;(this as any)[name] = fn.bind(this)
        }
      })
    }
    return this
  }

  public remove(plugin: ICanvasPlugin) {
    plugin.onDestroy?.()
    this.plugins.delete(plugin)
  }

  public handleTouchStart(point: Point) {
    this.plugins.forEach(plugin => {
      plugin.onTouchStart?.(point)
    })
  }

  public handleTouchMove(point: Point) {
    this.plugins.forEach(plugin => {
      plugin.onTouchMove?.(point)
    })
  }

  public handleTouchEnd() {
    this.plugins.forEach(plugin => {
      plugin.onTouchEnd?.()
    })
  }

  public update() {
    this.plugins.forEach(plugin => {
      plugin.onUpdate?.()
    })
  }

  public draw() {
    this.plugins.forEach(plugin => {
      plugin.onDraw?.()
    })
    this.ctx.draw()
  }

  public reset() {
    this.plugins.forEach(plugin => {
      plugin.onReset?.()
    })
  }

  public getContext() {
    return this.ctx
  }

  public destroy() {
    this.plugins.forEach(plugin => {
      plugin.onDestroy?.()
    })
    this.plugins.clear()
  }
}
