/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('TransferTransactionsApi')
export class TransferTransactionsApi {
    @api('member_api_v1') private http: http.HttpFactory;

    /**
     * 获取转账记录
     * @method GET 获取转账记录
     *
     */
    transactions() {
        return this.http
            .url(`/transactions`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default TransferTransactionsApi;
