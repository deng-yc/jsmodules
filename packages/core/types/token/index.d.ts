declare type TokenObject = {
    client_id: string;
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires: number;
};
declare type TokenGetterCallback = (tokenObj: TokenObject) => Promise<TokenObject>;
declare class TokenGetter {
    callbacks: any[];
    use(callbackFn: TokenGetterCallback): this;
    apply(token: TokenObject): Promise<TokenObject>;
}
export declare class TokenService {
    private skey;
    private tokenStore;
    constructor(skey?: string);
    getter: TokenGetter;
    private current;
    getAccessToken(): Promise<string>;
    initAsync(): Promise<void>;
}
export {};
