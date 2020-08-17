declare type UserPart = {
    [key: string]: any;
};
declare type UserGetterCallback = (user: any) => Promise<UserPart>;
declare class UserGetter {
    callbacks: any[];
    use(callbackFn: UserGetterCallback): this;
    apply(): Promise<{}>;
}
export declare class SessionService {
    static UserGetter: UserGetter;
    private sessionStore;
    private tokenService;
    isAuthenticated: boolean;
    user: any;
    initAsync(): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map