import di from "@jsmodules/di";
import { kvManager } from "@jsmodules/storage";

import { idgenerator } from "../idgenerator";
import { Pipeline } from "../pipeline";
import { Task } from "../tasks";
import { LoginMethodOptions, TokenService } from "../token";

const USER_STORAGE_KEY = "current_user";

type UserPart = {
    [key: string]: any;
};

const UserGetter = new Pipeline<UserPart>();

const interceptors = {
    getUser: UserGetter,
};

export class SessionService {
    static diOptions = di.options({
        name: "SessionService",
    });

    static get interceptors() {
        return interceptors;
    }

    private get sessionStore() {
        return kvManager.get("SessionService", { encrypted: false });
    }

    @di.Inject(TokenService) private tokenService: TokenService;

    isAuthenticated: boolean = null;

    _key = idgenerator.nextId();

    user: any = null;

    getLoginedUser<T>(): Promise<T | null> {
        return this.initAsync().then(() => {
            return this.user;
        });
    }

    loginAsync(options: LoginMethodOptions) {
        return this.tokenService
            .login(options)
            .then(() => {
                return this.updateAsync();
            })
            .then(() => {
                this.isAuthenticated = true;
            })
            .catch((err) => {
                this.user = null;
                this.isAuthenticated = false;
                return Promise.reject(err);
            });
    }

    logoutAsync() {
        return this.tokenService
            .logout()
            .then(() => {
                return this.sessionStore.removeAsync(USER_STORAGE_KEY);
            })
            .then(() => {
                this.user = null;
                this.isAuthenticated = false;
            });
    }

    updateAsync() {
        return Task.throttleAsync("update-xv7uhjzhq", () => {
            return interceptors.getUser.exec().then((user) => {
                this.user = user;
                return this.sessionStore.setAsync(USER_STORAGE_KEY, user);
            });
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
