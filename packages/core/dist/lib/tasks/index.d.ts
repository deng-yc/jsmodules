export declare const Task: {
    /**
     * 多次调用只执行一次，执行成功后不会删除缓存结果
     * @param key
     * @param func
     */
    onceAsync<T extends unknown>(key: string, func: () => Promise<T>): Promise<any>;
    /**
     * 同时调用执行一次，执行成功后会删除缓存结果
     * @param key
     * @param func
     */
    throttleAsync<T_1 extends unknown>(key: string, func: () => Promise<T_1>): Promise<any>;
    /**
     * 删除任务缓存结果
     * @param key
     */
    clear(key: any): void;
};
//# sourceMappingURL=index.d.ts.map