import { IRequestBuilder, IResponseBuilder } from './interface';
type ContentType = 'application/x-www-form-urlencoded' | 'application/json' | 'multipart/form-data';
export declare class HttpRequestBuilder<RC extends any> implements IRequestBuilder {
    _url: string;
    constructor(url?: any);
    _contentType: ContentType;
    url(url: any): this;
    _extraOptions: RC;
    extraOptions(options: RC): this;
    /**
     * application / x - www - form - urlencoded | application / json
     **/
    contentType(contentType: ContentType): this;
    __dataType__: 'json' | 'text';
    dataType(dataType: 'json' | 'text'): this;
    securityHeaders: boolean;
    requiredSecurityHeaders: boolean;
    addSecurityHeaders(required?: boolean): this;
    __methods: {
        [name: string]: boolean;
    };
    support(...methods: string[]): this;
    __headers__: {};
    headers(obj: any): this;
    __timeout: number;
    timeout(timeout: number): this;
    request: (options: any) => Promise<IResponseBuilder>;
    private dataSerializer;
    get(query?: any): Promise<IResponseBuilder>;
    post(data?: any, query?: any): Promise<IResponseBuilder>;
    put(data?: any, query?: any): Promise<IResponseBuilder>;
    head(data?: any, query?: any): Promise<IResponseBuilder>;
    patch(data?: any, query?: any): Promise<IResponseBuilder>;
    remove(data?: any, query?: any): Promise<IResponseBuilder>;
    jsonp(query: any): Promise<IResponseBuilder>;
    stop(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map