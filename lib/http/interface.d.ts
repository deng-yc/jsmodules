export declare type IRequestBuilderCreator = new (url, resbuilder?: IResponseBuilder) => IRequestBuilder;
export interface IRequestBuilder {
    set(key: any, options: any, replaces?: any): IRequestBuilder;
    headers(obj: any): IRequestBuilder;
    get(query?: any): Promise<any>;
    post(data?: any): Promise<any>;
    put(data?: any): Promise<any>;
    remove(query?: any): Promise<any>;
    jsonp(query: any, callbackParam?: any): Promise<any>;
    stop(): any;
}
export declare type IResponseBuilderCreator = new () => IResponseBuilder;
export interface IResponseBuilder {
    resolve(resp: any): any;
}
