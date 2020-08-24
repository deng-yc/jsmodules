/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('PaymentsApi')
export class PaymentsApi {
    @api('payment_api_v1') private http: http.HttpFactory;

    /**
     * 获取账单列表
     * @method GET 获取账单列表
     *
     */
    payments() {
        return this.http
            .url(`/payments`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 通过支付网关开始流程
     * @method POST 通过支付网关开始流程
     *
     * @params id 账单Id
     */
    trades(id) {
        return this.http
            .url(`/payments/${id}/trades`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 尝试确认账单完成
     * @method POST 尝试确认账单完成
     *
     * @params id 账单Id
     */
    completeCheck(id) {
        return this.http
            .url(`/payments/${id}/complete/check`)
            .addSecurityHeaders()
            .support('POST');
    }
}

export default PaymentsApi;
