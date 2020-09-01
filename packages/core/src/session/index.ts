import di from '@jsmodules/di';
import { kvStore } from '@jsmodules/storage';
import { IKeyValueStorage } from '@jsmodules/storage/src/KeyValueStorage/types';

import { Pipeline } from '../pipeline';
import { Task } from '../tasks';
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

    async getLoginedUser<T>(): Promise<T | null> {
        await this.initAsync();
        return this.user;
    }

    async loginAsync(options: LoginMethodOptions) {
        try {
            await this.tokenService.login(options);
            await this.updateAsync();
            this.isAuthenticated = true;
        } catch (ex) {
            this.user = null;
            this.isAuthenticated = false;
            return Promise.reject(ex);
        }
    }

    async logoutAsync() {
        await this.tokenService.logout();
        await this.sessionStore.removeAsync(USER_STORAGE_KEY);
        this.user = null;
        this.isAuthenticated = false;
    }

    updateAsync() {
        return Task.throttleAsync("update-xv7uhjzhq", async () => {
            const user = await UserGetter.exec();
            this.user = user;
            await this.sessionStore.setAsync(USER_STORAGE_KEY, user);
        });
    }
    initAsync() {
        return Task.onceAsync(`init-wdy7i7sqp`, async () => {
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
        });
    }
}
