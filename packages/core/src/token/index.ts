import di from "@jsmodules/di";
import { kvManager, kvStore } from "@jsmodules/storage";
import { IKeyValueStorage } from "@jsmodules/storage/src/KeyValueStorage/types";

import { Pipeline } from "../pipeline";

type TokenObject = {
    key: string;
    client_id?: string;
    token_type?: string;
    access_token: string;
    refresh_token?: string;
    expires?: number;
    auto_login?: boolean;
    created_unix?: number;
    [key: string]: any;
};

export type LoginMethodOptions = {
    type: string;
    client_id?: string;
    data: any;
    auto_login?: boolean;
};

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

const interceptors = {
    getTokenObject: new Pipeline<TokenObject | any>(),
    getSecurityHeaders: new Pipeline<TokenObject | any>(),
    loginMethods: new LoginMethods(),
};

export class TokenService {
    static diOptions = di.options({
        name: "TokenService",
        scope: "Singleton",
    });

    static get interceptors() {
        return interceptors;
    }

    private get tokenStore() {
        return kvManager.get("TokenService", { encrypted: true });
    }

    constructor(private skey = "access_token") {}

    private current: TokenObject;

    async getTokenObject() {
        if (!this.current) {
            this.current = await this.tokenStore.getAsync(this.skey);
        }
        const token = await interceptors.getTokenObject.exec(null, this.current);
        if (!token) {
            await this.logout();
        } else if (this.current?.key != token.key) {
            await this.tokenStore.setAsync(this.skey, token);
        }
        this.current = token;
        return this.current;
    }

    async login(options: LoginMethodOptions) {
        const token = await interceptors.loginMethods.exec(options);
        token.auto_login = options.auto_login || false;
        token.created_unix = Math.floor(new Date().getTime() / 1000);
        await this.tokenStore.setAsync(this.skey, token);
        this.current = token;
    }

    async logout() {
        await this.tokenStore.removeAsync(this.skey);
        this.current = null;
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
        const headers = await interceptors.getSecurityHeaders.exec(obj, null);
        if (headers) {
            return headers;
        }
        // if (obj) {
        //     return {
        //         Authorization: `${obj.token_type} ${obj.access_token}`,
        //     };
        // }
        return null;
    }
}
