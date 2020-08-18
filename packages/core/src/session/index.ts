import di from '@jsmodules/di';
import { kvStore } from '@jsmodules/storage';
import { IKeyValueStorage } from '@jsmodules/storage/src/KeyValueStorage/types';

import { TokenService } from '../token';

const USER_STORAGE_KEY = "u7ulz2sry";

type UserPart = {
    [key: string]: any;
};

type UserGetterCallback = (user) => Promise<UserPart>;

class UserGetter {
    callbacks = [];
    use(callbackFn: UserGetterCallback) {
        this.callbacks.push(callbackFn);
        return this;
    }
    async apply() {
        let result = {};
        for (const callback of this.callbacks) {
            const part = await callback(result);
            result = { ...result, ...part };
        }
        return result;
    }
}
@di.injectable("SessionService")
export class SessionService {
    static UserGetter = new UserGetter();

    @kvStore("se_d8ig872lp", { encrypted: true }) private sessionStore: IKeyValueStorage;

    @di.Inject(TokenService) private tokenService: TokenService;

    isAuthenticated: boolean = null;

    user: any = null;

    async initAsync() {
        const access_token = await this.tokenService.getAccessToken();
        if (!access_token) {
            this.isAuthenticated = false;
            return;
        }
        const user = await this.sessionStore.getAsync(USER_STORAGE_KEY);
        if (!user) {
            this.isAuthenticated = false;
            return;
        }
        this.user = user;
        this.isAuthenticated = true;
    }
}
