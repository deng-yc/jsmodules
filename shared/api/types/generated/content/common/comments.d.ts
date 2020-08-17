export declare class CommentsApi {
    private http;
    /**
     * 创建评论,获取当前Soul创建的评论
     * @method POST 创建评论
     * @method GET 获取当前Soul创建的评论
     *
     */
    comments(): any;
    /**
     * 获取当前Soul踩的评论
     * @method GET 获取当前Soul踩的评论
     *
     */
    getDislike(): any;
    /**
     * 获取当前Soul点赞的评论
     * @method GET 获取当前Soul点赞的评论
     *
     */
    getLike(): any;
    /**
     * 获取评论详情
     * @method GET 获取评论详情
     *
     * @params id 评论Id
     */
    commentsById(id: any): any;
    /**
     * 踩评论
     * @method PUT 踩评论
     *
     * @params id 评论Id
     */
    dislike(id: any): any;
    /**
     * 不关心评论
     * @method PUT 不关心评论
     *
     * @params id 评论Id
     */
    indifferent(id: any): any;
    /**
     * 点赞评论
     * @method PUT 点赞评论
     *
     * @params id 评论Id
     */
    like(id: any): any;
    /**
     * 获取评论审核信息
     * @method GET 获取评论审核信息
     *
     * @params id 评论Id
     */
    reviews(id: any): any;
}
export default CommentsApi;
//# sourceMappingURL=comments.d.ts.map