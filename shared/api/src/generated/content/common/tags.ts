/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('TagsApi')
export class TagsApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 获取标签
     * @method GET 获取标签
     *
     */
    tags() {
        return this.http
            .url(`/tags`)
            .support('GET');
    }
}

export default TagsApi;
