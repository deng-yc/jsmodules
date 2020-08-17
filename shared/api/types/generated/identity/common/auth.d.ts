export declare class AuthApi {
    private http;
    /**
     * 生成外部授权流程,补充个性化信息到外部授权流程
     * @method POST 生成外部授权流程
     * @method PUT 补充个性化信息到外部授权流程
     *
     */
    external(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 外部登陆
     * @method POST 外部登陆
     *
     */
    externalLogin(): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default AuthApi;
