import {
  type IComfyUIProperties,
  type IComfyUIRequestParams,
  type IDrawHistoryItem,
  type IDrawHistoryItemCreat,
  type IDrawResponse,
  type IDrawTaskStatus,
  type IWebSocketParams,
  IWebsocketSceneType,
  type IWorkFlow,
  type IWorkflowParam,
  type SocketState,
} from '@/types'
import { computed, ref, inject } from 'vue'
import { getBaseWsURL, request } from '@/utils/request.ts'
import type { ParamToComponentMapping } from '@/pages/draw/apps/apps.vue'
import { getLoginInfo, isLogin, refreshUserInfo } from '@/composables/useCommon.ts'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore.ts'
import { emit } from '@/utils/emitter.ts'
import { EventType } from '@/types/event.types.ts'
import { parseJSONToObject } from '@/utils/common.ts'

export interface SocketInitOptions {
  params?: IWebSocketParams
  forceReConnect?: boolean
  onConnect?: () => void
  onReconnect?: (attemptNumber: number) => void
  onReconnectFailed?: () => void
  onDisconnect?: (reason?: string) => void
  onConnectError?: (error: any) => void
  onConnectTimeout?: () => void
  onMessage?: (msg: any) => void
  onPayMessage?: (msg: any) => void
}

/** 提交自定义工作流 */
export const submitCustomWorkflow = (data: IComfyUIRequestParams) =>
  request<IDrawResponse>('/draw/customWorkflow', {
    method: 'POST',
    data,
  })

/** 根据工作流的ID获取大模型清单 **/
export const getModelListByWorkflowId = (workflow_id: string) =>
  request<string[]>(`/draw/getModelListById/${workflow_id}`)
/** 创建任务 **/

export const creatDrawHistoryTask = (data: IDrawHistoryItem) =>
  request<IDrawHistoryItem>('/draw/history', {
    method: 'POST',
    data,
  })

