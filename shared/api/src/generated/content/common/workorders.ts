/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('WorkOrdersApi')
export class WorkOrdersApi {
    @api('content_api_v1') private http: HttpFactory;

    /**
     * 创建工单,获取工单
     * @method POST 创建工单
     * @method GET 获取工单
     *
     */
    workorders() {
        return this.http
            .url(`/workorders`)
            .addSecurityHeaders()
            .support('POST', 'GET');
    }

    /**
     * 获取工单详情
     * @method GET 获取工单详情
     *
     * @params id 工单Id
     */
    workordersById(id) {
        return this.http
            .url(`/workorders/${id}`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取工单评论
     * @method GET 获取工单评论
     *
     * @params id 工单Id
     */
    comments(id) {
        return this.http
            .url(`/workorders/${id}/comments`)
            .addSecurityHeaders()
            .support('GET');
    }
}

export default WorkOrdersApi;
