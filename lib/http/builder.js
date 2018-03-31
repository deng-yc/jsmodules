"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.settings(options);
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
     * 获取ajax设置
     * @param options
     */
    JQueryAjaxBuilder.prototype.settings = function (options) {
        return __assign({}, this.options, options);
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
