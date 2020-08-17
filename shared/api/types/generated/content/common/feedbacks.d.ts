export declare class FeedbacksApi {
    private http;
    /**
     * 创建反馈
     * @method POST 创建反馈
     *
     */
    feedbacks(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 创建批量反馈
     * @method POST 创建批量反馈
     *
     */
    batch(): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default FeedbacksApi;
