"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKvStore = exports.kvStore = exports.kvManager = exports.KeyValueStorageManager = void 0;
const tslib_1 = require("tslib");
class KeyValueStorageManager {
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
exports.KeyValueStorageManager = KeyValueStorageManager;
exports.kvManager = new KeyValueStorageManager();
/**
 * 获取键值存储对象
 * @deprecated
 * @param storeName
 * @param opts
 */
function kvStore(storeName, opts = {}) {
    return function (target, propertyKey, desc) {
        const options = {
            get() {
                const key = storeName || propertyKey;
                return exports.kvManager.get(key, opts);
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
exports.kvStore = kvStore;
/**
 * 获取用户数据库键值存储对象
 * @deprecated
 * @param storeName
 * @param opts
 */
function useKvStore(storeName, opts = {}) {
    return exports.kvManager.get(storeName, opts);
}
exports.useKvStore = useKvStore;
tslib_1.__exportStar(require("./KeyValueStorage"), exports);
exports.default = exports.kvManager;
//# sourceMappingURL=index.js.map