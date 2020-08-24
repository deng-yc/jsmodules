/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('BraintreeApi')
export class BraintreeApi {
    @api('payment_api_v1') private http: http.HttpFactory;

    /**
     * 生成client token
     * @method GET 生成client token
     *
     */
    clientToken() {
        return this.http
            .url(`/braintree/client-token`)
            .support('GET');
    }
}

export default BraintreeApi;
