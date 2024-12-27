/**
 * 绘图历史
 * @property _id 历史id
 * @property user_id 用户id
 * @property workflow_id 工作流id
 * @property prompt_id 提示id
 * @property params 参数
 * @property created_at 创建时间
 * @property options 选项
 * @property status 状态，0未完成 1 已完成 2 异常出错 3任务取消 4 任务已经开始
 * @property output 结果
 * @property output 结果
 * @property type 类型
 * @property is_deleted 是否删除
 * @property is_public 是否公开
 * @property tags 标签
 * @property message 任务执行的错误信息
 * @property comment 评论
 */
export interface IDrawHistoryItem {
    _id?: string
    user_id?: User
    workflow_id?: string
    prompt_id?: string
    params?: IComfyUIProperties,
    created_at?: number
    options?: IComfyUIOptions
    status?: 0 | 1 | 2 | 3 |4 // 0未完成 1 已完成 2 异常出错 3任务取消 4 任务开始
    output?: string[]
    type?: IOutputType
    is_deleted?: boolean
    is_public?: boolean
    tags?: string[]
    mediaSize?: IMediaSize
    message?: string   //任务执行的错误信息
    comment?: IComment[]
    power?: number
    income?: number
    incomeRMB?: number
}

export type IDrawHistoryItemCreat =MakeRequired<Omit<IDrawHistoryItem,'user_id'> & {user_id:string},'user_id'|'workflow_id'>



/**
 * 自定会绘图接口提交参数
 */
export interface IComfyUIRequestParams {
    params: IComfyUIProperties;
    options?: IComfyUIOptions;
}

/**
 * 绘图参数
 * @property task_id 任务id
 * @property source 调用来源
 * @property apisource 使用的api源，默认default,使用sd3官方API绘图时传sd3
 * @property lifo 优先
 * @property servername 服务器名称
 * @property workflow_id 工作流Id
 * @property workflow_name 工作流名称,使用自定义工作流必须
 * @property workflow_title 工作流名称-中文
 * @property result_retrieval 结果取回方式promise和websocket两种
 *
 */
export interface IComfyUIOptions {
    task_id?: string
    source?: 'web' | 'wechat';  //默认web,web端调用不需要传值
    apisource?: 'sd3' | 'default';    //,默认default,使用sd3官方API绘图时传sd3
    lifo?: boolean;    //优先
    servername?: string; //服务器名称
    workflow_id?: string; //工作流Id，必须参数
    workflow_name?: string; //工作流名称,使用自定义工作流必须
    workflow_title?: string; //工作流名称-中文
    server_id?: string; //服务器名称
    //结果取回方式promise和websocket两种
    result_retrieval?: 'promise' | 'websocket';  //如果这里指定了就按照指定的方式取回结果
}




export interface IComfyUIProperties {
    ckpt_name?: string
    lora_name?:string
    positive?: string
    negative?: string
    width?: number
    height?: number
    seed?: number
    seed_2?: number
    seed_3?: number
    seed_4?: number
    seed_5?: number
    image_path_origin?: string    //整个工作流只有一张图片输入，一般使用这个参数
    image_path_mask?: string   //遮罩图片
    image_path_face?: string   //换脸场景，脸部参考图片
    image_path_style?: string   //参考图场景，例如ipdapter
    denoise?: number
    segmentpart?: string   //id
    output?: string
    //视频参数
    video_frames?: number,
    fps?: number,
    motion_bucket_id?: number,
    augmentation_level?: number,
    filename_prefix?: string,
    cfg?: number,
    steps?: number,
    min_cfg?: number

    upscale_by?: number //放大倍数
    // SD3专属参数

    //自定义下拉列表
    custom_dropselect_1?: string;
    custom_dropselect_2?: string;
    custom_dropselect_3?: string;
    custom_dropselect_4?: string;
    custom_dropselect_number_1?: number
    custom_dropselect_number_2?: number
    custom_dropselect_number_3?: number
    custom_dropselect_number_4?: number

