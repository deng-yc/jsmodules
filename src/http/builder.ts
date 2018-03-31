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
    constructor(url: any, resbuilder?: IResponseBuilder) {
        if (!url) {
            throw new Error("url is required");
        }
        this.options.url = url;
        this.ResponseBuilder = resbuilder || new ResponseBuilder();
    }

    get $(): JQueryStatic {
        var jq = tryResolve("$") || window['jQuery'];
        if (!jq) {
            throw new Error("jquery is required");
        }
        return jq;
    }
    callbackParam = "callback";
    xhr: JQueryXHR;
    options: JQueryAjaxSettings = {
        contentType: "application/json",
        dataType: 'json',
    };

    /**
     * 设置ajax配置
     * @param key 配置名
     * @param options 设置
     * @param replace 是否替换原值
     */
    set(key, options, replace = true) {
        if (replace) {
            this.options[key] = options;
        }
        else {
            this.options[key] = this.$.extend(null, this.options[key], options);
        }
        return this;
    }

    headers(headers) {
        return this.set("headers", headers)
    }
    /**
     * 发起ajax请求
     * @param options
     */
    private async httpRequest(options) {
        options = { ...this.options, ...options };
        this.xhr = this.$.ajax(options);
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
