import di from '@jsmodules/di';

import { IKeyValueStorage, IKeyValueStorageManager } from './types';

const cached = new Map();

export class KeyValueStorageManager implements IKeyValueStorageManager {
    get(storeName, dbName): IKeyValueStorage {
        const skey = `${storeName}${dbName}`;
        if (!cached.has(skey)) {
            cached.set(skey, di.Resolve("kvStorage", storeName, dbName));
        }
        return cached.get(skey);
    }
}
export const kvManager = new KeyValueStorageManager();

export function kvStore(storeName?: string, dbName = "app") {
    return function (target, propertyKey, desc?): any {
        const options = {
            get() {
                const key = storeName || propertyKey;
                return kvManager.get(key, dbName);
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
export function useKvStore(storeName, dbName = "app") {
    return kvManager.get(storeName, dbName);
}

export default kvManager;
