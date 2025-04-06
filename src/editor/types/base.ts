import { ImagePlugin, type MaskExtensions } from '@/editor'

export type PluginExtensions = Record<string, Function>

export interface Point {
  x: number
  y: number
}
// 修改插件接口定义，使用更精确的泛型约束
export interface ICanvasPlugin<T = {}> {
  onInit?: () => void
  onDestroy?: () => void
  onReset?: () => void
  onTouchStart?: (point: Point) => void
  onTouchMove?: (point: Point) => void
  onTouchEnd?: () => void
  onDraw?: () => void
  onUpdate?: () => void
  extensions?: T
}

export type ICanvas<P extends ICanvasPlugin[] = []> = MergePluginTypes<P> & {
  // Canvas 原有的方法
  getContext(): CanvasRenderingContext2D
  getWidth(): number
  getHeight(): number
  init: () => Promise<boolean>
}

// 提取单个插件的泛型类型
// 提取单个插件的泛型类型
type ExtractPluginType<T> = T extends ICanvasPlugin<infer U> ? U : never

// 合并多个插件的类型
type MergePluginTypes<T extends any[]> = T extends [infer First, ...infer Rest]
  ? ExtractPluginType<First> & MergePluginTypes<Rest>
  : {}
