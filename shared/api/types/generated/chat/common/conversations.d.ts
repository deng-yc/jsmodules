export declare class ConversationsApi {
    private http;
    /**
     * 获取最近会话列表
     * @method GET 获取最近会话列表
     *
     */
    recent(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取会话列表
     * @method GET 获取会话列表
     *
     */
    conversations(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取会话
     * @method GET 获取会话
     *
     * @params id 会话Id
     */
    conversationsById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取私聊会话,私聊会话是否存在
     * @method GET 获取私聊会话
     * @method HEAD 私聊会话是否存在
     *
     * @params chat_user_id 聊天用户Id
     */
    privateByChatUserId(chat_user_id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default ConversationsApi;
