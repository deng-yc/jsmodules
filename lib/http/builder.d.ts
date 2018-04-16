/// <reference types="jquery" />
import { IRequestBuilder, IResponseBuilder } from "./interface";
export declare class ResponseBuilder implements IResponseBuilder {
    resolve(response: any): any;
}
export declare class JQueryAjaxBuilder implements IRequestBuilder {
    ResponseBuilder: IResponseBuilder;
    callbackParam: string;
    xhr: JQueryXHR;
    url: string;
    private _contentType;
    private _dataType;
    private _headers;
    constructor(url: any, resbuilder?: IResponseBuilder);
    readonly $: JQueryStatic;
    isForm(): this;
    isJson(): this;
    contentType(contentType: any): this;
    dataType(dataType: any): this;
    /**
     * 设置请求头
     * @param headers
     */
    headers(headers: any): this;
    /**
     * 发起ajax请求
     * @param options
     */
    private httpRequest(options);
    /**
     * GET 请求
     * @param query,查询条件
     */
    get(query?: any): Promise<any>;
    /**
     * POST 请求
     * @param data
     */
    post(data?: any, json?: boolean): Promise<any>;
    /**
     * PUT 请求
     * @param data
     */
    put(data: any, json?: boolean): Promise<any>;
    /**
     * DELETE 请求
     */
    remove(query?: any): Promise<any>;
    /**
     * jsonp 请求
     * @param query 查询字符串
     * @param callbackParam 回调函数名
     */
    jsonp(query: any, callbackParam?: any): Promise<any>;
    /**
     * 停止ajax请求
     */
    stop(): void;
}
