/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('RongCloudApi')
export class RongCloudApi {
    @api('chat_api_v1') private http: HttpFactory;

    /**
     * 获取当前聊天用户token
     * @method GET 获取当前聊天用户token
     *
     */
    token() {
        return this.http
            .url(`/rongcloud/token`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default RongCloudApi;
