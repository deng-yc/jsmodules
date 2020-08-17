export declare class CategoriesApi {
    private http;
    /**
     * 获取分类
     * @method GET 获取分类
     *
     */
    categories(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取分类项
     * @method GET 获取分类项
     *
     * @params id 分类Id
     */
    itemsById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取分类项
     * @method GET 获取分类项
     *
     * @params name 分类名称
     */
    itemsByName(name: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default CategoriesApi;
//# sourceMappingURL=categories.d.ts.map