export declare class ChatUsersApi {
    private http;
    /**
     * 获取聊天用户
     * @method GET 获取聊天用户
     *
     */
    chatusers(): any;
    /**
     * 获取当前聊天用户黑名单
     * @method GET 获取当前聊天用户黑名单
     *
     */
    blacklist(): any;
    /**
     * 获取当前聊天用户对象
     * @method GET 获取当前聊天用户对象
     *
     */
    me(): any;
    /**
     * 获取客服聊天用户
     * @method GET 获取客服聊天用户
     *
     */
    customerservice(): any;
    /**
     * 屏蔽聊天用户,取消屏蔽聊天用户
     * @method PUT 屏蔽聊天用户
     * @method DELETE 取消屏蔽聊天用户
     *
     * @params id 聊天用户Id
     */
    block(id: any): any;
    /**
     * 查看是否被用户屏蔽
     * @method HEAD 查看是否被用户屏蔽
     *
     * @params id 聊天用户Id
     */
    blocked(id: any): any;
}
export default ChatUsersApi;
