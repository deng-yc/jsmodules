/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('AssetsApi')
export class AssetsApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 上传资源信息
获取签名
     * @method POST 上传资源信息
获取签名
     *
     */
    assets() {
        return this.http
            .url(`/assets`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 确定并创建资源
     * @method PUT 确定并创建资源
     *
     * @params id 资源Id
     */
    assetsById(id) {
        return this.http
            .url(`/assets/${id}`)
            .addSecurityHeaders()
            .support('PUT');
    }
}

export default AssetsApi;
