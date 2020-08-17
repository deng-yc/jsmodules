/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('DiscountsApi')
export class DiscountsApi {
    @api('marketing_api_v1') private http: HttpFactory;

    /**
     * 获取折扣列表
     * @method GET 获取折扣列表
     *
     */
    discounts() {
        return this.http
            .url(`/discounts`)
            .support('GET');
    }

    /**
     * 获取折扣详情
     * @method GET 获取折扣详情
     *
     * @params id 折扣Id
     */
    discountsById(id) {
        return this.http
            .url(`/discounts/${id}`)
            .support('GET');
    }

    /**
     * 领取优惠卷
     * @method GET 领取优惠卷
     *
     * @params id 折扣Id
     */
    coupon(id) {
        return this.http
            .url(`/discounts/${id}/coupon`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default DiscountsApi;
