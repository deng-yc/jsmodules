export declare class TimeService {
    static diOptions: {
        name?: string;
        scope?: import("@jsmodules/di/dist/es/binding").BindingScope;
    };
    private enableLog;
    private clientTime;
    private serverTime;
    disableLog(disable?: boolean): void;
    update(serverNow: any): void;
    serverNow(): number;
}
//# sourceMappingURL=index.d.ts.map