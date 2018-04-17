import { JQueryAjaxRequestBuilder } from './builder';
import { IRequestBuilder, IRequestBuilderCreator } from './interface';
import str from '../str';
export class HttpFactory {

    private CreateReqBuilder: IRequestBuilderCreator;

    constructor(public baseUrl: string,reqType?: IRequestBuilderCreator) {
        this.CreateReqBuilder = reqType || JQueryAjaxRequestBuilder;
    }

    url(api): IRequestBuilder {

        var url = `${str.trimEnd(this.baseUrl, '/')}/${str.trimStart(api, '/')}`;

        return new this.CreateReqBuilder(url);
    }
}


export default HttpFactory