export default function useWorkFlow() {
  const workflow = ref<IWorkFlow>({} as IWorkFlow)

  /** 工作流的参数列表 */
  const params_component_list = [
    { param: 'seed', component: 'Seed', title: '随机种子' },
    { param: 'seed_2', component: 'Seed', title: '随机种子' },
    { param: 'seed_3', component: 'Seed', title: '随机种子' },
    { param: 'seed_4', component: 'Seed', title: '随机种子' },
    { param: 'seed_5', component: 'Seed', title: '随机种子' },
    { param: 'ckpt_name', component: 'ModeSelect', title: '大模型选择' },
    { param: 'positive', component: 'Positive', title: '正向提示词' },
    { param: 'width', component: 'Width', title: '图片宽度' },
    { param: 'height', component: 'Height', title: '图片高度' },
    { param: 'batch_size', component: 'CustomNumberBox', title: '生成批次' },
    { param: 'image_path_origin', component: 'ImageUpload', title: '原图上传' },
    { param: 'image_path_mask', component: 'ImageUpload', title: '遮罩上传' },
    { param: 'image_path_face', component: 'ImageUpload', title: '参考上传' },
    { param: 'image_path_style', component: 'ImageUpload', title: '参考上传' },
    {
      param: 'advance_select_image_preview',
      component: 'ImageSelectPreview',
      title: '高级-图像预览选择',
    },
    {
      param: 'advance_select_image_preview_2',
      component: 'ImageSelectPreview',
      title: '高级-图像预览选择',
    },
    {
      param: 'advance_select_image_preview_3',
      component: 'ImageSelectPreview',
      title: '高级-图像预览选择',
    },
    {
      param: 'advance_select_image_preview_4',
      component: 'ImageSelectPreview',
      title: '高级-图像预览选择',
    },
  ] as ParamToComponentMapping[]
  /** 绘图参数 */
  const bindParam = ref<IComfyUIProperties>({})
  const handleGetWorkFlwById = async (id: string) => {
    workflow.value = await request<IWorkFlow>(`/workflow/${id}`)
    handleWorkFlowParamsToBindParam()
  }
  /** 本地绘画任务列表*/
  const { localTasks } = storeToRefs(useAppStore())

  /** 工作流的参数列表,过滤点产出节点 */
  const workFlowParamLists = computed<IWorkflowParam[]>(() => {
    if (!workflow.value || !workflow.value.params) {
      return []
    }
    return workflow.value.params.filter(item => item.name !== 'output') as IWorkflowParam[]
  })

  /** 产互类型参数 */
  const outputType = computed(() => {
    if (!workflow.value || !workflow.value.params) {
      return 'image'
    }
    return workflow.value.params.find(item => item.name === 'output')?.outputType || 'image'
  })

  /** 根据参数名称找组件名称  */
  const handleFindComponentName = (param: keyof IComfyUIProperties) => {
    const component = params_component_list.find(item => item.param === param)
    return component?.component
  }

  /** 将工作流的默认参数赋值给bindParams */
  const handleWorkFlowParamsToBindParam = () => {
    if (!workflow.value || !workflow.value.params) {
      return
    }
    workflow.value.params.forEach(item => {
      bindParam.value[item.name] = item.param
    })
  }

  const socketState = inject<SocketState>('socketState')
  if (!socketState) {
    throw new Error('socketState is not provided')
  }

  const closeSocketAsync = () => {
    return new Promise(resolve => {
      uni.closeSocket({
        code: 1000,
        reason: 'Initializing new WebSocket',
        success(result) {
          resolve(true)
        },
        fail(result) {
          resolve(false)
        },
      })
    })
  }

  const socketInit = async (
    options: SocketInitOptions = {
      params: {
        type: IWebsocketSceneType.drawProcessPush,
        data: { scene_str: '' },
      },
    }
  ) => {
    //如果未登录状态，不初始化WebSocket
    if (!isLogin.value) {
      throw new Error('未登录状态，不允许初始化Websocket')
    }
    console.log('socket init execution，status', socketState.socket?.readyState)
    if (socketState?.isInitialized && socketState.options?.params?.type === options.params?.type) {
      console.log('WebSocket is already initialized')
      return
    }
    if (socketState?.isInitialized && socketState?.options.params?.type !== options.params?.type) {
      //说明场景不一样，需要重新初始化
      console.log('WebSocket is already initialized,but scene is different,reinitialize')
      await closeSocketAsync()
      socketState.isInitialized = false
    }

    const { params } = options
    const { type, data } = params as IWebSocketParams

    const { uniPlatform } = uni.getSystemInfoSync()
    socketState.socket = uni.connectSocket({
      url: `${getBaseWsURL()}?user_id=${getLoginInfo()._id}&type=${type}&platform=${uniPlatform}&data=${data}`,
      complete: () => {
        console.log('WebSocket connect complete')
      },
    })
    socketState.isInitialized = true
    uni.onSocketOpen(result => {
      console.log('WebSocket opened', result)
      // 保存options
      socketState.options = options
      if (options.onConnect) {
        options.onConnect()
      }
    })
    uni.onSocketMessage(msg => {
      if (options.onMessage) {
        options.onMessage(msg.data)
      }
      handleSocketMessage(msg.data)
    })
    uni.onSocketError(err => {
      console.error('WebSocket onError', err)
      socketState.isInitialized = false
      if (options.onConnectError) {
        options.onConnectError(err)
      }
    })
    uni.onSocketClose(() => {
      socketState.isInitialized = false
      console.log('WebSocket onClose')
      if (options.onDisconnect) {
        options.onDisconnect()
      }
    })
  }

  /** 握手消息 */
  const handleSocketHandShake = (timeout = 200) => {
    return new Promise(resolve => {
      const timeoutID = setTimeout(() => {
        resolve(false)
      }, timeout)
      if (!socketState || !socketState.socket || !socketState.isInitialized) {
        resolve(false)
        return
      }
      socketState.socket?.send({
        data: 'ping',
        success(result) {
          console.log(result)
          clearTimeout(timeoutID)
          resolve(true)
        },
      })
    })
  }
  /** 处理Websocket消息 */
  const handleSocketMessage = (msg: never, callback?: (messageObj: never) => void) => {
    console.log('原始消息', msg)
    const msgObj = parseJSONToObject<{ type: never; data: never; queue_status: IDrawTaskStatus }>(
      msg
    )
    //自定义回调
    if (callback) {
      callback(msgObj)
    }
    const { queue_status } = msgObj

    if (!queue_status) {
      return
    }
    // 从websocket消息中获取output
    const index = localTasks.value.findIndex(item => item._id === queue_status.task_id)
    if (index !== -1) {
      if (queue_status.progress) localTasks.value[index].progress = queue_status.progress
      if (queue_status.queue) localTasks.value[index].queue = queue_status.queue
      if (queue_status.time_remained !== undefined)
        localTasks.value[index].time_remained = queue_status.time_remained
      if (queue_status.message) localTasks.value[index].message = queue_status.message
    }
    if (queue_status.status === 'started' && index !== -1) {
      localTasks.value[index].status = 4
      localTasks.value[index].message = '任务开始'
    }
    if (queue_status.status !== 'failed' && index !== -1 && localTasks.value[index].status === 3) {
      localTasks.value[index].status = 0
      localTasks.value[index].message = queue_status.message
    }
    if (queue_status.status === 'success' && index !== -1 && localTasks.value[index].status !== 1) {
      localTasks.value[index].output = queue_status?.data?.output || []
      localTasks.value[index].type = queue_status?.data?.type || 'image'
      localTasks.value[index].status = 1
      refreshUserInfo().then()
    }
    if (queue_status.status === 'failed') {
      if (index !== -1 && localTasks.value[index].status !== 2) {
        localTasks.value[index].status = 2
        localTasks.value[index].message = queue_status.message
      }
    }
  }

  /** 创建任务 */
  const handleCreateTask = async () => {
    const item: IDrawHistoryItemCreat = {
      params: { ...bindParam.value },
      workflow_id: workflow.value._id,
      user_id: getLoginInfo()._id,
      options: {
        workflow_id: workflow.value._id,
        workflow_title: workflow.value.title,
        workflow_name: workflow.value.name,
      },
      type: outputType.value,
    }
    return await creatDrawHistoryTask(item)
  }

  /** 更新本地任务的状态 */
  const handleUpdateTaskStatus = async (taskItem: IDrawHistoryItem, output: IDrawResponse) => {
    const index = localTasks.value.findIndex(item => item._id === taskItem._id)
    if (index !== -1) {
      localTasks.value[index].output = output.output
      localTasks.value[index].status = 1
      localTasks.value = [...localTasks.value]
    }
  }

  /** 提交绘画任务到服务器 */
  const handleSubmitTaskTask = async () => {
    if (!isLogin.value) {
      uni.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!(await handleSocketHandShake())) {
      await socketInit()
    }

    const newTask = await handleCreateTask()
    console.log('newTask', newTask)
    if (!newTask) {
      return
    }
    //深拷贝绘图参数
    localTasks.value.unshift(newTask)
    const requestParams: IComfyUIRequestParams = {
      params: { ...bindParam.value },
      options: {
        workflow_id: workflow.value._id,
        task_id: newTask._id, //重要，已经创建任务的时候传入任务ID，否则系统会新建
      },
    }
    const result = await submitCustomWorkflow(requestParams)
    if (result.status === 'success' && result.output && result.output.length > 0) {
      await handleUpdateTaskStatus(newTask, result)
      refreshUserInfo().then()
    }
    if (result.status === 'failed' || result.status === 'rejected') {
      uni.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000,
      })
    }
  }

  return {
    workflow,
    workFlowParamLists,
    bindParam,
    params_component_list,

    socketInit,
    // socketState,
    // closeSocketAsync,

    handleFindComponentName,
    handleGetWorkFlwById,
    handleSubmitTaskTask,
  }
}
