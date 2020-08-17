/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('DirtyWordsApi')
export class DirtyWordsApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 获取脏词
     * @method GET 获取脏词
     *
     */
    dirtywords() {
        return this.http
            .url(`/dirtywords`)
            .support('GET');
    }
}

export default DirtyWordsApi;
