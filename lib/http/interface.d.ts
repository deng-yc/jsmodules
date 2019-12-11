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
    isForm(): IRequestBuilder;
    isJson(): IRequestBuilder;
    /**
     * ����access_token
     * @param required �Ƿ����
     */
    addSecurityHeaders(required?: boolean): IRequestBuilder;
    contentType(contentType: any): IRequestBuilder;
    dataType(dataType: any): IRequestBuilder;
    headers(obj: any): IRequestBuilder;
    timeout(timeout: number): IRequestBuilder;
    get(query?: any): Promise<IResponseBuilder>;
    post(data?: any, json?: any): Promise<IResponseBuilder>;
    put(data?: any, json?: any): Promise<IResponseBuilder>;
    head(): Promise<IResponseBuilder>;
    remove(query?: any): Promise<IResponseBuilder>;
    jsonp(query: any, callbackParam?: any): Promise<IResponseBuilder>;
    stop(): any;
}
