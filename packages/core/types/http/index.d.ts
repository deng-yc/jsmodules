import { Method } from 'axios';
import { IRequestBuilder, IResponseBuilder } from './interface';
declare type ContentType = "application/x-www-form-urlencoded" | "application/json";
export declare class HttpRequestBuilder implements IRequestBuilder {
    private get tokenService();
    private _url;
    constructor(url?: any);
    private _contentType;
    url(url: any): this;
    /**
     * application / x - www - form - urlencoded | application / json
     **/
    contentType(contentType: ContentType): this;
    private __dataType__;
    dataType(dataType: "json" | "text"): this;
    private securityHeaders;
    private requiredSecurityHeaders;
    addSecurityHeaders(required?: boolean): this;
    private __methods;
    support(...methods: Method[]): this;
    private __headers__;
    headers(obj: any): this;
    private __timeout;
    timeout(timeout: number): this;
    private __canceler__;
    private request;
    private dataSerializer;
    get(query?: any): Promise<IResponseBuilder>;
    post(data?: any, query?: any): Promise<IResponseBuilder>;
    put(data?: any, query?: any): Promise<IResponseBuilder>;
    head(data?: any, query?: any): Promise<IResponseBuilder>;
    remove(data?: any, query?: any): Promise<IResponseBuilder>;
    jsonp(query: any): Promise<IResponseBuilder>;
    stop(): void;
}
export declare class HttpFactory {
    private baseUrl;
    constructor(baseUrl: string);
    create(): HttpRequestBuilder;
    url(api: any): HttpRequestBuilder;
}
export default HttpFactory;
