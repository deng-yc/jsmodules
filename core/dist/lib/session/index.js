"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const tslib_1 = require("tslib");
const di_1 = tslib_1.__importDefault(require("@jsmodules/di"));
const storage_1 = require("@jsmodules/storage");
const idgenerator_1 = require("../idgenerator");
const pipeline_1 = require("../pipeline");
const tasks_1 = require("../tasks");
const token_1 = require("../token");
const interceptors = {
    getUser: new pipeline_1.Pipeline(),
    getLoginedUser: new pipeline_1.Pipeline(),
    getStorageKey: new pipeline_1.Pipeline(),
};
class SessionService {
    static diOptions = di_1.default.options({
        name: 'SessionService',
    });
    static get interceptors() {
        return interceptors;
    }
    get sessionStore() {
        return storage_1.kvManager.get('SessionService', { encrypted: false });
    }
    get tokenService() {
        return di_1.default.getInstance(token_1.TokenService);
    }
    isAuthenticated = null;
    _key = idgenerator_1.idgenerator.nextId();
    user = null;
    get storageKey() {
        return interceptors.getStorageKey.execSync() || 'current_user';
    }
    getLoginedUser() {
        return this.initAsync().then(() => {
            return this.user;
        });
    }
    loginAsync(options) {
        return this.tokenService
            .login(options)
            .then(() => {
            return this.updateAsync();
        })
            .then(() => {
            this.isAuthenticated = true;
        })
            .catch(err => {
            this.user = null;
            this.isAuthenticated = false;
            return Promise.reject(err);
        });
    }
    getStorageUser() {
        return this.sessionStore.getAsync(this.storageKey);
    }
    logoutAsync() {
        return this.tokenService
            .logout()
            .then(() => {
            return this.sessionStore.removeAsync(this.storageKey);
        })
            .then(() => {
            this.user = null;
            this.isAuthenticated = false;
        });
    }
    updateAsync() {
        return tasks_1.Task.throttleAsync('update-xv7uhjzhq', () => {
            return interceptors.getUser.exec().then(user => {
                this.user = interceptors.getLoginedUser.execSync(user);
                return this.sessionStore.setAsync(this.storageKey, user);
            });
        });
    }
    initAsync() {
        return tasks_1.Task.onceAsync(`init-wdy7i7sqp`, async () => {
            try {
                const access_token = await this.tokenService.getAccessToken();
                if (!access_token) {
                    this.isAuthenticated = false;
                    return;
                }
                const user = await interceptors.getUser.exec();
                this.user = interceptors.getLoginedUser.execSync(user);
                this.isAuthenticated = true;
            }
            catch (ex) {
                this.isAuthenticated = false;
                this.user = null;
                console.error(ex);
            }
        });
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=index.js.map