export declare class WeChatPayApi {
    private http;
    /**
     * 微信App下单结果通知
     * @method POST 微信App下单结果通知
     *
     */
    wxCallback(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 微信小程序下单结果通知
     * @method POST 微信小程序下单结果通知
     *
     */
    wxMiniCallback(): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default WeChatPayApi;
