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
    auto_login: boolean;
    created_unix: number;
};

export type LoginMethodOptions = {
    type: string;
    client_id?: string;
    data: any;
    auto_login?: boolean;
};

const TokenGetter = new Pipeline<TokenObject | any>();

class LoginMethods {
    private methods: any = {};
    use(type: string, callbackFn: (options: LoginMethodOptions) => Promise<TokenObject>) {
        this.methods[type] = this.methods[type] || [];
        this.methods[type].push(callbackFn);
    }

    async exec(options: LoginMethodOptions) {
        const type = options.type;
        if (this.methods[type]) {
            const callbacks = this.methods[type];
            let result = null;
            for (const callback of callbacks) {
                result = await callback(options, result);
            }
            return result;
        }
        throw new Error(`未配置登录方式${type}`);
    }
}

const loginMethods = new LoginMethods();

@di.injectable("TokenService")
export class TokenService {
    static get LoginMethod() {
        return loginMethods;
    }

    static get TokenGetter() {
        return TokenGetter;
    }

    @kvStore("app", { encrypted: true }) private tokenStore: IKeyValueStorage;

    constructor(private skey = "access_token") {}

    private current: TokenObject;

    private async getTokenObject() {
        if (!this.current) {
            this.current = await this.tokenStore.getAsync(this.skey);
        }
        const token = await TokenGetter.exec(null, this.current);
        if (!token) {
            await this.logout();
        }
        this.current = token;
        return this.current;
    }

    async login(options: LoginMethodOptions) {
        const token = await loginMethods.exec(options);
        token.auto_login = options.auto_login || false;
        token.created_unix = Math.floor(new Date().getTime() / 1000);
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
