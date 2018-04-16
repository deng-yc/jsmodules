import { IRequestBuilder, IResponseBuilder } from "./interface";
import { tryResolve } from "../di";

export class ResponseBuilder implements IResponseBuilder {
    resolve(response) {
        if (response.success) {
            return response.result;
        }
        throw response;
    }
}

export class JQueryAjaxBuilder implements IRequestBuilder {
    ResponseBuilder: IResponseBuilder;
    callbackParam = "callback";
    xhr: JQueryXHR;
    public url = "";

    private _contentType = "application/json";
    private _dataType = "json";
    private _headers = {};

    constructor(url: any, resbuilder?: IResponseBuilder) {
        if (!url) {
            throw new Error("url is required");
        }
        this.url = url;
        this.ResponseBuilder = resbuilder || new ResponseBuilder();
    }

    get $(): JQueryStatic {
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
    /**
     * 发起ajax请求
     * @param options
     */
    private async httpRequest(options) {
        var _options = {
            url: this.url,
            contentType: this._contentType,
            dataType: this._dataType,
            headers: this._headers,
            ...options
        };
        this.xhr = this.$.ajax(_options);
        var response = await this.xhr;
        return this.ResponseBuilder.resolve(response);
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
        if (this.options.url.indexOf('=?') == -1) {
            callbackParam = callbackParam || this.callbackParam;
            if (this.options.url.indexOf('?') == -1) {
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
