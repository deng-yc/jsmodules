export class KeyValueStorageManager {
    cached = new Map();
    creater = null;
    setCreater(creater) {
        this.creater = creater;
    }
    get(storeName, options = {}) {
        const skey = `${storeName}${options.encrypted ? 'enctypted' : ''}${options.dbName || 'app'}`;
        if (!this.cached.has(skey)) {
            let instance;
            if (this.creater) {
                instance = this.creater({
                    storeName,
                    ...options,
                });
            }
            else {
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
export function kvStore(storeName, opts = {}) {
    return function (target, propertyKey, desc) {
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
export function useKvStore(storeName, opts = {}) {
    return kvManager.get(storeName, opts);
}
export * from './KeyValueStorage';
export default kvManager;
//# sourceMappingURL=index.js.map