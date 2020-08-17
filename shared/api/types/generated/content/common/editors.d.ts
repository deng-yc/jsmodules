export declare class EditorsApi {
    private http;
    /**
     * 昵称是否可用
     * @method HEAD 昵称是否可用
     *
     * @params nickname 昵称
     */
    nicknamesByNickname(nickname: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前编辑对象
     * @method GET 获取当前编辑对象
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
}
export default EditorsApi;
