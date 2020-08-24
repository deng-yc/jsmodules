/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('AuthApi')
export class AuthApi {
    @api('identity_api_v1') private http: http.HttpFactory;

    /**
     * 生成外部授权流程,补充个性化信息到外部授权流程
     * @method POST 生成外部授权流程
     * @method PUT 补充个性化信息到外部授权流程
     *
     */
    external() {
        return this.http
            .url(`/auth/external`)
            .support('POST', 'PUT');
    }

    /**
     * 外部登陆
     * @method POST 外部登陆
     *
     */
    externalLogin() {
        return this.http
            .url(`/auth/external-login`)
            .support('POST');
    }
}

export default AuthApi;
