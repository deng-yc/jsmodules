export declare class WorkOrdersApi {
    private http;
    /**
     * 创建工单,获取工单
     * @method POST 创建工单
     * @method GET 获取工单
     *
     */
    workorders(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取工单详情
     * @method GET 获取工单详情
     *
     * @params id 工单Id
     */
    workordersById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取工单评论
     * @method GET 获取工单评论
     *
     * @params id 工单Id
     */
    comments(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default WorkOrdersApi;
