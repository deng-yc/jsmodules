"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var di_1 = require("../di");
var JQueryAjaxRequestBuilder = /** @class */ (function () {
    function JQueryAjaxRequestBuilder(url) {
        this.callbackParam = "callback";
        this.url = "";
        this._contentType = "application/json";
        this._dataType = "json";
        this._headers = {};
        if (!url) {
            throw new Error("url is required");
        }
        this.url = url;
    }
    Object.defineProperty(JQueryAjaxRequestBuilder.prototype, "$", {
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
    JQueryAjaxRequestBuilder.prototype.isForm = function () {
        return this.contentType("application/x-www-form-urlencoded");
    };
    JQueryAjaxRequestBuilder.prototype.isJson = function () {
        return this.contentType("application/json");
    };
    JQueryAjaxRequestBuilder.prototype.contentType = function (contentType) {
        this._contentType = contentType;
        return this;
    };
    JQueryAjaxRequestBuilder.prototype.dataType = function (dataType) {
        this._dataType = dataType;
        return this;
    };
    /**
     * 设置请求头
     * @param headers
     */
    JQueryAjaxRequestBuilder.prototype.headers = function (headers) {
        this._headers = tslib_1.__assign({}, this._headers, headers);
        return this;
    };
    /**
     * 发起ajax请求
     * @param options
     */
    JQueryAjaxRequestBuilder.prototype.httpRequest = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _options, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _options = tslib_1.__assign({ url: this.url, contentType: this._contentType, dataType: this._dataType, headers: this._headers }, options);
                        this.xhr = this.$.ajax(_options);
                        return [4 /*yield*/, this.xhr];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response,
                                status: this.xhr.status,
                                statusText: this.xhr.statusText,
                                headers: this.xhr.getAllResponseHeaders(),
                                config: null,
                                request: this.xhr
                            }];
                }
            });
        });
    };
    /**
     * GET 请求
     * @param query,查询条件
     */
    JQueryAjaxRequestBuilder.prototype.get = function (query) {
        return this.httpRequest({ type: "GET", data: query });
    };
    /**
     * POST 请求
     * @param data
     */
    JQueryAjaxRequestBuilder.prototype.post = function (data, json) {
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
    JQueryAjaxRequestBuilder.prototype.put = function (data, json) {
        if (json === void 0) { json = true; }
        return this.httpRequest({
            type: "PUT",
            data: json ? JSON.stringify(data) : data
        });
    };
    /**
     * DELETE 请求
     */
    JQueryAjaxRequestBuilder.prototype.remove = function (query) {
        return this.httpRequest({ type: "DELETE", data: query });
    };
    /**
     * jsonp 请求
     * @param query 查询字符串
     * @param callbackParam 回调函数名
     */
    JQueryAjaxRequestBuilder.prototype.jsonp = function (query, callbackParam) {
        var url = "";
        if (this.url.indexOf('=?') == -1) {
            callbackParam = callbackParam || this.callbackParam;
            if (this.url.indexOf('?') == -1) {
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
    JQueryAjaxRequestBuilder.prototype.stop = function () {
        this.xhr.abort();
    };
    return JQueryAjaxRequestBuilder;
}());
exports.JQueryAjaxRequestBuilder = JQueryAjaxRequestBuilder;
