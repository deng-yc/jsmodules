type CacheOptions = {
    timeout?: number;
};
declare class MemoryCacheGroup {
    groupName: any;
    private __$cached;
    constructor(groupName: any);
    remove(...keys: any[]): void;
    getAsync<T>(key: any, fn: () => Promise<T>, options?: CacheOptions): Promise<T>;
    /**
     * 多次请求返回第一次请求,请求结束后自动删除,可用于同一个请求去重
     */
    onceAsync<T>(key: any, fn: () => Promise<T>): Promise<T>;
    has(key: any): boolean;
    set<T>(key: any, value: T, options?: CacheOptions): T;
    get<T>(key: any, fn?: () => T, options?: CacheOptions): T;
    keys(): string[];
    clear(): void;
}
export declare const MemoryCache: {
    __$groups: {};
    group(groupName?: string): MemoryCacheGroup;
    clear(groupName?: any): void;
    remove(...keys: any[]): void;
    getAsync<T>(key: any, fn: () => Promise<T>, options?: CacheOptions): Promise<T>;
    /**
     * 多次请求返回第一次请求,请求结束后自动删除,可用于同一个请求去重
     */
    onceAsync<T_1>(key: any, fn: () => Promise<T_1>): Promise<T_1>;
    has(key: any): boolean;
    set<T_2>(key: any, value: T_2, options?: CacheOptions): T_2;
    get<T_3>(key: any, fn?: () => T_3, options?: CacheOptions): T_3;
};
export default MemoryCache;
//# sourceMappingURL=MemoryCache.d.ts.map