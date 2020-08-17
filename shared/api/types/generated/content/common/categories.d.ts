export declare class CategoriesApi {
    private http;
    /**
     * 获取分类
     * @method GET 获取分类
     *
     */
    categories(): any;
    /**
     * 获取分类项
     * @method GET 获取分类项
     *
     * @params id 分类Id
     */
    itemsById(id: any): any;
    /**
     * 获取分类项
     * @method GET 获取分类项
     *
     * @params name 分类名称
     */
    itemsByName(name: any): any;
}
export default CategoriesApi;
