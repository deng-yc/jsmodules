/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('SoulsApi')
export class SoulsApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 根据昵称获取Soul,昵称是否可用
     * @method GET 根据昵称获取Soul
     * @method HEAD 昵称是否可用
     *
     * @params nickname 昵称
     */
    nicknamesByNickname(nickname) {
        return this.http
            .url(`/souls/nicknames/${nickname}`)
            .addSecurityHeaders()
            .support('GET', 'HEAD');
    }

    /**
     * 获取当前Soul对象
     * @method GET 获取当前Soul对象
     *
     */
    me() {
        return this.http
            .url(`/souls/me`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 更新个人昵称
     * @method PUT 更新个人昵称
     *
     */
    nickname() {
        return this.http
            .url(`/souls/me/nickname`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 更新个人信息
     * @method PUT 更新个人信息
     *
     */
    profile() {
        return this.http
            .url(`/souls/me/profile`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 获取Soul评论
     * @method GET 获取Soul评论
     *
     * @params id SoulId
     */
    comments(id) {
        return this.http
            .url(`/souls/${id}/comments`)
            .support('GET');
    }

    /**
     * 获取Soul摘要信息
     * @method GET 获取Soul摘要信息
     *
     */
    summary() {
        return this.http
            .url(`/souls/summary`)
            .support('GET');
    }
}

export default SoulsApi;
