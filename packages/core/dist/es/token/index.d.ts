import { Pipeline } from '../pipeline';
type TokenObject = {
    key: string;
    client_id?: string;
    token_type?: string;
    access_token: string;
    refresh_token?: string;
    expires?: number;
    auto_login?: boolean;
    created_unix?: number;
    [key: string]: any;
};
export type LoginMethodOptions = {
    type: string;
    client_id?: string;
    data: any;
    auto_login?: boolean;
};
declare class LoginMethods {
    private methods;
    use(type: string, callbackFn: (options: LoginMethodOptions) => Promise<TokenObject>): void;
    exec(options: LoginMethodOptions): Promise<any>;
}
export declare class TokenService {
    static diOptions: {
        name?: string;
        scope?: import("@jsmodules/di/dist/es/binding").BindingScope;
    };
    static get interceptors(): {
        getTokenObject: Pipeline<any, any>;
        getSecurityHeaders: Pipeline<any, any>;
        loginMethods: LoginMethods;
        getStorageKey: Pipeline<string, string>;
    };
    private get tokenStore();
    constructor();
    private get storageKey();
    private current;
    getTokenObject(): Promise<TokenObject>;
    login(options: LoginMethodOptions): Promise<void>;
    logout(): Promise<void>;
    getAccessToken(): Promise<string>;
    getSecurityHeaders(): Promise<any>;
}
export {};
//# sourceMappingURL=index.d.ts.map