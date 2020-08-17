/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('PayoutsApi')
export class PayoutsApi {
    @api('payment_api_v1') private http: HttpFactory;

    /**
     * 创建支付,获取支付列表
     * @method POST 创建支付
     * @method GET 获取支付列表
     *
     */
    payouts() {
        return this.http
            .url(`/payouts`)
            .addSecurityHeaders()
            .support('POST', 'GET');
    }
}

export default PayoutsApi;
