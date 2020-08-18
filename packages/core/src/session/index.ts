import di from '@jsmodules/di';
import { kvStore } from '@jsmodules/storage';
import { IKeyValueStorage } from '@jsmodules/storage/src/KeyValueStorage/types';

import { Pipeline } from '../pipeline';
import { TokenService } from '../token';

const USER_STORAGE_KEY = "u7ulz2sry";

type UserPart = {
    [key: string]: any;
};

const UserGetter = new Pipeline<UserPart>();

@di.injectable("SessionService")
export class SessionService {
    static get UserGetter() {
        return UserGetter;
    }
    @kvStore("se_d8ig872lp", { encrypted: true }) private sessionStore: IKeyValueStorage;

    @di.Inject(TokenService) private tokenService: TokenService;

    isAuthenticated: boolean = null;

    user: any = null;

    async login(options) {
        await this.tokenService.login(options);
        await SessionService.UserGetter.exec();
    }
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
