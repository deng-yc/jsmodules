import { IKeyValueStorage, IKeyValueStorageManager } from './types';
declare type KvStoreOptions = {
    encrypted?: boolean;
    dbName?: string;
};
export declare class KeyValueStorageManager implements IKeyValueStorageManager {
    get(storeName: any, options?: KvStoreOptions): IKeyValueStorage;
}
export declare const kvManager: KeyValueStorageManager;
export declare function kvStore(storeName?: string, opts?: KvStoreOptions): (target: any, propertyKey: any, desc?: any) => any;
export declare function useKvStore(storeName: any, opts?: KvStoreOptions): IKeyValueStorage;
export default kvManager;
//# sourceMappingURL=index.d.ts.map