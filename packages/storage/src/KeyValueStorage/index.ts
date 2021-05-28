import di from '@jsmodules/di';

import { IKeyValueStorage, IKeyValueStorageManager } from './types';

const cached = new Map();

type KvStoreOptions = {
    encrypted?: boolean;
    dbName?: string;
};

type KvStorageCreater = (options: { storeName: string } & KvStoreOptions) => IKeyValueStorage;

export class KeyValueStorageManager implements IKeyValueStorageManager {
    Creater: KvStorageCreater = null;

    get(storeName, options: KvStoreOptions = {}): IKeyValueStorage {
        const skey = `${storeName}${options.encrypted ? "enctypted" : ""}${options.dbName || "app"}`;
        if (!cached.has(skey)) {
            let instance;
            if (this.Creater) {
                instance = this.Creater({
                    storeName,
                    ...options,
                });
            } else {
                instance = di.tryResolve("kvStorage", [storeName, options.encrypted, options.dbName]);
            }

            cached.set(skey, instance);
        }
        return cached.get(skey);
    }
}
export const kvManager = new KeyValueStorageManager();

/**
 * 获取键值存储对象
 * @deprecated
 * @param storeName
 * @param opts
 */
export function kvStore(storeName?: string, opts: KvStoreOptions = {}) {
    return function(target, propertyKey, desc?): any {
        const options = {
            get() {
                const key = storeName || propertyKey;
                return kvManager.get(key, opts);
            },
            set() {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true,
        };
        if (desc) {
            return options;
        }
        Object.defineProperty(target, propertyKey, options);
    };
}
/**
 * 获取用户数据库键值存储对象
 * @deprecated
 * @param storeName
 * @param opts
 */
export function useKvStore(storeName, opts: KvStoreOptions = {}) {
    return kvManager.get(storeName, opts);
}

export default kvManager;
