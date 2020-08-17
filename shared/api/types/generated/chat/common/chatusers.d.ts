export declare class ChatUsersApi {
    private http;
    /**
     * 获取聊天用户
     * @method GET 获取聊天用户
     *
     */
    chatusers(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前聊天用户黑名单
     * @method GET 获取当前聊天用户黑名单
     *
     */
    blacklist(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前聊天用户对象
     * @method GET 获取当前聊天用户对象
     *
     */
    me(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取客服聊天用户
     * @method GET 获取客服聊天用户
     *
     */
    customerservice(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 屏蔽聊天用户,取消屏蔽聊天用户
     * @method PUT 屏蔽聊天用户
     * @method DELETE 取消屏蔽聊天用户
     *
     * @params id 聊天用户Id
     */
    block(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 查看是否被用户屏蔽
     * @method HEAD 查看是否被用户屏蔽
     *
     * @params id 聊天用户Id
     */
    blocked(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default ChatUsersApi;
