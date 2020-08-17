/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('ProductsApi')
export class ProductsApi {
    @api('marketing_api_v1') private http: HttpFactory;

    /**
     * 获取android端nts产品
     * @method GET 获取android端nts产品
     *
     */
    ntsAndroid() {
        return this.http
            .url(`/products/nts-android`)
            .support('GET');
    }

    /**
     * 获取ios端nts产品
     * @method GET 获取ios端nts产品
     *
     */
    ntsIos() {
        return this.http
            .url(`/products/nts-ios`)
            .support('GET');
    }
}

export default ProductsApi;
