/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('ChatUsersApi')
export class ChatUsersApi {
    @api('chat_api_v1') private http: HttpFactory;

    /**
     * 获取聊天用户
     * @method GET 获取聊天用户
     *
     */
    chatusers() {
        return this.http
            .url(`/chatusers`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取当前聊天用户黑名单
     * @method GET 获取当前聊天用户黑名单
     *
     */
    blacklist() {
        return this.http
            .url(`/chatusers/blacklist`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取当前聊天用户对象
     * @method GET 获取当前聊天用户对象
     *
     */
    me() {
        return this.http
            .url(`/chatusers/me`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取客服聊天用户
     * @method GET 获取客服聊天用户
     *
     */
    customerservice() {
        return this.http
            .url(`/chatusers/customerservice`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 屏蔽聊天用户,取消屏蔽聊天用户
     * @method PUT 屏蔽聊天用户
     * @method DELETE 取消屏蔽聊天用户
     *
     * @params id 聊天用户Id
     */
    block(id) {
        return this.http
            .url(`/chatusers/${id}/block`)
            .addSecurityHeaders()
            .support('PUT', 'DELETE');
    }

    /**
     * 查看是否被用户屏蔽
     * @method HEAD 查看是否被用户屏蔽
     *
     * @params id 聊天用户Id
     */
    blocked(id) {
        return this.http
            .url(`/chatusers/${id}/blocked`)
            .addSecurityHeaders()
            .support('HEAD');
    }
}

export default ChatUsersApi;
