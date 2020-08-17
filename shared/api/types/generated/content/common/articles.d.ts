export declare class ArticlesApi {
    private http;
    /**
     * 创建文章,获取当前Soul创建的文章
     * @method POST 创建文章
     * @method GET 获取当前Soul创建的文章
     *
     */
    articles(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取文章详情
     * @method GET 获取文章详情
     *
     * @params id 文章Id
     */
    articlesById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取文章评论
     * @method GET 获取文章评论
     *
     * @params id 文章Id
     */
    comments(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 取消收藏文章,收藏文章
     * @method DELETE 取消收藏文章
     * @method PUT 收藏文章
     *
     * @params id 文章Id
     */
    collect(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 踩文章
     * @method PUT 踩文章
     *
     * @params id 文章Id
     */
    dislike(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 不关心文章
     * @method PUT 不关心文章
     *
     * @params id 文章Id
     */
    indifferent(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 点赞文章
     * @method PUT 点赞文章
     *
     * @params id 文章Id
     */
    like(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取文章审核信息
     * @method GET 获取文章审核信息
     *
     * @params id 文章Id
     */
    reviews(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 分享文章回调记录
     * @method POST 分享文章回调记录
     *
     * @params id 文章Id
     */
    sharesCallback(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 浏览文章
     * @method POST 浏览文章
     *
     * @params id 文章Id
     */
    views(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前Soul收藏的文章
     * @method GET 获取当前Soul收藏的文章
     *
     */
    myCollect(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前Soul踩的文章
     * @method GET 获取当前Soul踩的文章
     *
     */
    myDislike(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前Soul点赞的文章
     * @method GET 获取当前Soul点赞的文章
     *
     */
    myLike(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取最近文章
     * @method GET 获取最近文章
     *
     */
    latest(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取最热文章
     * @method GET 获取最热文章
     *
     */
    hot(): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default ArticlesApi;
