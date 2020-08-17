/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('CategoriesApi')
export class CategoriesApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 获取分类
     * @method GET 获取分类
     *
     */
    categories() {
        return this.http
            .url(`/categories`)
            .support('GET');
    }

    /**
     * 获取分类项
     * @method GET 获取分类项
     *
     * @params id 分类Id
     */
    itemsById(id) {
        return this.http
            .url(`/categories/${id}/items`)
            .support('GET');
    }

    /**
     * 获取分类项
     * @method GET 获取分类项
     *
     * @params name 分类名称
     */
    itemsByName(name) {
        return this.http
            .url(`/categories/names/${name}/items`)
            .support('GET');
    }
}

export default CategoriesApi;
