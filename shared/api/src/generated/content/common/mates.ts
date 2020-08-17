/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('MatesApi')
export class MatesApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 成为Mate,获取Mate
     * @method POST 成为Mate
     * @method GET 获取Mate
     *
     */
    mates() {
        return this.http
            .url(`/mates`)
            .addSecurityHeaders()
            .support('POST', 'GET');
    }

    /**
     * 获取Mate详情
     * @method GET 获取Mate详情
     *
     * @params id MateId
     */
    matesById(id) {
        return this.http
            .url(`/mates/${id}`)
            .support('GET');
    }

    /**
     * 获取当前Mate对象
     * @method GET 获取当前Mate对象
     *
     */
    me() {
        return this.http
            .url(`/mates/me`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 更新Mate信息
     * @method PUT 更新Mate信息
     *
     */
    info() {
        return this.http
            .url(`/mates/me/info`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 更新Mate触达状态
     * @method PUT 更新Mate触达状态
     *
     */
    reachableStatus() {
        return this.http
            .url(`/mates/me/reachable-status`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 更新Mate销售信息
     * @method PUT 更新Mate销售信息
     *
     */
    voiceProduct() {
        return this.http
            .url(`/mates/me/voice-product`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 获取Mate评论
     * @method GET 获取Mate评论
     *
     * @params id MateId
     */
    comments(id) {
        return this.http
            .url(`/mates/${id}/comments`)
            .support('GET');
    }

    /**
     * 取消收藏Mate,收藏Mate
     * @method DELETE 取消收藏Mate
     * @method PUT 收藏Mate
     *
     * @params id MateId
     */
    collect(id) {
        return this.http
            .url(`/mates/${id}/collect`)
            .addSecurityHeaders()
            .support('DELETE', 'PUT');
    }

    /**
     * 踩Mate
     * @method PUT 踩Mate
     *
     * @params id MateId
     */
    dislike(id) {
        return this.http
            .url(`/mates/${id}/dislike`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 不关心Mate
     * @method PUT 不关心Mate
     *
     * @params id MateId
     */
    indifferent(id) {
        return this.http
            .url(`/mates/${id}/indifferent`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 点赞Mate
     * @method PUT 点赞Mate
     *
     * @params id MateId
     */
    like(id) {
        return this.http
            .url(`/mates/${id}/like`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 获取Mate审核信息
     * @method GET 获取Mate审核信息
     *
     * @params id MateId
     */
    reviews(id) {
        return this.http
            .url(`/mates/${id}/reviews`)
            .support('GET');
    }

    /**
     * 获取当前Soul收藏的Mate
     * @method GET 获取当前Soul收藏的Mate
     *
     */
    myCollect() {
        return this.http
            .url(`/mates/collect`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取当前Soul踩的Mate
     * @method GET 获取当前Soul踩的Mate
     *
     */
    myDislike() {
        return this.http
            .url(`/mates/dislike`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取当前Soul点赞的Mate
     * @method GET 获取当前Soul点赞的Mate
     *
     */
    myLike() {
        return this.http
            .url(`/mates/like`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取最近Mate
     * @method GET 获取最近Mate
     *
     */
    latest() {
        return this.http
            .url(`/mates/latest`)
            .support('GET');
    }

    /**
     * 获取最热Mate
     * @method GET 获取最热Mate
     *
     */
    hot() {
        return this.http
            .url(`/mates/hot`)
            .support('GET');
    }
}

export default MatesApi;
