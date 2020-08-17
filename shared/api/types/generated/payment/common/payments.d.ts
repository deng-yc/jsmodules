export declare class PaymentsApi {
    private http;
    /**
     * 获取账单列表
     * @method GET 获取账单列表
     *
     */
    payments(): any;
    /**
     * 通过支付网关开始流程
     * @method POST 通过支付网关开始流程
     *
     * @params id 账单Id
     */
    trades(id: any): any;
    /**
     * 尝试确认账单完成
     * @method POST 尝试确认账单完成
     *
     * @params id 账单Id
     */
    completeCheck(id: any): any;
}
export default PaymentsApi;
//# sourceMappingURL=payments.d.ts.map