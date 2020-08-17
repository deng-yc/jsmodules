/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('WeChatPayApi')
export class WeChatPayApi {
    @api('payment_api_v1') private http: HttpFactory;

    /**
     * 微信App下单结果通知
     * @method POST 微信App下单结果通知
     *
     */
    wxCallback() {
        return this.http
            .url(`/wechatpay/app/callback`)
            .support('POST');
    }

    /**
     * 微信小程序下单结果通知
     * @method POST 微信小程序下单结果通知
     *
     */
    wxMiniCallback() {
        return this.http
            .url(`/wechatpay/miniprogram/callback`)
            .support('POST');
    }
}

export default WeChatPayApi;
