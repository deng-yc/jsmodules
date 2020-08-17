export declare class DiscountsApi {
    private http;
    /**
     * 获取折扣列表
     * @method GET 获取折扣列表
     *
     */
    discounts(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取折扣详情
     * @method GET 获取折扣详情
     *
     * @params id 折扣Id
     */
    discountsById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 领取优惠卷
     * @method GET 领取优惠卷
     *
     * @params id 折扣Id
     */
    coupon(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default DiscountsApi;
//# sourceMappingURL=discounts.d.ts.map