    advance_select_image_preview?: string; //高级选择组件，带图片样式预览
    advance_select_image_preview_2?: string; //高级选择组件，带图片样式预览
    advance_select_image_preview_3?: string; //高级选择组件，带图片样式预览
    advance_select_image_preview_4?: string; //高级选择组件，带图片样式预览
    advance_select_single_chips?: string; //高级选择组件，纸片组单选
    advance_select_single_chips_2?: string; //高级选择组件，纸片组单选
    advance_select_single_chips_3?: string; //高级选择组件，纸片组单选
    advance_select_single_chips_4?: string; //高级选择组件，纸片组单选
    advance_select_multi_chips?: string; //高级选择组件，纸片组多选
    advance_select_multi_chips_2?: string; //高级选择组件，纸片组多选
    advance_select_multi_chips_3?: string; //高级选择组件，纸片组多选
    advance_select_multi_chips_4?: string; //高级选择组件，纸片组多选

    // 颜色选择
    advance_select_color_1: string
    advance_select_color_2: string

    //在线遮罩编辑
    advance_onlineEdit_origin?: string    //在线遮罩编辑，原图（图像图层部分）
    advance_onlineEdit_mask?: string  //在线遮罩编辑，遮罩部分

    //生成的图像批次数量
    batch_size?: number

    //自定义数字滑块
    custom_number_slider_1?: number
    custom_number_slider_2?: number
    custom_number_slider_3?: number
    custom_number_slider_4?: number
    custom_number_slider_5?: number
    custom_number_slider_6?: number
    custom_number_slider_7?: number
    custom_number_slider_8?: number
    custom_number_slider_9?: number
    custom_number_slider_10?: number

    //     自定义参数
    custom_number_1?: number
    custom_string_1?: string
    custom_number_2?: number
    custom_string_2?: string
    custom_number_3?: number
    custom_string_3?: string
    custom_number_4?: number
    custom_string_4?: string
    custom_number_5?: number
    custom_string_5?: string
    custom_number_6?: number
    custom_string_6?: string

    // 自定义批量处理
    custom_batch_image_path_origin?: string

    //自定义提示信息
    custom_hint_1?: string
    custom_hint_2?: string
    custom_hint_3?: string
    custom_hint_4?: string
    custom_hint_5?: string
    custom_hint_6?: string
}

/**
 * @property _id 工作流id
 * @property title 显示名称
 * @property name 标准名称，需要保持唯一
 * @property params 参数
 * @property workflow 工作流
 * @property cover 封面图
 * @property preview 预览图
 * @property is_public 是否公开
 * @property description 工作流描述
 * @property power   算力消耗
 * @property nodeCount 节点数
 * @property runTime 运行时间，秒
 * @property sortNumber 排序
 * @property tags 应用标签
 * @property useGuide 使用指导图，显示在工作流的使用页面
 * @property includeServers 指定运行的服务器名
 * @property excludeServers 排除运行的服务器名
 * @property user 用户
 * @property type 工作流类型
 * @property mainProducts 代表作
 * @property comment 评论
 * @property organizations 所属组织
 * @property salePrice 销售价格
 * @property updated_at 更新时间
 * @property application_id  所属应用
 * @property editor_model 0表示创造新内容， 1表示编辑已有内容
 * @property prem_level_min 默认为空，表示无需权限层级，有值时表示需要相应的权限层级才可以访问
 */
export interface IWorkFlow {
    _id: string
    title?: string //显示名称
    name: string  //标准名称，需要保持唯一
    params: IWorkflowParam[] //参数
    workflow: string  //工作流
    cover?: string  //封面图
    preview?: string  //预览图
    is_public?: boolean //是否公开
    description?: string //工作流描述
    power?: number //   算力消耗
    nodeCount?: number //节点数
    runTime?: number  //运行时间，秒
    sortNumber?: number //排序
    tags?: string[] //应用标签
    useGuide?: string; //使用指导图，显示在工作流的使用页面
    includeServers?: string[]; //指定运行的服务器名
    excludeServers?: string[]; //排除运行的服务器名
    user?: IUser
    type?: IWorkFlowTypeEnum // 工作流类型
    mainProducts?: string[]; //代表作
    comment?: IComment[]; //评论
    organizations?: string[]; //所属组织
    salePrice?: number; //销售价格
    updated_at?: number; //更新时间
    application_id?: string[]; //所属应用
    editor_model?:0|1 //editor_model 0表示创造新内容， 1表示编辑已有内容
    prem_level_min?: number; // 默认为空，表示无需权限层级，有值时表示需要相应的权限层级才可以访问
    cover_mediaSize?: IMediaSize; //默认web封面的媒体尺寸
}

/**
 * 媒体尺寸
 * @property width 宽度
 * @property height 高度
 * @property type 资源类型，image/video/audio
 * @property status 资源状态，0未计算,1已计算,2资源异常
 */
