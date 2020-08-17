/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('ArticlesApi')
export class ArticlesApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 创建文章,获取当前Soul创建的文章
     * @method POST 创建文章
     * @method GET 获取当前Soul创建的文章
     *
     */
    articles() {
        return this.http
            .url(`/articles`)
            .addSecurityHeaders()
            .support('POST', 'GET');
    }

    /**
     * 获取文章详情
     * @method GET 获取文章详情
     *
     * @params id 文章Id
     */
    articlesById(id) {
        return this.http
            .url(`/articles/${id}`)
            .support('GET');
    }

    /**
     * 获取文章评论
     * @method GET 获取文章评论
     *
     * @params id 文章Id
     */
    comments(id) {
        return this.http
            .url(`/articles/${id}/comments`)
            .support('GET');
    }

    /**
     * 取消收藏文章,收藏文章
     * @method DELETE 取消收藏文章
     * @method PUT 收藏文章
     *
     * @params id 文章Id
     */
    collect(id) {
        return this.http
            .url(`/articles/${id}/collect`)
            .addSecurityHeaders()
            .support('DELETE', 'PUT');
    }

    /**
     * 踩文章
     * @method PUT 踩文章
     *
     * @params id 文章Id
     */
    dislike(id) {
        return this.http
            .url(`/articles/${id}/dislike`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 不关心文章
     * @method PUT 不关心文章
     *
     * @params id 文章Id
     */
    indifferent(id) {
        return this.http
            .url(`/articles/${id}/indifferent`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 点赞文章
     * @method PUT 点赞文章
     *
     * @params id 文章Id
     */
    like(id) {
        return this.http
            .url(`/articles/${id}/like`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 获取文章审核信息
     * @method GET 获取文章审核信息
     *
     * @params id 文章Id
     */
    reviews(id) {
        return this.http
            .url(`/articles/${id}/reviews`)
            .support('GET');
    }

    /**
     * 分享文章回调记录
     * @method POST 分享文章回调记录
     *
     * @params id 文章Id
     */
    callback(id) {
        return this.http
            .url(`/articles/${id}/shares/callback`)
            .support('POST');
    }

    /**
     * 浏览文章
     * @method POST 浏览文章
     *
     * @params id 文章Id
     */
    views(id) {
        return this.http
            .url(`/articles/${id}/views`)
            .support('POST');
    }

    /**
     * 获取当前Soul收藏的文章
     * @method GET 获取当前Soul收藏的文章
     *
     */
    collect() {
        return this.http
            .url(`/articles/collect`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取当前Soul踩的文章
     * @method GET 获取当前Soul踩的文章
     *
     */
    dislike() {
        return this.http
            .url(`/articles/dislike`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取当前Soul点赞的文章
     * @method GET 获取当前Soul点赞的文章
     *
     */
    like() {
        return this.http
            .url(`/articles/like`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取最近文章
     * @method GET 获取最近文章
     *
     */
    latest() {
        return this.http
            .url(`/articles/latest`)
            .support('GET');
    }

    /**
     * 获取最热文章
     * @method GET 获取最热文章
     *
     */
    hot() {
        return this.http
            .url(`/articles/hot`)
            .support('GET');
    }
}

export default ArticlesApi;
