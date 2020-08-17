export declare class MessagesApi {
    private http;
    /**
     * 创建消息,获取对话消息
     * @method POST 创建消息
     * @method GET 获取对话消息
     *
     */
    messages(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取消息详情
     * @method GET 获取消息详情
     *
     * @params id 消息Id
     */
    messagesById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default MessagesApi;
