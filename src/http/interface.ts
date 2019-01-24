


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

    /**
     * Ìí¼Óaccess_token
     * @param required ÊÇ·ñ±ØÐë
     */
    addSecurityHeaders(required?: boolean): IRequestBuilder;

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
