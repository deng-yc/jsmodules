import { IKeyValueStorage, IKeyValueStorageManager } from './types';

export type { IKeyValueStorage };

type KvStoreOptions = {
  encrypted?: boolean;
  dbName?: string;
  [key: string]: any;
};

type KvStorageCreater = (options: { storeName: string } & KvStoreOptions) => IKeyValueStorage;

export class KeyValueStorageManager implements IKeyValueStorageManager {
  private cached = new Map();

  private creater: KvStorageCreater = null;

  setCreater(creater: KvStorageCreater) {
    this.creater = creater;
  }

  get(storeName, options: KvStoreOptions = {}): IKeyValueStorage {
    const skey = `${storeName}${options.encrypted ? 'enctypted' : ''}${options.dbName || 'app'}`;
    if (!this.cached.has(skey)) {
      let instance;
      if (this.creater) {
        instance = this.creater({
          storeName,
          ...options,
        });
      } else {
        throw new Error('未设置kvStore实现方式');
      }
      this.cached.set(skey, instance);
    }
    return this.cached.get(skey);
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
  return function (target, propertyKey, desc?): any {
    const options = {
      get() {
        const key = storeName || propertyKey;
        return kvManager.get(key, opts);
      },
      set() {
        throw new Error('Not allowed');
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

export * from './KeyValueStorage';

export default kvManager;
