export declare class AssetsApi {
    private http;
    /**
     * 上传资源信息
获取签名
     * @method POST 上传资源信息
获取签名
     *
     */
    assets(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 确定并创建资源
     * @method PUT 确定并创建资源
     *
     * @params id 资源Id
     */
    assetsById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default AssetsApi;
