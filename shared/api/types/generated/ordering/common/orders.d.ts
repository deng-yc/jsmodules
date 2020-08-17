export declare class OrdersApi {
    private http;
    /**
     * 获取订单列表,创建订单
     * @method GET 获取订单列表
     * @method POST 创建订单
     *
     */
    orders(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 计算订单
     * @method POST 计算订单
     *
     */
    calculate(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取订单详情
     * @method GET 获取订单详情
     *
     * @params id 订单Id
     */
    ordersById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取账单详情
     * @method GET 获取账单详情
     *
     * @params id 订单id
     */
    payment(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default OrdersApi;
//# sourceMappingURL=orders.d.ts.map