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

export type LoginMethodOptions = {
    type: string;
    data: any;
};

const TokenGetter = new Pipeline<TokenObject>();

const LoginMethod = new Pipeline<TokenObject, LoginMethodOptions>();

@di.injectable("TokenService")
export class TokenService {
    static get LoginMethod() {
        return LoginMethod;
    }

    static get TokenGetter() {
        return TokenGetter;
    }

    @kvStore("globak", { encrypted: true }) private tokenStore: IKeyValueStorage;

    constructor(private skey = "token") {}

    private current: TokenObject;

    private async getTokenObject() {
        if (!this.current) {
            this.current = await this.tokenStore.getAsync(this.skey);
        }
        this.current = await TokenGetter.exec(null, this.current);
        return this.current;
    }

    async login(options: LoginMethodOptions) {
        const token = await LoginMethod.exec(options);
        await this.tokenStore.setAsync(this.skey, token);
        this.current = token;
    }

    async logout() {
        await this.tokenStore.removeAsync(this.skey);
    }

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
            return {
                Authorization: `${obj.token_type} ${obj.access_token}`,
            };
        }
        return null;
    }
}
