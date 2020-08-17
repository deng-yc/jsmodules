/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type IResponseBuilder = {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request: any;
};

export type IRequestBuilderCreator = new (url) => IRequestBuilder;

export interface IRequestBuilder {
    url(url): this;

    addSecurityHeaders(required?: boolean): this;

    contentType(contentType: "application/x-www-form-urlencoded" | "application/json"): this;

    dataType(dataType): this;

    headers(obj): this;

    timeout(timeout: number): this;

    get(query?): Promise<IResponseBuilder>;

    post(data?, json?): Promise<IResponseBuilder>;

    put(data?, json?): Promise<IResponseBuilder>;

    head(): Promise<IResponseBuilder>;

    remove(query?): Promise<IResponseBuilder>;

    jsonp(query, callbackParam?): Promise<IResponseBuilder>;

    stop();
}

export interface IHttpFactory {
    create(): IRequestBuilder;
    url(api): IRequestBuilder;
}
