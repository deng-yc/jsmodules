import { IKeyValueStorage, IKeyValueStorageManager } from './types';
export type { IKeyValueStorage };
type KvStoreOptions = {
    encrypted?: boolean;
    dbName?: string;
    [key: string]: any;
};
type KvStorageCreater = (options: {
    storeName: string;
} & KvStoreOptions) => IKeyValueStorage;
export declare class KeyValueStorageManager implements IKeyValueStorageManager {
    private cached;
    private creater;
    setCreater(creater: KvStorageCreater): void;
    get(storeName: any, options?: KvStoreOptions): IKeyValueStorage;
}
export declare const kvManager: KeyValueStorageManager;
/**
 * 获取键值存储对象
 * @deprecated
 * @param storeName
 * @param opts
 */
export declare function kvStore(storeName?: string, opts?: KvStoreOptions): (target: any, propertyKey: any, desc?: any) => any;
/**
 * 获取用户数据库键值存储对象
 * @deprecated
 * @param storeName
 * @param opts
 */
export declare function useKvStore(storeName: any, opts?: KvStoreOptions): IKeyValueStorage;
export * from './KeyValueStorage';
export default kvManager;
//# sourceMappingURL=index.d.ts.map