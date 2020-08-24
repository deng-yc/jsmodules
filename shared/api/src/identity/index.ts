import { http } from '@jsmodules/core';
import di from '@jsmodules/di';

import { api } from '../decorators';

@di.injectable("identityApi")
export class IdentityApi {
    @api("identity_api_v1") private http: http.HttpFactory;

    connectToken() {
        return this.http.url("/../connect/token").contentType("application/x-www-form-urlencoded");
    }
}

export default IdentityApi;
