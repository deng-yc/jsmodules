"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const tslib_1 = require("tslib");
const di_1 = tslib_1.__importDefault(require("@jsmodules/di"));
const storage_1 = require("@jsmodules/storage");
const pipeline_1 = require("../pipeline");
class LoginMethods {
    methods = {};
    use(type, callbackFn) {
        this.methods[type] = this.methods[type] || [];
        this.methods[type].push(callbackFn);
    }
    async exec(options) {
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
    getTokenObject: new pipeline_1.Pipeline(),
    getSecurityHeaders: new pipeline_1.Pipeline(),
    loginMethods: new LoginMethods(),
    getStorageKey: new pipeline_1.Pipeline(),
};
class TokenService {
    static diOptions = di_1.default.options({
        name: 'TokenService',
        scope: 'Singleton',
    });
    static get interceptors() {
        return interceptors;
    }
    get tokenStore() {
        return storage_1.kvManager.get('TokenService', { encrypted: true });
    }
    constructor() { }
    get storageKey() {
        const key = interceptors.getStorageKey.execSync();
        return key || 'access_token';
    }
    current;
    async getTokenObject() {
        if (!this.current) {
            this.current = await this.tokenStore.getAsync(this.storageKey);
        }
        const token = await interceptors.getTokenObject.exec(null, this.current);
        if (!token) {
            await this.logout();
        }
        else if (this.current?.key != token.key) {
            await this.tokenStore.setAsync(this.storageKey, token);
        }
        this.current = token;
        return this.current;
    }
    async login(options) {
        const token = await interceptors.loginMethods.exec(options);
        token.auto_login = options.auto_login || false;
        token.created_unix = Math.floor(new Date().getTime() / 1000);
        await this.tokenStore.setAsync(this.storageKey, token);
        this.current = token;
    }
    async logout() {
        if (this.current) {
            await this.tokenStore.removeAsync(this.storageKey);
            this.current = null;
        }
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
exports.TokenService = TokenService;
//# sourceMappingURL=index.js.map