/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('OrdersApi')
export class OrdersApi {
    @api('ordering_api_v1') private http: http.HttpFactory;

    /**
     * 获取订单列表,创建订单
     * @method GET 获取订单列表
     * @method POST 创建订单
     *
     */
    orders() {
        return this.http
            .url(`/orders`)
            .addSecurityHeaders()
            .support('GET', 'POST');
    }

    /**
     * 计算订单
     * @method POST 计算订单
     *
     */
    calculate() {
        return this.http
            .url(`/orders/calculate`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 获取订单详情
     * @method GET 获取订单详情
     *
     * @params id 订单Id
     */
    ordersById(id) {
        return this.http
            .url(`/orders/${id}`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取账单详情
     * @method GET 获取账单详情
     *
     * @params id 订单id
     */
    payment(id) {
        return this.http
            .url(`/orders/${id}/payment`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default OrdersApi;
