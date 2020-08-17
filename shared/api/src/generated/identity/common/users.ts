/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('UsersApi')
export class UsersApi {
    @api('identity_api_v1') private http: HttpFactory;

    /**
     * Get user info
     * @method GET Get user info
     *
     */
    me() {
        return this.http
            .url(`/users/me`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * Update user device info
     * @method PUT Update user device info
     *
     */
    deviceinfo() {
        return this.http
            .url(`/users/me/deviceinfo`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * Update user profile
     * @method PUT Update user profile
     *
     */
    profile() {
        return this.http
            .url(`/users/me/profile`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * Update user refer info
     * @method PUT Update user refer info
     *
     */
    refer() {
        return this.http
            .url(`/users/me/refer`)
            .addSecurityHeaders()
            .support('PUT');
    }
}

export default UsersApi;
