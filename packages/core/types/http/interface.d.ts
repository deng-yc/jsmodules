export declare type IResponseBuilder = {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request: any;
};
export declare type IRequestBuilderCreator = new (url: any) => IRequestBuilder;
export interface IRequestBuilder {
    url(url: any): this;
    addSecurityHeaders(required?: boolean): this;
    contentType(contentType: "application/x-www-form-urlencoded" | "application/json"): this;
    dataType(dataType: any): this;
    headers(obj: any): this;
    timeout(timeout: number): this;
    get(query?: any): Promise<IResponseBuilder>;
    post(data?: any, json?: any): Promise<IResponseBuilder>;
    put(data?: any, json?: any): Promise<IResponseBuilder>;
    head(): Promise<IResponseBuilder>;
    remove(query?: any): Promise<IResponseBuilder>;
    jsonp(query: any, callbackParam?: any): Promise<IResponseBuilder>;
    stop(): any;
}
export interface IHttpFactory {
    create(): IRequestBuilder;
    url(api: any): IRequestBuilder;
}
