/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('MessagesApi')
export class MessagesApi {
    @api('chat_api_v1') private http: HttpFactory;

    /**
     * 创建消息,获取对话消息
     * @method POST 创建消息
     * @method GET 获取对话消息
     *
     */
    messages() {
        return this.http
            .url(`/messages`)
            .addSecurityHeaders()
            .support('POST', 'GET');
    }

    /**
     * 获取消息详情
     * @method GET 获取消息详情
     *
     * @params id 消息Id
     */
    messagesById(id) {
        return this.http
            .url(`/messages/${id}`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default MessagesApi;
