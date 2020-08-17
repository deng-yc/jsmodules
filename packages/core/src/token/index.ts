import di from '@jsmodules/di';
import { kvStore } from '@jsmodules/storage';
import { IKeyValueStorage } from '@jsmodules/storage/src/KeyValueStorage/types';

type TokenObject = {
    client_id: string;
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires: number;
};

type TokenGetterCallback = (tokenObj: TokenObject) => Promise<TokenObject>;

class TokenGetter {
    callbacks = [];

    use(callbackFn: TokenGetterCallback) {
        this.callbacks.push(callbackFn);
        return this;
    }

    async apply(token: TokenObject) {
        let result = token;
        for (const callback of this.callbacks) {
            result = await callback(result);
        }
        return result;
    }
}

@di.injectable("TokenService")
export class TokenService {
    @kvStore("tk_2sxrcl9dh", { encrypted: true }) private tokenStore: IKeyValueStorage;

    constructor(private skey = "at_i6lkasaa0") {}

    getter = new TokenGetter();

    private current: TokenObject;

    private async getTokenObject() {
        this.current = await this.getter.apply(this.current);
        return this.current;
    }

    async getAccessToken() {
        return (await this.getTokenObject()).access_token;
    }

    async getSecurityHeaders() {
        const obj = await this.getTokenObject();
        if (obj) {
            return `${obj.token_type} ${obj.access_token}`;
        }
        return null;
    }

    async initAsync() {
        const token = this.tokenStore.getAsync(this.skey);
    }
}
