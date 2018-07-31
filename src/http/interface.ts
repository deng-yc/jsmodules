


export type IResponseBuilder = {
    data: any;   
    status: number;
    statusText: string
    headers: any;
    config: any;
    request: any;
}

export type IRequestBuilderCreator = new (url) => IRequestBuilder;

export interface IRequestBuilder {

    isForm(): IRequestBuilder;

    isJson(): IRequestBuilder;

    contentType(contentType): IRequestBuilder;

    dataType(dataType): IRequestBuilder;

    headers(obj): IRequestBuilder;

    timeout(timeout: number): IRequestBuilder;

    get(query?): Promise<IResponseBuilder>;

    post(data?, json?): Promise<IResponseBuilder>;

    put(data?, json?): Promise<IResponseBuilder>;

    remove(query?): Promise<IResponseBuilder>;

    jsonp(query, callbackParam?): Promise<IResponseBuilder>;

    stop();
}
