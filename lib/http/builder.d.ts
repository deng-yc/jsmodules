/// <reference types="jquery" />
import { IRequestBuilder, IResponseBuilder } from "./interface";
export declare class ResponseBuilder implements IResponseBuilder {
    resolve(response: any): any;
}
export declare class JQueryAjaxBuilder implements IRequestBuilder {
    ResponseBuilder: IResponseBuilder;
    constructor(url: any, resbuilder?: IResponseBuilder);
    readonly $: JQueryStatic;
    callbackParam: string;
    xhr: JQueryXHR;
    options: JQueryAjaxSettings;
    /**
     * ����ajax����
     * @param key ������
     * @param options ����
     * @param replace �Ƿ��滻ԭֵ
     */
    set(key: any, options: any, replace?: boolean): this;
    headers(headers: any): this;
    /**
     * ����ajax����
     * @param options
     */
    private httpRequest(options);
    /**
     * GET ����
     * @param query,��ѯ����
     */
    get(query?: any): Promise<any>;
    /**
     * POST ����
     * @param data
     */
    post(data?: any, json?: boolean): Promise<any>;
    /**
     * PUT ����
     * @param data
     */
    put(data: any, json?: boolean): Promise<any>;
    /**
     * DELETE ����
     */
    remove(query?: any): Promise<any>;
    /**
     * jsonp ����
     * @param query ��ѯ�ַ���
     * @param callbackParam �ص�������
     */
    jsonp(query: any, callbackParam?: any): Promise<any>;
    /**
     * ֹͣajax����
     */
    stop(): void;
}
