export declare class ArticlesApi {
    private http;
    /**
     * 创建文章,获取当前Soul创建的文章
     * @method POST 创建文章
     * @method GET 获取当前Soul创建的文章
     *
     */
    articles(): any;
    /**
     * 获取文章详情
     * @method GET 获取文章详情
     *
     * @params id 文章Id
     */
    articlesById(id: any): any;
    /**
     * 获取文章评论
     * @method GET 获取文章评论
     *
     * @params id 文章Id
     */
    comments(id: any): any;
    /**
     * 不关心文章
     * @method PUT 不关心文章
     *
     * @params id 文章Id
     */
    indifferent(id: any): any;
    /**
     * 获取文章审核信息
     * @method GET 获取文章审核信息
     *
     * @params id 文章Id
     */
    reviews(id: any): any;
    /**
     * 分享文章回调记录
     * @method POST 分享文章回调记录
     *
     * @params id 文章Id
     */
    callback(id: any): any;
    /**
     * 浏览文章
     * @method POST 浏览文章
     *
     * @params id 文章Id
     */
    views(id: any): any;
    /**
     * 获取最近文章
     * @method GET 获取最近文章
     *
     */
    latest(): any;
    /**
     * 获取最热文章
     * @method GET 获取最热文章
     *
     */
    hot(): any;
}
export default ArticlesApi;
