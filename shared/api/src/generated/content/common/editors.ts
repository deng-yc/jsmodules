/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('EditorsApi')
export class EditorsApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 昵称是否可用
     * @method HEAD 昵称是否可用
     *
     * @params nickname 昵称
     */
    nicknamesByNickname(nickname) {
        return this.http
            .url(`/editors/nicknames/${nickname}`)
            .support('HEAD');
    }

    /**
     * 获取当前编辑对象
     * @method GET 获取当前编辑对象
     *
     */
    me() {
        return this.http
            .url(`/editors/me`)
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
            .url(`/editors/me/nickname`)
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
            .url(`/editors/me/profile`)
            .addSecurityHeaders()
            .support('PUT');
    }
}

export default EditorsApi;
