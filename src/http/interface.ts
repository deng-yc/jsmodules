

export type IRequestBuilderCreator = new (url, resbuilder?: IResponseBuilder) => IRequestBuilder;

export interface IRequestBuilder {

    set(key, options, replaces?): IRequestBuilder;

    headers(obj): IRequestBuilder;

    get(query?): Promise<any>;

    post(data?): Promise<any>;

    put(data?): Promise<any>;

    remove(query?): Promise<any>;

    jsonp(query, callbackParam?): Promise<any>;

    stop();
}


export type IResponseBuilderCreator = new () => IResponseBuilder;

export interface IResponseBuilder {
    resolve(resp): any;
}