export declare class RxRepos<T> {
    s: any;
    constructor(s: any);
    getConnection(): Promise<import("rxdb").RxDatabase<{
        [key: string]: import("rxdb").RxCollection<any, {}, {
            [key: string]: any;
        }>;
    }>>;
    get(id: any): Promise<T | undefined>;
}
//# sourceMappingURL=RxRepos.d.ts.map