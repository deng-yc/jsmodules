"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var di_1 = require("../di");
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder() {
    }
    ResponseBuilder.prototype.resolve = function (response) {
        if (response.success) {
            return response.result;
        }
        throw response;
    };
    return ResponseBuilder;
}());
exports.ResponseBuilder = ResponseBuilder;
var JQueryAjaxBuilder = /** @class */ (function () {
    function JQueryAjaxBuilder(url, resbuilder) {
        this.callbackParam = "callback";
        this.options = {
            contentType: "application/json",
            dataType: 'json',
        };
        if (!url) {
            throw new Error("url is required");
        }
        this.options.url = url;
        this.ResponseBuilder = resbuilder || new ResponseBuilder();
    }
    Object.defineProperty(JQueryAjaxBuilder.prototype, "$", {
        get: function () {
            var jq = di_1.tryResolve("$") || window['jQuery'];
            if (!jq) {
                throw new Error("jquery is required");
            }
            return jq;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置ajax配置
     * @param key 配置名
     * @param options 设置
     * @param replace 是否替换原值
     */
    JQueryAjaxBuilder.prototype.set = function (key, options, replace) {
        if (replace === void 0) { replace = true; }
        if (replace) {
            this.options[key] = options;
        }
        else {
            this.options[key] = this.$.extend(null, this.options[key], options);
        }
        return this;
    };
    JQueryAjaxBuilder.prototype.headers = function (headers) {
        return this.set("headers", headers);
    };
    /**
     * 发起ajax请求
     * @param options
     */
    JQueryAjaxBuilder.prototype.httpRequest = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = tslib_1.__assign({}, this.options, options);
                        this.xhr = this.$.ajax(options);
                        return [4 /*yield*/, this.xhr];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.ResponseBuilder.resolve(response)];
                }
            });
        });
    };
    /**
     * GET 请求
     * @param query,查询条件
     */
    JQueryAjaxBuilder.prototype.get = function (query) {
        return this.httpRequest({ type: "GET", data: query });
    };
    /**
     * POST 请求
     * @param data
     */
    JQueryAjaxBuilder.prototype.post = function (data, json) {
        if (json === void 0) { json = true; }
        return this.httpRequest({
            type: "POST",
            data: json ? JSON.stringify(data) : data
        });
    };
    /**
     * PUT 请求
     * @param data
     */
    JQueryAjaxBuilder.prototype.put = function (data, json) {
        if (json === void 0) { json = true; }
        return this.httpRequest({
            type: "PUT",
            data: json ? JSON.stringify(data) : data
        });
    };
    /**
     * DELETE 请求
     */
    JQueryAjaxBuilder.prototype.remove = function (query) {
        return this.httpRequest({ type: "DELETE", data: query });
    };
    /**
     * jsonp 请求
     * @param query 查询字符串
     * @param callbackParam 回调函数名
     */
    JQueryAjaxBuilder.prototype.jsonp = function (query, callbackParam) {
        var url = "";
        if (this.options.url.indexOf('=?') == -1) {
            callbackParam = callbackParam || this.callbackParam;
            if (this.options.url.indexOf('?') == -1) {
                url += '?';
            }
            else {
                url += '&';
            }
            url += callbackParam + '=?';
        }
        return this.httpRequest({ url: url, dataType: "jsonp", data: query });
    };
    /**
     * 停止ajax请求
     */
    JQueryAjaxBuilder.prototype.stop = function () {
        this.xhr.abort();
    };
    return JQueryAjaxBuilder;
}());
exports.JQueryAjaxBuilder = JQueryAjaxBuilder;
