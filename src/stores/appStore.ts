import {defineStore} from "pinia";
import type {IDrawHistoryItem, IDrawTaskStatus, IWorkFlow, Omit, User} from "@/types";
import {request} from "@/utils/request.ts";
import {getApps} from "@/composables/useCommon.ts";


export const useAppStore = defineStore('app', {
    state: () => ({
        showExecuting: false,    //显示任务正在执行的得进度提示

        workflows_all:[] as IWorkFlow[] ,  //所有的工作流
        home_tagActiveIndex: 0,   //首页激活的tag编号
        home_tagsList:[] as {name:string,count:number}[],
        tabbarIndex: 0,  //底部菜单栏的index
        user:{} as User,
        localTasks: [] as (IDrawHistoryItem & Omit<IDrawTaskStatus, 'status'> & { abortController?: AbortController })[],    //本地的任务

          //     展示支付页面
          showPay: false,
        }),
  actions: {
      init(){
    this.getUser()
},
toggleShowExecuting() {
    this.showExecuting = !this.showExecuting;
},
async initWorkFlows_All() {
    this.workflows_all = await getApps()
},
setUser(user:Partial<User>){
            this.user={...this.user,...user}   //避免覆盖其他属性
            uni.setStorageSync('user',JSON.stringify(this.user))
        },
        clearUser(){
            this.user = {} as User
            uni.removeStorageSync('user')
        },
        getUser(){
            const userString = uni.getStorageSync('user')
            if(userString){
                this.user = JSON.parse(userString) as User
            }
            return this.user
        }
    }
});