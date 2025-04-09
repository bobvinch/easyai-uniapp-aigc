import {getLoginInfo, saveLoginInfo} from "@/composables/useCommon.ts";
import type {User} from "@/types";

export const request=<T>(apiUrl:string,options:IRequestOptions={},retry=true):Promise<T>=>{
    //判断url是否以/开头，如果没有，添加上
    const fullUrl=apiUrl.startsWith('/')?apiUrl:`/${apiUrl}`;
    return new Promise((resolve, reject) => {
        uni.request({
            url:`${getBaseURL()}${fullUrl}`,
            header:{
                Authorization: `Bearer ${getToken()}`
            },
            ...options,
            success: async (res) => {
                if(res.statusCode===401 && retry){
                    //TODO: 实现token刷新
                    const {token}=await refreshToken(<string>getRefreshToken())
                    //将刷新后的token保存到user中
                    saveLoginInfo({token})
                    console.log('刷新后获取的token',token)
                    if (token){
                        options.header={
                            Authorization: `Bearer ${token}`
                        }
                        request(apiUrl,options,false)
                            .then((res)=>{
                                resolve(res);
                            }).catch((err)=>{
                            reject(err);
                        })
                    }else {
                        reject(res);
                    }
                }else {
                    if(res.data.data){
                        resolve(res.data.data);
                    }else {
                        resolve(res.data);
                    }
                }
                },
            fail:async (err) => {
                //如果返回错误是token过期，尝试刷新token
                console.log(233333333)
            },
            complete:async (err)=>{
                console.log('请求完成',err)
            }
        })
    });
}

/** 获取刷新token */
/** 获取刷新token */
export const refreshToken = async (
    refreshToken: string,
    apiUrl = '/auth/refreshTokens',
    maxRetries: number = 3, // 默认最大重试次数
    retryInterval: number = 200, // 默认重试间隔，单位毫秒
    timeout: number = 5000 // 请求超时时间
): Promise<User> => {
    // 判断url是否以/开头，如果没有，添加上
    const apiPath = apiUrl.startsWith('/') ? apiUrl : `/${apiUrl}`;
    let attempt = 0;
    while (attempt < maxRetries) {
        attempt++;
        console.log(`尝试第 ${attempt} 次刷新Token, refreshToken:`, refreshToken);
        try {
            // 发起刷新令牌请求
            // 请求成功，返回结果
            return await new Promise<any>((resolve, reject) => {
                uni.request({
                    url: `${getBaseURL()}${apiPath}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: { refreshToken },
                    timeout,
                    success: (res) => {
                        if(res.statusCode>=400){
                            reject(res)
                        }else {
                            resolve(res.data); // 如果没有data字段，返回整个res.data
                        }
                    },
                    fail: (err) => {
                        console.error('刷新Token失败', err);
                        reject(err); // 请求失败时reject
                    }
                });
            });

        } catch (err: any) {
            if (err.name === 'AbortError') {
                console.error(`第 ${attempt} 次刷新Token超时`);
            } else {
                console.error(`第 ${attempt} 次刷新Token失败`, err);
            }
        }
        // 如果还没有超过最大重试次数，则等待一定时间后重试
        if (attempt < maxRetries) {
            console.log(`等待 ${retryInterval} 毫秒后重试...`);
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }

    // 如果超过最大重试次数仍然失败，返回 null
    console.log('刷新Token失败，已达到最大重试次数');
    return null;
};

/** 上传文件 */
export  const uploadFile=<T>(filePath:string,options:IRequestOptions={},apiUrl='/file/upload'):Promise<T>=> {
    //判断url是否以/开头，如果没有，添加上
    const fullUrl = apiUrl.startsWith('/') ? apiUrl : `/${apiUrl}`;
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: `${getBaseURL()}${fullUrl}`,
            filePath,
            name: 'file',
            header: {
                Authorization: `Bearer ${getToken()}`
            },
            ...options,
            success: async (res) => {
                if(res.statusCode===401){
                    const _refreshToken =getRefreshToken()
                    if(!_refreshToken){
                        reject(res);
                    }
                    const {token}=await refreshToken(_refreshToken)
                    //将刷新后的token保存到user中
                    saveLoginInfo({token})
                    console.log('刷新后获取的token',token)
                    if (token){
                        options.header={
                            Authorization: `Bearer ${token}`
                        }
                        uploadFile(filePath,options).then(res=>{
                            resolve(res);
                        }).catch(err=>{
                            reject(err);
                        })
                    }else {
                        reject(res);
                    }
                }else {
                    console.log('success',res)
                    const data=JSON.parse(res.data);
                    if(data.data){
                        resolve(data.data);
                    }else {
                        resolve(data);
                    }
                }

            },
            fail: async (err) => {
                console.log('fail',err)
                if(err){
                    //TODO: 实现token刷新
                    const _refreshToken =getRefreshToken()
                    if(!_refreshToken){
                        reject(err);
                    }
                    const {token}=await refreshToken(_refreshToken)
                    //将刷新后的token保存到user中
                    saveLoginInfo({token})
                    console.log('刷新后获取的token',token)
                    if (token){
                        options.header={
                            Authorization: `Bearer ${token}`
                        }
                        uploadFile(filePath,options).then(res=>{
                            resolve(res);
                        }).catch(err=>{
                            reject(err);
                        })
                    }else {
                        reject(err);
                    }
                }else {
                    reject(err)
                }
            }
        })
    });
}


export const getBaseURL =()=>import.meta.env.VITE_API_URL
export const getBaseWsURL=()=>import.meta.env.VITE_WS_URL
export const getToken =()=>getLoginInfo().token
export const getRefreshToken =()=>getLoginInfo().refresh_token


interface IRequestOptions {
    data?: any;
    header?: any;
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
    timeout?: number;
}