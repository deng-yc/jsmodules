/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('AlipayApi')
export class AlipayApi {
    @api('payment_api_v1') private http: http.HttpFactory;

    /**
     * 支付宝App下单结果通知
     * @method POST 支付宝App下单结果通知
     *
     */
    callback() {
        return this.http
            .url(`/alipay/app/callback`)
            .support('POST');
    }
}

export default AlipayApi;
