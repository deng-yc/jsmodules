import di from '@jsmodules/di';

import { RxDbKeyValueStorage } from './rxdb';
import { IKeyValueStorage, IKeyValueStorageManager } from './types';

const cached = new Map();

type KvStoreOptions = {
    encrypted?: boolean;
    dbName?: string;
};

export class KeyValueStorageManager implements IKeyValueStorageManager {
    get(storeName, options: KvStoreOptions = {}): IKeyValueStorage {
        const skey = `${storeName}${options.dbName || "app"}`;
        if (!cached.has(skey)) {
            const instance = di.getInstance(
                RxDbKeyValueStorage,
                [storeName, options.encrypted, options.dbName],
                "Request"
            );

            cached.set(skey, instance);
        }
        return cached.get(skey);
    }
}
export const kvManager = new KeyValueStorageManager();

export function kvStore(storeName?: string, opts: KvStoreOptions = {}) {
    return function (target, propertyKey, desc?): any {
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
export function useKvStore(storeName, opts: KvStoreOptions = {}) {
    return kvManager.get(storeName, opts);
}

export default kvManager;
