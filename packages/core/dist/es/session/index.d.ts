import { Pipeline } from '../pipeline';
import { LoginMethodOptions } from '../token';
type UserPart = {
    [key: string]: any;
};
export declare class SessionService {
    static diOptions: {
        name?: string;
        scope?: import("@jsmodules/di/dist/es/binding").BindingScope;
    };
    static get interceptors(): {
        getUser: Pipeline<UserPart, UserPart>;
        getLoginedUser: Pipeline<any, any>;
        getStorageKey: Pipeline<string, string>;
    };
    private get sessionStore();
    private get tokenService();
    isAuthenticated: boolean;
    _key: any;
    user: any;
    private get storageKey();
    getLoginedUser<T>(): Promise<T>;
    loginAsync(options: LoginMethodOptions): Promise<void>;
    getStorageUser(): Promise<any>;
    logoutAsync(): Promise<void>;
    updateAsync(): Promise<any>;
    initAsync(): Promise<any>;
}
export {};
//# sourceMappingURL=index.d.ts.map