export interface IMediaSize {
    width: number | string
    height: number | string
    type: IFileType;
    status: 0 | 1 | 2; //0未计算,1已计算,2资源异常

}

/**
 * 工作流参数
 * @property title 显示名称，参数显示的名称
 * @property name 节点对应的参数名称
 * @property type 参数类型，["节点编号|节点名称“，”属性信息“]
 * @property node 节点
 * @property param 默认参数
 * @property timeout 时间秒
 */
export interface IWorkflowParam {
    title: string,   //显示名称，参数显示的名称
    name: keyof IComfyUIProperties,   //节点对应的参数名称
    type: string[],  //["节点编号|节点名称“，”属性信息“
    node?: string  //节点
    nodeClass?: string  //节点英文名称
    nodeKey?: string  //节点key
    param?: string | number | boolean  //默认参数
    timeout?: number   //时间秒
    outputType?: IOutputType,
    attributes?: string
    hint?: string
}
/**
 * 用户信息
 * @property _id 用户id
 * @property nickname 用户名
 * @property password 密码
 * @property username 用户名
 * @property wx_openid 微信openid
 * @property wx_unionid 微信unionid
 * @property avatar_url 头像url
 * @property email 邮箱
 * @property inviter_uid 邀请人id
 * @property last_login_date 最后一次登录时间
 * @property register_date 注册时间
 * @property last_login_ip 最后一次登录ip
 * @property mobile 手机号
 * @property my_invite_code 我的邀请码
 * @property role 用户角色
 * @property token 登录token
 * @property socket_id 用户socket id
 * @property status 用户状态
 * @property balance 用户余额
 */
export interface IUser {
    _id: string;
    nickname?: string;
    password?: string;
    username: string;
    wx_openid?: string;
    wx_unionid?: string;
    avatar_url?: string;
    email?: string;
    inviter_uid?: string | IUser;
    last_login_date?: number;
    register_date?: number;
    last_login_ip?: string;
    mobile?: string;
    my_invite_code?: string[];
    role?: string[];
    token?: string;
    refresh_token?: string;
    socket_id?: string;
    status?: 0 | 1 | 2;//0:正常，1:禁用，2:删除
    balance?: number; //余额
    points?: number; //积分
    organizations?: string[]; //组织id列表
    totalPower?: number; //总积分
}

/**
 * 输出类型
 */
export type IOutputType = 'image' | 'video' | 'text' | 'audio' | '3d'
export type IFileType = 'image' | 'audio' | 'video' | 'text' | '3d';

/**
 * 工作流类型
 * @property system 系统级别，内置工作流
 * @property common 公共级别，用户共享工作流
 * @property personal 个人级别，创作者工作流
 */
export enum IWorkFlowTypeEnum {
    system = 'system', // 系统级别，内置工作流
    common = 'common', // 公共级别，用户共享工作流
    personal = 'personal', //个人级别，创作者工作流
}

/**
 * 评论信息
 * @property _id 评论id
 * @property rootId 根评论id
 * @property replyTo 回复的评论ID
 * @property content 评论内容
 * @property author 评论者
 * @property targetType 评论对象的类型 (应用｜作品)
 * @property targetId 评论对象的ID
 * @property deleteFlag 删除标记
 * @property created_at 创建时间
 * @property likeCount 点赞数
 * @property authorFlag 作者标记
 * @property replies 回复评论
 */
export interface IComment {
    _id?: string;
    rootId?: string;
    replyTo?: IUser | string; // 回复的评论ID
    content: string; // 评论内容
    author?: IUser; // 评论者
    targetType: ICommentTypeEnum; // 评论对象的类型 (应用｜作品)
    targetId?: string; // 评论对象的ID
    deleteFlag?: boolean; // 删除标记
    created_at?: number; // 创建时间
    likeCount?: number; // 点赞数
    authorFlag?: boolean; // 作者标记
    replies?: IComment[]; // 回复评论
}

/**
 * 评论类型
 * @property app 应用（工作流）
 * @property work 作品
 */
export enum ICommentTypeEnum {
    app = 'app', // 应用（工作流）
    work = 'work', // 作品
}

/** 动态参数 */
export interface IDynamicOptions{
    min?:number
    max?:number
    step?:number
    hint?:string
    required?:boolean
    imageSelectItems?:IImageSelectItem[]
    selectItems?:ISlectOption[]
}

