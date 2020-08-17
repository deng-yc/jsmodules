export declare class SoulsApi {
    private http;
    /**
     * 根据昵称获取Soul,昵称是否可用
     * @method GET 根据昵称获取Soul
     * @method HEAD 昵称是否可用
     *
     * @params nickname 昵称
     */
    nicknamesByNickname(nickname: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前Soul对象
     * @method GET 获取当前Soul对象
     *
     */
    me(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 更新个人昵称
     * @method PUT 更新个人昵称
     *
     */
    nickname(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 更新个人信息
     * @method PUT 更新个人信息
     *
     */
    profile(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取Soul评论
     * @method GET 获取Soul评论
     *
     * @params id SoulId
     */
    comments(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取Soul摘要信息
     * @method GET 获取Soul摘要信息
     *
     */
    summary(): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default SoulsApi;
