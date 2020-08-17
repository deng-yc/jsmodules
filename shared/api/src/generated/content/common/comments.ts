/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('CommentsApi')
export class CommentsApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 创建评论,获取当前Soul创建的评论
     * @method POST 创建评论
     * @method GET 获取当前Soul创建的评论
     *
     */
    comments() {
        return this.http
            .url(`/comments`)
            .addSecurityHeaders()
            .support('POST', 'GET');
    }

    /**
     * 获取当前Soul踩的评论
     * @method GET 获取当前Soul踩的评论
     *
     */
    getDislike() {
        return this.http
            .url(`/comments/dislike`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取当前Soul点赞的评论
     * @method GET 获取当前Soul点赞的评论
     *
     */
    getLike() {
        return this.http
            .url(`/comments/like`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取评论详情
     * @method GET 获取评论详情
     *
     * @params id 评论Id
     */
    commentsById(id) {
        return this.http
            .url(`/comments/${id}`)
            .support('GET');
    }

    /**
     * 踩评论
     * @method PUT 踩评论
     *
     * @params id 评论Id
     */
    dislike(id) {
        return this.http
            .url(`/comments/${id}/dislike`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 不关心评论
     * @method PUT 不关心评论
     *
     * @params id 评论Id
     */
    indifferent(id) {
        return this.http
            .url(`/comments/${id}/indifferent`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 点赞评论
     * @method PUT 点赞评论
     *
     * @params id 评论Id
     */
    like(id) {
        return this.http
            .url(`/comments/${id}/like`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 获取评论审核信息
     * @method GET 获取评论审核信息
     *
     * @params id 评论Id
     */
    reviews(id) {
        return this.http
            .url(`/comments/${id}/reviews`)
            .support('GET');
    }
}

export default CommentsApi;
