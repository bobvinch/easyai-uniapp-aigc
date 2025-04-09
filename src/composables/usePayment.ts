import type {IProduct} from "@/types";
import {creatOrder, getLoginInfo, getPrePay} from "@/composables/useCommon.ts";
import {IPayChannel} from "@/types";

export const usePayHandlePayment=async (product:IProduct) => {
    // 创建订单
    const user =  getLoginInfo()
    if(!user){
        throw new Error('未登录不允许支付')
    }
    const order =await creatOrder({
        user_id:user._id,
        product_id:product._id,
        amount:{
            total:product.amount,
            currency:'CNY'
        },
        payer:{
            openid:getLoginInfo().wx_openid_mp as string
        },
        order_channel:IPayChannel.MP_WEIXIN
    })
    const {nonceStr,package:_,signType,paySign,timeStamp} =await getPrePay(order._id)
    console.log("paySign",paySign)

    //调起支付
    console.log("created order",order)
    uni.requestPayment({
        provider:'wxpay',
        orderInfo:order.product_id.name,
        timeStamp,
        nonceStr,
        package:_,
        signType,
        paySign,
        success:function (res) {
            console.log('success', res)
        },
        fail:function (err) {
            console.log('fail', err)
        }
    })
}