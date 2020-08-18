import di from '@jsmodules/di';
import { kvStore } from '@jsmodules/storage';
import { IKeyValueStorage } from '@jsmodules/storage/src/KeyValueStorage/types';

import { Pipeline } from '../pipeline';

type TokenObject = {
    client_id: string;
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires: number;
};

const TokenGetter = new Pipeline<TokenObject>();

@di.injectable("TokenService")
export class TokenService {
    static get TokenGetter() {
        return TokenGetter;
    }

    @kvStore("tk_2sxrcl9dh", { encrypted: true }) private tokenStore: IKeyValueStorage;

    constructor(private skey = "at_i6lkasaa0") {}

    private current: TokenObject;

    private async getTokenObject() {
        if (!this.current) {
            this.current = await this.tokenStore.getAsync(this.skey);
        }
        this.current = await TokenGetter.exec(this.current);
        return this.current;
    }

    async login(options) {}

    async getAccessToken() {
        const obj = await this.getTokenObject();
        if (obj) {
            return obj.access_token;
        }
        return null;
    }

    async getSecurityHeaders() {
        const obj = await this.getTokenObject();
        if (obj) {
            return `${obj.token_type} ${obj.access_token}`;
        }
        return null;
    }
}
