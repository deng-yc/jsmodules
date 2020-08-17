export declare class AccountsApi {
    private http;
    /**
     * 通过外部登陆信息创建账号
     * @method POST 通过外部登陆信息创建账号
     *
     */
    external(): any;
    /**
     * 创建账号
     * @method POST 创建账号
     *
     */
    accounts(): any;
    /**
     * Check the phone number does existed or not
     * @method HEAD Check the phone number does existed or not
     *
     * @params countryCode 无说明
     * @params areaNumber 无说明
     */
    checkPhoneNumber(countryCode: any, areaNumber: any): any;
    /**
     * 添加外部登陆信息,获取外部登陆信息,删除外部登陆信息
     * @method POST 添加外部登陆信息
     * @method GET 获取外部登陆信息
     * @method DELETE 删除外部登陆信息
     *
     */
    externalLogins(): any;
    /**
     * get account status
     * @method GET get account status
     *
     * @params id id
     */
    status(id: any): any;
    /**
     * send verify code to me
     * @method POST send verify code to me
     *
     */
    verifyCodeToMe(): any;
    /**
     * Send validation code to phone
     * @method POST Send validation code to phone
     *
     */
    verifyCode(): any;
}
export default AccountsApi;
