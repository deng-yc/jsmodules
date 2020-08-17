declare class LRUCacheImpl {
    cache: Map<string, any>;
    capacity: number;
    constructor(capacity?: number);
    /**
     * @param {number} key
     * @return {number}
     */
    get(key: any): any;
    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key: any, value: any): void;
    /**
     * 清空所有缓存
     */
    clear(): void;
}
export declare const LRUCache: LRUCacheImpl;
export {};
