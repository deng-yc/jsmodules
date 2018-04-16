

export type IRequestBuilderCreator = new (url, resbuilder?: IResponseBuilder) => IRequestBuilder;

export interface IRequestBuilder {

    isForm(): IRequestBuilder;

    isJson(): IRequestBuilder;

    contentType(contentType): IRequestBuilder;

    dataType(dataType): IRequestBuilder;

    headers(obj): IRequestBuilder;

    get(query?): Promise<any>;

    post(data?,json?): Promise<any>;

    put(data?, json?): Promise<any>;

    remove(query?): Promise<any>;

    jsonp(query, callbackParam?): Promise<any>;

    stop();
}


export type IResponseBuilderCreator = new () => IResponseBuilder;

export interface IResponseBuilder {
    resolve(resp): any;
}