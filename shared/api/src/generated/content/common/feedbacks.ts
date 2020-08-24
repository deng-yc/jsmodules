/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import { http } from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('FeedbacksApi')
export class FeedbacksApi {
    @api('content_api_v1') private http: http.HttpFactory;

    /**
     * 创建反馈
     * @method POST 创建反馈
     *
     */
    feedbacks() {
        return this.http
            .url(`/feedbacks`)
            .addSecurityHeaders()
            .support('POST');
    }

    /**
     * 创建批量反馈
     * @method POST 创建批量反馈
     *
     */
    batch() {
        return this.http
            .url(`/feedbacks/batch`)
            .addSecurityHeaders()
            .support('POST');
    }
}

export default FeedbacksApi;
