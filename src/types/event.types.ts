import type {IDrawTaskStatus} from "@/types/index.ts";

export const enum EventType {
    /**
     * 支付事件
     */
    PAY_SUCCESS = 'paySuccess',
    PAY_PENDING = 'payPending',
    PAY_FAILURE = 'payFailure',

    PAY_ORDER_CREATED = 'payOrderCreated',
    PAY_ORDER_UPDATED = 'payOrderUpdated',
    // 网络请求相关
    HTTP_SSR_ERROR = 'httpSsrError',
    HTTP_CSR_ERROR = 'httpCsrError',

    //登录相关
    AUTH_LOGIN_SUCCESS = 'authLoginSuccess',
    AUTH_LOGIN_FAILURE = 'authLoginFailure',
    AUTH_LOGOUT = 'authLogout',

    //token验证x
    AUTH_TOKEN_NOTEXIST = 'authTokenNotExist',
    AUTH_TOKEN_INVALID = 'authTokenInvalid',
    AUTH_TOKEN_EXPIRED = 'authTokenExpired',
    AUTH_REFESHTOKEN_NOTEXIST = 'authRefreshTokenNotExist',


    //绘图进度消息
    DRAW_PROGRESS = 'drawProgress',

    //Toast提示
    TOAST_MESSAGE = 'toastMessage',
}

export type Events = {
    [EventType.PAY_SUCCESS]: {
        order_id:string
    };
    [EventType.PAY_PENDING]: {
        order_id:string
    };
    [EventType.PAY_FAILURE]: {
        order_id:string,
        error:string
    };
    [EventType.PAY_ORDER_CREATED]: null;
    [EventType.PAY_ORDER_UPDATED]: null;
    [EventType.HTTP_SSR_ERROR]: {
        errorMsg:string,
        statusCode:number
    };
    [EventType.HTTP_CSR_ERROR]: {
        errorMsg:string,
        statusCode:number
    };
    [EventType.AUTH_LOGIN_SUCCESS]: {
        user:any,
        token:string
    };
    [EventType.AUTH_LOGIN_FAILURE]: null;
    [EventType.AUTH_LOGOUT]: null;
    [EventType.AUTH_TOKEN_NOTEXIST]: null;
    [EventType.AUTH_TOKEN_INVALID]: null;
    [EventType.AUTH_TOKEN_EXPIRED]: null;
    [EventType.AUTH_REFESHTOKEN_NOTEXIST]: null;

    [EventType.DRAW_PROGRESS]: IDrawTaskStatus;

    [EventType.TOAST_MESSAGE]: {
        message:string,
        duration?:number
    };
};