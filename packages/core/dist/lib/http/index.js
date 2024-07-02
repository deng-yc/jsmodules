"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestBuilder = void 0;
class HttpRequestBuilder {
    _url;
    constructor(url) {
        this._url = url;
    }
    _contentType;
    url(url) {
        this._url = url;
        return this;
    }
    _extraOptions;
    extraOptions(options) {
        this._extraOptions = options;
        return this;
    }
    /**
     * application / x - www - form - urlencoded | application / json
     **/
    contentType(contentType) {
        this._contentType = contentType;
        return this.headers({ 'content-type': contentType });
    }
    __dataType__;
    dataType(dataType) {
        this.__dataType__ = dataType;
        return this;
    }
    securityHeaders = false;
    requiredSecurityHeaders = true;
    addSecurityHeaders(required = true) {
        this.securityHeaders = true;
        this.requiredSecurityHeaders = required;
        return this;
    }
    __methods = null;
    support(...methods) {
        if (methods.length > 0) {
            this.__methods = this.__methods || {};
            for (const method of methods) {
                const name = method.toLowerCase();
                this.__methods[name] = true;
            }
        }
        return this;
    }
    __headers__ = {};
    headers(obj) {
        this.__headers__ = {
            ...this.__headers__,
            ...obj,
        };
        return this;
    }
    __timeout = 15 * 1000;
    timeout(timeout) {
        this.__timeout = timeout;
        return this;
    }
    request = (options) => {
        throw new Error('为实现请求方法');
    };
    dataSerializer(data) {
        if (this._contentType == 'application/x-www-form-urlencoded') {
            if (!data) {
                return '';
            }
            return new URLSearchParams(data).toString();
        }
        return data;
    }
    get(query) {
        return this.request({ method: 'GET', params: query });
    }
    post(data, query) {
        return this.request({
            method: 'POST',
            data: this.dataSerializer(data),
            params: query,
        });
    }
    put(data, query) {
        return this.request({
            method: 'PUT',
            data: this.dataSerializer(data),
            params: query,
        });
    }
    head(data, query) {
        return this.request({
            method: 'HEAD',
            data: this.dataSerializer(data),
            params: query,
        });
    }
    patch(data, query) {
        return this.request({
            method: "PATCH",
            data: this.dataSerializer(data),
            params: query,
        });
    }
    remove(data, query) {
        return this.request({ method: 'DELETE', data: this.dataSerializer(data), params: query });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jsonp(query) {
        throw new Error('不支持JSONP' + query);
    }
    stop() {
        throw new Error('为实现取消请求方法');
    }
}
exports.HttpRequestBuilder = HttpRequestBuilder;
//# sourceMappingURL=index.js.map