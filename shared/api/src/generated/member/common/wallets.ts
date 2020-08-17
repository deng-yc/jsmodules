/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('WalletsApi')
export class WalletsApi {
    @api('member_api_v1') private http: HttpFactory;

    /**
     * 获取当前钱包对象
     * @method GET 获取当前钱包对象
     *
     */
    me() {
        return this.http
            .url(`/wallets/me`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default WalletsApi;
