/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('CallsApi')
export class CallsApi {
    @api('chat_api_v1') private http: HttpFactory;

    /**
     * 创建通话记录,获取通话记录列表
     * @method POST 创建通话记录
     * @method GET 获取通话记录列表
     *
     */
    calls() {
        return this.http
            .url(`/calls`)
            .addSecurityHeaders()
            .support('POST', 'GET');
    }

    /**
     * 获取通话记录
     * @method GET 获取通话记录
     *
     * @params id 通话Id
     */
    callsById(id) {
        return this.http
            .url(`/calls/${id}`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 获取通话记录
     * @method GET 获取通话记录
     *
     * @params identity 通话Identity
     */
    identitiesByIdentity(identity) {
        return this.http
            .url(`/calls/identities/${identity}`)
            .addSecurityHeaders()
            .support('GET');
    }

    /**
     * 挂断通话
     * @method POST 挂断通话
     *
     * @params id 通话Id
     */
    hangUp(id) {
        return this.http
            .url(`/calls/${id}/hang-up`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 通话超时
     * @method POST 通话超时
     *
     * @params id 通话Id
     */
    timeout(id) {
        return this.http
            .url(`/calls/${id}/timeout`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 开始通话
     * @method POST 开始通话
     *
     * @params id 通话Id
     */
    start(id) {
        return this.http
            .url(`/calls/${id}/start`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 更新通话持续时间
     * @method PUT 更新通话持续时间
     *
     * @params id 通话Id
     */
    durationTime(id) {
        return this.http
            .url(`/calls/${id}/duration-time`)
            .addSecurityHeaders()
            .support('PUT');
    }

    /**
     * 通话结束
     * @method POST 通话结束
     *
     * @params id 通话Id
     */
    end(id) {
        return this.http
            .url(`/calls/${id}/end`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 通话支付流程
     * @method POST 通话支付流程
     *
     * @params id 通话Id
     */
    payment(id) {
        return this.http
            .url(`/calls/${id}/payment`)
            .addSecurityHeaders()
            .support('POST');
    }
}

export default CallsApi;
