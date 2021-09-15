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

const interceptors = {
    getUser: new Pipeline<UserPart>(),
    getLoginedUser: new Pipeline<any>(),
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

    private get tokenService() {
        return di.getInstance(TokenService);
    }

    isAuthenticated: boolean = null;

    _key = idgenerator.nextId();

    user: any = null;

    getLoginedUser<T>(): Promise<T> {
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
                this.user = interceptors.getLoginedUser.execSync(user);
                return this.sessionStore.setAsync(USER_STORAGE_KEY, user);
            });
        });
    }

    initAsync(offline = false) {
        return Task.onceAsync(`init-wdy7i7sqp`, async () => {
            try {
                const access_token = await this.tokenService.getAccessToken();
                if (!access_token) {
                    this.isAuthenticated = false;
                    return;
                }
                if (offline) {
                    const user = await this.sessionStore.getAsync(USER_STORAGE_KEY);
                    if (!user) {
                        this.isAuthenticated = false;
                        return;
                    }
                    this.user = interceptors.getLoginedUser.execSync(user);
                    this.isAuthenticated = true;
                } else {
                    const user = await interceptors.getUser.exec();
                    this.user = interceptors.getLoginedUser.execSync(user);
                    this.isAuthenticated = true;
                }
            } catch (ex) {
                console.error(ex);
            }
        });
    }
}
