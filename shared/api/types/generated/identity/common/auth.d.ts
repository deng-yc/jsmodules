export declare class AuthApi {
    private http;
    /**
     * 生成外部授权流程,补充个性化信息到外部授权流程
     * @method POST 生成外部授权流程
     * @method PUT 补充个性化信息到外部授权流程
     *
     */
    external(): any;
    /**
     * 外部登陆
     * @method POST 外部登陆
     *
     */
    externalLogin(): any;
}
export default AuthApi;
