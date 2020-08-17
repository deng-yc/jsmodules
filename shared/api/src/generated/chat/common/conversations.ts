/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('ConversationsApi')
export class ConversationsApi {
    @api('chat_api_v1') private http: HttpFactory;

    /**
     * 获取最近会话列表
     * @method GET 获取最近会话列表
     *
     */
    recent() {
        return this.http
            .url(`/conversations/recent`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取会话列表
     * @method GET 获取会话列表
     *
     */
    conversations() {
        return this.http
            .url(`/conversations`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取会话
     * @method GET 获取会话
     *
     * @params id 会话Id
     */
    conversationsById(id) {
        return this.http
            .url(`/conversations/${id}`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取私聊会话,私聊会话是否存在
     * @method GET 获取私聊会话
     * @method HEAD 私聊会话是否存在
     *
     * @params chat_user_id 聊天用户Id
     */
    privateByChatUserId(chat_user_id) {
        return this.http
            .url(`/conversations/private/${chat_user_id}`)
            .addSecurityHeaders()
            .support('GET', 'HEAD');
    }
}

export default ConversationsApi;
