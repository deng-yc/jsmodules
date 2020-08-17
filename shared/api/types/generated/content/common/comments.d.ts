export declare class CommentsApi {
    private http;
    /**
     * 创建评论,获取当前Soul创建的评论
     * @method POST 创建评论
     * @method GET 获取当前Soul创建的评论
     *
     */
    comments(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前Soul踩的评论
     * @method GET 获取当前Soul踩的评论
     *
     */
    getDislike(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取当前Soul点赞的评论
     * @method GET 获取当前Soul点赞的评论
     *
     */
    getLike(): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取评论详情
     * @method GET 获取评论详情
     *
     * @params id 评论Id
     */
    commentsById(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 踩评论
     * @method PUT 踩评论
     *
     * @params id 评论Id
     */
    dislike(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 不关心评论
     * @method PUT 不关心评论
     *
     * @params id 评论Id
     */
    indifferent(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 点赞评论
     * @method PUT 点赞评论
     *
     * @params id 评论Id
     */
    like(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
    /**
     * 获取评论审核信息
     * @method GET 获取评论审核信息
     *
     * @params id 评论Id
     */
    reviews(id: any): import("@jsmodules/core/src").HttpRequestBuilder;
}
export default CommentsApi;
//# sourceMappingURL=comments.d.ts.map