export declare class AccountsApi {
    private http;
    /**
     * 通过外部登陆信息创建账号
     * @method POST 通过外部登陆信息创建账号
     *
     */
    external(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 创建账号
     * @method POST 创建账号
     *
     */
    accounts(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * Check the phone number does existed or not
     * @method HEAD Check the phone number does existed or not
     *
     * @params countryCode 无说明
     * @params areaNumber 无说明
     */
    checkPhoneNumber(countryCode: any, areaNumber: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 添加外部登陆信息,获取外部登陆信息,删除外部登陆信息
     * @method POST 添加外部登陆信息
     * @method GET 获取外部登陆信息
     * @method DELETE 删除外部登陆信息
     *
     */
    externalLogins(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * get account status
     * @method GET get account status
     *
     * @params id id
     */
    status(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * send verify code to me
     * @method POST send verify code to me
     *
     */
    verifyCodeToMe(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * Send validation code to phone
     * @method POST Send validation code to phone
     *
     */
    verifyCode(): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default AccountsApi;
