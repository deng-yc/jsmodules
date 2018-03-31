import { IRequestBuilder, IRequestBuilderCreator, IResponseBuilderCreator } from './interface';
export declare class HttpFactory {
    baseUrl: string;
    private CreateReqBuilder;
    private CreateResponseBuilder;
    constructor(baseUrl: string, reqType?: IRequestBuilderCreator, resType?: IResponseBuilderCreator);
    url(api: any): IRequestBuilder;
}
export default HttpFactory;
