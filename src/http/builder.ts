import { IRequestBuilder, IResponseBuilder } from "./interface";
import { tryResolve } from "../di";
import str from '../str';

export class JQueryAjaxRequestBuilder implements IRequestBuilder {


    callbackParam = "callback";
    xhr: JQueryXHR;
    public url = "";

    private _contentType = "application/json";
    private _dataType = "json";
    private _headers = {};

    constructor(url: any) {
        if (!url) {
            throw new Error("url is required");
        }
        this.url = url;
    }

    private get $(): JQueryStatic {
        var jq = tryResolve("$") || window['jQuery'];
        if (!jq) {
            throw new Error("jquery is required");
        }
        return jq;
    }

    isForm() {
        return this.contentType("application/x-www-form-urlencoded")
    }

    isJson() {
        return this.contentType("application/json")
    }
    private securityHeaders = false;
    addSecurityHeaders(added = true) {
        this.securityHeaders = added;
        return this;
    }
    contentType(contentType) {
        this._contentType = contentType;
        return this;
    }

    dataType(dataType) {
        this._dataType = dataType;
        return this;
    }

    /**
     * 设置请求头
     * @param headers
     */
    headers(headers) {
        this._headers = { ...this._headers, ...headers };
        return this;
    }

    private _timeout: number;

    timeout(num) {
        this._timeout = num;
        return this;
    }

    /**
     * 发起ajax请求
     * @param options
     */
    private async httpRequest(options): Promise<IResponseBuilder> {

        var _options: JQueryAjaxSettings = {
            url: this.url,
            contentType: this._contentType,
            dataType: this._dataType,
            headers: this._headers,
            timeout: this._timeout,
            ...options
        };
        this.xhr = this.$.ajax(_options);

        var response = await this.xhr;
        var headersStr = this.xhr.getAllResponseHeaders();
        var headers = {};
        var pairs = headersStr.split('\n');
        for (var pair of pairs) {
            if (pair != "") {
                var [key, ...values] = pair.split(':');
                headers[key.toLowerCase()] = str.trim(values.join(':'));
            }
        }
        return {
            data: response,
            status: this.xhr.status,
            statusText: this.xhr.statusText,
            headers,
            config: null,
            request: this.xhr
        }
    }

    /**
     * GET 请求
     * @param query,查询条件
     */
    get(query?) {
        return this.httpRequest({ type: "GET", data: query });
    }

    /**
     * POST 请求
     * @param data
     */
    post(data?, json = true) {
        return this.httpRequest({
            type: "POST",
            data: json ? JSON.stringify(data) : data
        });
    }

    /**
     * PUT 请求
     * @param data
     */
    put(data, json = true) {
        return this.httpRequest({
            type: "PUT",
            data: json ? JSON.stringify(data) : data
        });
    }

    /**
     * DELETE 请求
     */
    remove(query?) {
        return this.httpRequest({ type: "DELETE", data: query });
    }

    /**
     * jsonp 请求
     * @param query 查询字符串
     * @param callbackParam 回调函数名
     */
    jsonp(query, callbackParam?) {
        var url = "";
        if (this.url.indexOf('=?') == -1) {
            callbackParam = callbackParam || this.callbackParam;
            if (this.url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }

            url += callbackParam + '=?';
        }
        return this.httpRequest({ url, dataType: "jsonp", data: query });
    }

    /**
     * 停止ajax请求
     */
    stop() {
        this.xhr.abort();
    }
}
