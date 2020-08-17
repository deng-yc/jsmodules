/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('AccountsApi')
export class AccountsApi {
    @api('identity_api_v1') private http: HttpFactory;

    /**
     * 通过外部登陆信息创建账号
     * @method POST 通过外部登陆信息创建账号
     *
     */
    external() {
        return this.http
            .url(`/accounts/external`)
            .support('POST');
    }

    /**
     * 创建账号
     * @method POST 创建账号
     *
     */
    accounts() {
        return this.http
            .url(`/accounts`)
            .support('POST');
    }

    /**
     * Check the phone number does existed or not
     * @method HEAD Check the phone number does existed or not
     *
     * @params countryCode 无说明
     * @params areaNumber 无说明
     */
    checkPhoneNumber(countryCode, areaNumber) {
        return this.http
            .url(`/accounts/phones/${countryCode}-${areaNumber}`)
            .support('HEAD');
    }

    /**
     * 添加外部登陆信息,获取外部登陆信息,删除外部登陆信息
     * @method POST 添加外部登陆信息
     * @method GET 获取外部登陆信息
     * @method DELETE 删除外部登陆信息
     *
     */
    externalLogins() {
        return this.http
            .url(`/accounts/me/external-logins`)
            .addSecurityHeaders()
            .support('POST', 'GET', 'DELETE');
    }

    /**
     * get account status
     * @method GET get account status
     *
     * @params id id
     */
    status(id) {
        return this.http
            .url(`/accounts/${id}/status`)
            .support('GET');
    }

    /**
     * send verify code to me
     * @method POST send verify code to me
     *
     */
    verifyCodeToMe() {
        return this.http
            .url(`/accounts/me/verify-code`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * Send validation code to phone
     * @method POST Send validation code to phone
     *
     */
    verifyCode() {
        return this.http
            .url(`/accounts/verify-code`)
            .support('POST');
    }
}

export default AccountsApi;