/** picker 选项 */
export interface ISlectOption{
    label:string
    value:string | number | boolean
}

/** 预览选择组件参数 */
export interface IImageSelectItem{
    src:string
    title:string
    value:string | number | boolean
}

/**
 * 用户信息
 * @property _id 用户id
 * @property nickname 用户名
 * @property password 密码
 * @property username 用户名
 * @property wx_openid 微信openid
 * @property wx_openid_mp 微信小程序openid
 * @property wx_unionid 微信unionid
 * @property avatar_url 头像url
 * @property email 邮箱
 * @property inviter_uid 邀请人id
 * @property last_login_date 最后一次登录时间
 * @property register_date 注册时间
 * @property last_login_ip 最后一次登录ip
 * @property mobile 手机号
 * @property my_invite_code 我的邀请码
 * @property role 用户角色
 * @property token 登录token
 * @property socket_id 用户socket id
 * @property status 用户状态
 * @property balance 用户余额
 */
export interface User {
    _id: string;
    nickname?: string;
    password?: string;
    username: string;
    wx_openid?: string;
    wx_openid_mp?: string;
    wx_unionid?: string;
    avatar_url?: string;
    email?: string;
    inviter_uid?: string | User;
    last_login_date?: number;
    register_date?: number;
    last_login_ip?: string;
    mobile?: string;
    my_invite_code?: string[];
    role?: string[];
    token?: string;
    refresh_token?: string;
    socket_id?: string;
    status?: 0 | 1 | 2;//0:正常，1:禁用，2:删除
    balance?: number; //余额
    points?: number; //积分
    organizations?: string[]; //组织id列表
    totalPower?: number; //总积分
}


/**
 * 绘画任务状态
 */
export interface IDrawTaskStatus {
    task_id: string,
    status?:'progressing'|'success'|'failed'|'started'
    progress: number,
    server: string,
    queue: number,
    time_remained: number
    message?: string
    data:IDrawResponse
}
/**  绘图任务结果 */
export interface IDrawResponse {
    status: 'submitted' | 'success' | 'failed' | "rejected"; //增加一个reject,队列超出限制的时候返回
    output?: string[]; //数组，图像url,如果使用批次则是多张图，不适用批次为单张图
    type?: 'text' | 'image' | 'video' | 'audio'; //输出文件类型
    message?: string;  //错误消息
}


export interface SocketState {
    socket: UniNamespace.SocketTask | null;   // WebSocket 实例或 null
    isInitialized:boolean
    // isConnected: boolean;       // 是否已连接
    // isOpen: boolean;            // WebSocket 是否打开
    // isClosed: boolean;          // WebSocket 是否关闭
    // error: Error | null;        // 错误信息，如果有的话
}

/**
 * 用于从一个类型中排除一个或多个属性
 *
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type MakeRequired<T, K extends keyof T> = Partial<T> &
    Required<Pick<T, K>>;


/**
 *  支付订单
 *  @property _id 订单id
 *  @property user_id 用户id
 *  @property out_trade_no 订单号
 *  @property product_id 商品id
 *  @property channel 支付渠道
 *  @property amount 金额
 *  @property order_status 0:未支付 1:已支付 2:已退款;
 *  @property order_create_time 订单创建时间
 *  @property order_pay_time 订单支付时间
 *  @property transaction_id 交易流水号
 *  @property trade_type 交易类型
 *  @property payer 支付者
 */
export interface IPayOrder {
    _id: string;
    user_id: string; //user_id,用户id
    out_trade_no: string; //订单号
    product_id: IProduct;
    channel: string; //支付渠道
    amount: IAmount; //金额
    order_channel: IPayChannel; //订单状态
    wx_prepay_id: string; //微信预支付交易会话标识，有效期为2小时，失效后需要重新请求该接口以获取新的prepay_id。
    wx_prepay_expires_time: number; //微信预支付交易会话标识的有效时间，单位为秒。
    order_status: 0 | 1 | 2; //0:未支付 1:已支付 2:已退款;
    order_create_time: number;
    order_pay_time: number;
    transaction_id: string;
    trade_type: string;
    payer: IPayer;  //支付者
}

/** 支付渠道 */
export const enum IPayChannel {
    WEB = 'WEB',
    MP_WEIXIN = 'MP_WEIXIN',
    APP_ANDROID = 'APP_ANDROID',
    APP_IOS = 'APP_IOS',
}

