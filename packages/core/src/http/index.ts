import axios, { Canceler, Method } from 'axios';
import trimEnd from 'lodash/trimEnd';
import trimStart from 'lodash/trimStart';

import di from '@jsmodules/di';

import { qs } from '../querystring';
import { TokenService } from '../token';
import { IRequestBuilder, IResponseBuilder } from './interface';

type ContentType = "application/x-www-form-urlencoded" | "application/json";

export class HttpRequestBuilder implements IRequestBuilder {
    private get tokenService() {
        return di.getInstance(TokenService);
    }

    private _url: string;

    constructor(url?) {
        this._url = url;
    }

    private _contentType: ContentType;

    url(url) {
        this._url = url;
        return this;
    }

    /**
     * application / x - www - form - urlencoded | application / json
     **/
    contentType(contentType: ContentType) {
        this._contentType = contentType;
        return this.headers({ "content-type": contentType });
    }

    private __dataType__: "json" | "text";

    dataType(dataType: "json" | "text") {
        this.__dataType__ = dataType;
        return this;
    }

    private securityHeaders = false;
    private requiredSecurityHeaders = true;
    addSecurityHeaders(required = true) {
        this.securityHeaders = true;
        this.requiredSecurityHeaders = required;
        return this;
    }

    private __methods: { [name: string]: boolean } = null;
    support(...methods: Method[]) {
        if (methods.length > 0) {
            this.__methods = this.__methods || {};
            for (const method of methods) {
                const name = method.toLowerCase();
                this.__methods[name] = true;
            }
        }
        return this;
    }

    private __headers__ = {};
    headers(obj) {
        this.__headers__ = {
            ...this.__headers__,
            ...obj,
        };
        return this;
    }
    private __timeout = 15 * 1000;
    timeout(timeout: number) {
        this.__timeout = timeout;
        return this;
    }

    private __canceler__: Canceler;
    private async request(options): Promise<IResponseBuilder> {
        if (this.__methods) {
            const method = `${options.method}`.toLowerCase();
            if (!this.__methods[method]) {
                throw new Error(`此接口不支持${options.method},${this._url}`);
            }
        }
        if (this.securityHeaders) {
            const authHeaders = await this.tokenService.getSecurityHeaders();
            if (!authHeaders && this.requiredSecurityHeaders) {
                throw new Error("未登录");
            } else {
                this.headers(authHeaders || {});
            }
        }
        return axios.request({
            url: this._url,
            headers: this.__headers__,
            timeout: this.__timeout,
            responseType: this.__dataType__,
            cancelToken: new axios.CancelToken((c) => {
                this.__canceler__ = c;
            }),
            paramsSerializer: (params) => {
                return qs.stringify(params);
            },
            ...options,
        });
    }
    private dataSerializer(data) {
        // debugger;
        if (this._contentType == "application/x-www-form-urlencoded") {
            if (!data) {
                return "";
            }
            return qs.stringify(data);
        }
        return data;
    }
    get(query?) {
        return this.request({ method: "GET", params: query });
    }

    post(data?, query?) {
        return this.request({
            method: "POST",
            data: this.dataSerializer(data),
            params: query,
        });
    }

    put(data?, query?) {
        return this.request({
            method: "PUT",
            data: this.dataSerializer(data),
            params: query,
        });
    }

    head(data?, query?) {
        return this.request({
            method: "HEAD",
            data: this.dataSerializer(data),
            params: query,
        });
    }

    remove(data?, query?) {
        return this.request({ method: "DELETE", data: this.dataSerializer(data), params: query });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jsonp(query): Promise<IResponseBuilder> {
        throw new Error("不支持JSONP" + query);
    }

    stop() {
        if (this.__canceler__) {
            this.__canceler__("ajax.abort");
        }
    }
}

@di.injectable("httpFactory", "Request")
export class HttpFactory {
    constructor(private baseUrl: string) {}

    url(api): HttpRequestBuilder {
        const url = `${trimEnd(this.baseUrl, "/")}/${trimStart(api, "/")}`;
        return new HttpRequestBuilder(url);
    }
}
export default HttpFactory;
