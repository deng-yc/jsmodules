/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('NotificationsApi')
export class NotificationsApi {
    @api('remind_api_v1') private http: http.HttpFactory;

    /**
     * 获取用户通知列表
     * @method GET 获取用户通知列表
     *
     */
    notifications() {
        return this.http
            .url(`/notifications`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default NotificationsApi;
