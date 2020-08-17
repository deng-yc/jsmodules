/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('ParticipantsApi')
export class ParticipantsApi {
    @api('chat_api_v1') private http: HttpFactory;

    /**
     * 获取个人会话信息
     * @method GET 获取个人会话信息
     *
     */
    me() {
        return this.http
            .url(`/participants/me`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 取消置顶个人会话,置顶个人会话
     * @method DELETE 取消置顶个人会话
     * @method POST 置顶个人会话
     *
     */
    onTop() {
        return this.http
            .url(`/participants/me/on-top`)
            .addSecurityHeaders()
            .support('DELETE', 'POST');
    }
}

export default ParticipantsApi;
