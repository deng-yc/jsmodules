/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('CouponsApi')
export class CouponsApi {
    @api('marketing_api_v1') private http: http.HttpFactory;

    /**
     * 获取优惠劵列表
     * @method GET 获取优惠劵列表
     *
     */
    coupons() {
        return this.http
            .url(`/coupons`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default CouponsApi;
