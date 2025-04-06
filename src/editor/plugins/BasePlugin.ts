import { Canvas } from '@/editor'

export abstract class BasePlugin {
  protected ctx: CanvasRenderingContext2D
  protected canvas: Canvas

  setContext(canvas: Canvas) {
    this.ctx = canvas.getContext()
    this.canvas = canvas
  }
}
