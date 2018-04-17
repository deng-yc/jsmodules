import { IRequestBuilder, IRequestBuilderCreator } from './interface';
export declare class HttpFactory {
    baseUrl: string;
    private CreateReqBuilder;
    constructor(baseUrl: string, reqType?: IRequestBuilderCreator);
    url(api: any): IRequestBuilder;
}
export default HttpFactory;
