export declare class ProductsApi {
    private http;
    /**
     * 获取android端nts产品
     * @method GET 获取android端nts产品
     *
     */
    ntsAndroid(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取ios端nts产品
     * @method GET 获取ios端nts产品
     *
     */
    ntsIos(): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default ProductsApi;
