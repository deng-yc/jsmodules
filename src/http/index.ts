import { JQueryAjaxBuilder, ResponseBuilder } from './builder';
import { IRequestBuilder, IRequestBuilderCreator, IResponseBuilderCreator } from './interface';
import str from '../str';
export class HttpFactory {

    private CreateReqBuilder: IRequestBuilderCreator;
    private CreateResponseBuilder: IResponseBuilderCreator;

    constructor(public baseUrl: string,reqType?: IRequestBuilderCreator,resType?: IResponseBuilderCreator) {
        this.CreateReqBuilder = reqType || JQueryAjaxBuilder;
        this.CreateResponseBuilder = resType || ResponseBuilder;
    }

    url(api): IRequestBuilder {

        var url = `${str.trimEnd(this.baseUrl, '/')}/${str.trimStart(api, '/')}`;

        return new this.CreateReqBuilder(url, new this.CreateResponseBuilder());
    }
}


export default HttpFactory