import di from '@jsmodules/di';
import { kvStore } from '@jsmodules/storage';
import { IKeyValueStorage } from '@jsmodules/storage/src/KeyValueStorage/types';

import { Pipeline } from '../pipeline';
import { LoginMethodOptions, TokenService } from '../token';

const USER_STORAGE_KEY = "current_user";

type UserPart = {
    [key: string]: any;
};

const UserGetter = new Pipeline<UserPart>();

@di.injectable("SessionService")
export class SessionService {
    static get UserGetter() {
        return UserGetter;
    }
    @kvStore("app", { encrypted: false }) private sessionStore: IKeyValueStorage;

    @di.Inject(TokenService) private tokenService: TokenService;

    isAuthenticated: boolean = null;

    user: any = null;

    getLoginedUser<T>(): T | null {
        return this.user;
    }

    async login(options: LoginMethodOptions) {
        try {
            await this.tokenService.login(options);
            const user = await UserGetter.exec();
            await this.sessionStore.setAsync(USER_STORAGE_KEY, user);
            this.user = user;
            this.isAuthenticated = true;
        } catch (ex) {
            this.user = null;
            this.isAuthenticated = false;
            return Promise.reject(ex);
        }
    }

    async logout() {
        await this.tokenService.logout();
        await this.sessionStore.removeAsync(USER_STORAGE_KEY);
        this.user = null;
        this.isAuthenticated = false;
    }

    async initAsync() {
        try {
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
        } catch (ex) {
            console.error(ex);
        }
    }
}
