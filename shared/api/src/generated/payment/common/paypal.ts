/* eslint-disable */
/* 此代码由工具自动生成,不要直接修改,以免下次生成会丢失 */
import di from '@jsmodules/di';
import {HttpFactory} from '@jsmodules/core';
import api from '../../../decorators';

@di.injectable('PayPalApi')
export class PayPalApi {
    @api('payment_api_v1') private http: HttpFactory;

    /**
     * Paypal Payment操作通知
     * @method POST Paypal Payment操作通知
     *
     */
    paypalPaymengCallback() {
        return this.http
            .url(`/paypal/payment/callback`)
            .support('POST');
    }

    /**
     * Paypal Payout操作通知
     * @method POST Paypal Payout操作通知
     *
     */
    paypalPayoutCallback() {
        return this.http
            .url(`/paypal/payout/callback`)
            .support('POST');
    }
}

export default PayPalApi;
