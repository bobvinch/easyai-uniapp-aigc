import type {Events, EventType} from "@/types/event.types.ts";


/** 自定义事件监听 */
export const emit = <T extends EventType>(event: T, payload:Events[T]) => {
  uni.$emit(event,payload)
};

/** 自定义事件监听 */
export const on = <T extends EventType>(event: T, callback: (payload:Events[T])=>void) => {
  uni.$on(event,callback)
};

/** 监听一次 */
export const once = <T extends EventType>(event: T, callback: (payload:Events[T])=>void) => {
  uni.$once(event,callback)
};

/** 取消事件监听 */
export const off = <T extends EventType>(event: T, callback?: (payload:Events[T])=>void) => {
  uni.$off(event,callback)
};