/** 微信小程序创建支付订单 */
export type IPayOrderCreatWechatMiniProgramPay =Omit<MakeRequired<IPayOrder, 'amount'|'payer'|'user_id'|'product_id'|'order_channel'>,'product_id'> & {product_id:string}

interface IAmount {
    total: number;
    payer_total?: number;
    currency?: string;
    payer_currency?: string;
}

interface IPayer {
    openid: string;
    socketid?: string;
}

/**
 * 支付签名参数
 * @property appId 应用ID
 * @property nonceStr 随机串，长度为32个字符
 * @property package 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
 * @property paySign 签名，具体签名方案参见微信公众号支付帮助文档;
 * @property signType 签名方式，默认为'RSA'
 * @property timeStamp 时间戳，即生成的订单的时间戳，取系统时间，单位为秒,如：1368697192
 */
export interface IWechatPrePay{
    appId: string,
    nonceStr:string,
    package: string,
    paySign: string,
    signType: 'RSA',
    timeStamp:string
}
/**
 * 产品项目接口
 * @property name 套餐名称
 * @property desc 套餐描述
 * @property amount 套餐金额
 * @property balance 套餐余额
 * @property extra_balance 额外赠送算力
 * @property organization_id 关联组织ID
 * @property application_ids 关联应用程序ID数组
 * @property status 状态：0-无效 1-有效
 * @property valid_time 有效时长，单位：天
 */
export interface IProduct {
    _id:string;
    name: string; // 套餐名称
    desc?: string; // 套餐描述
    amount: number; // 套餐金额
    balance?: number;
    extra_balance?: number; // 额外赠送算力
    organization_id?: IOrganization; // 关联组织设定，通过关联组织设定，充值成功后添加到相应的组织
    application_ids: IApplication[]; // 关联应用程序
    status?: 0 | 1; // 状态：0-无效 1-有效
    valid_time?: number; // 有效时长，单位：天
}


export interface IOrganization {
    _id?: string
    name: string
    description?: string
    parent?: string
    level?: number //权限等级
    workflows?: string[] | IWorkFlow[]
    users?: string[] | User[]
    created_at?: number
    children?: IOrganization[]
}

/**
 * 应用类型是系统自带的应用还是用户自定义的应用
 * @readonly
 * @property {string} SYSTEM 系统应用
 * @property {string} USER 用户自定义的应用
 */
export enum IApplicationTypeEnum {
    SYSTEM = 'system',
    USER = 'user',
}

/**
 * 应用运行的平台
 * @readonly
 */
export enum IApplicationPlatformEnum {
    WEB = 'web',
    WX_MP = 'wx_mp',
    APP_ANDROID = 'app_android',
    APP_IOS = 'app_ios',
    OTHERS = 'others',
}

export interface IApplication {
    _id: string;
    name: string;
    type: IApplicationTypeEnum; // 应用类型枚举
    platform: IApplicationPlatformEnum; // 平台枚举
    version: string; // 应用版本
}

/**
 * 会员信息
 * @property _id 唯一标识
 * @property user_id 关联的 User 对象的 ID
 * @property org_id 关联的 Organization 对象的 ID
 * @property expire_date 过期日期（时间戳）
 * @property create_date 创建日期（时间戳）
 */
export interface IMember {
    _id: string; // 唯一标识
    user_id: User;  // 关联的 User 对象的 ID
    org_id: IOrganization;   // 关联的 Organization 对象的 ID
    expire_date: number; // 过期日期（时间戳）
    create_date: number; // 创建日期（时间戳）
}


/**
 * 微信小程序配置页面配置
 */
export interface IMiniProgramContent {
    home_banner: IBanner[];
}

/**
 * 首页banner
 * @property src 图片链接
 * @property href 点击后跳转的链接
 * @property label 标签,文本说明
 */
export interface IBanner {
    src: string;
    href: string;
    label: string;
}


// /** 通用支付参数 */
// export interface IPaymentParams {
//     provider: string; //订单ID
//     order_title: string; //订单标题
//     order_price: number; //订单价格，单位：分
//     order_desc?: string; //订单描述
//     open_id?: string; //微信支付时需要
// }
//
// /** 通用支付回调参数 */
// export interface IPaymentCallbackParams {
//     order_id: string; //订单ID
//     order_title: string; //订单标题
//     order_price: number; //订单价格，单位：分
//     order_desc?: string; //订单描述
//     pay_time?: string; //支付时间
//     open_id?: string; //微信支付时需要
// }