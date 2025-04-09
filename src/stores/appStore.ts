import { defineStore } from 'pinia'
import type { IDrawHistoryItem, IDrawTaskStatus, IWorkFlow, Omit, User } from '@/types'
import { getApps } from '@/composables/useCommon.ts'
import { ref } from 'vue'

type IDrawHistoryItemState = IDrawHistoryItem &
  Omit<IDrawTaskStatus, 'status'> & { abortController?: AbortController }

export const useAppStore = defineStore('app', () => {
  const showExecuting = ref(false) //显示任务正在执行的得进度提示
  const workflows_all = ref<IWorkFlow[]>([])
  const home_tagActiveIndex = ref(0)
  const home_tagsList = ref([])
  const tabbarIndex = ref(0)
  const user = ref<User>({} as User)
  const localTasks = ref<IDrawHistoryItemState[]>([])
  const showPay = ref(false)

  /** 邀请码*/
  const inviteCode = ref('')

  const init = () => {
    getUser()
  }
  const getUser = () => {
    const userString = uni.getStorageSync('user')
    if (userString) {
      user.value = JSON.parse(userString) as User
    }
    return user.value
  }

  const toggleShowExecuting = () => {
    showExecuting.value = !showExecuting.value
  }

  const initWorkFlows_All = async () => {
    workflows_all.value = await getApps()
  }

  const setUser = (newUser: Partial<User>) => {
    user.value = { ...user.value, ...newUser }
    uni.setStorageSync('user', JSON.stringify(user.value))
  }

  const clearUser = () => {
    user.value = {} as User
    uni.removeStorageSync('user')
  }

  /** 邀请码*/
  const setInviteCode = (newInviteCode: string) => {
    inviteCode.value = newInviteCode
    uni.setStorageSync('inviteCode', inviteCode.value)
  }
  const getInviteCode = () => {
    const inviteCodeString = uni.getStorageSync('inviteCode')
    if (inviteCodeString) {
      inviteCode.value = inviteCodeString
    }
    return inviteCode.value
  }

  return {
    workflows_all,
    user,
    localTasks,
    showPay,
    tabbarIndex,
    home_tagActiveIndex,
    home_tagsList,

    init,
    initWorkFlows_All,
    getUser,
    setUser,
    clearUser,
    toggleShowExecuting,
    /** 邀请码*/
    setInviteCode,
    getInviteCode,
  }
})
