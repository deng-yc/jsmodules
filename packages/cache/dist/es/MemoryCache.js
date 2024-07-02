const cached = {};
class MemoryCacheGroup {
    groupName;
    __$cached = {};
    constructor(groupName) {
        this.groupName = groupName;
        this.__$cached = cached[groupName] = cached[groupName] = {};
    }
    remove(...keys) {
        for (const key of keys) {
            delete this.__$cached[key];
        }
    }
    getAsync(key, fn, options = {}) {
        let cacheItem = this.__$cached[key];
        const now = new Date().valueOf();
        if (cacheItem) {
            if (cacheItem.timeout != undefined && now > cacheItem.timeout) {
                // console.log('缓存已过期', key, cacheItem);
                cacheItem = null;
            }
        }
        if (!cacheItem) {
            if (fn) {
                cacheItem = this.__$cached[key] = {
                    timeout: options.timeout != undefined ? now + options.timeout : undefined,
                    data: fn()
                        .catch((ex) => {
                        this.remove(key);
                        return Promise.reject(ex);
                    })
                        .then((result) => {
                        return result;
                    }),
                };
            }
            else {
                cacheItem = {};
            }
        }
        return Promise.resolve(cacheItem.data);
    }
    /**
     * 多次请求返回第一次请求,请求结束后自动删除,可用于同一个请求去重
     */
    onceAsync(key, fn) {
        return this.getAsync(key, fn).then((res) => {
            this.remove(key);
            return res;
        });
    }
    has(key) {
        if (this.__$cached[key]) {
            return true;
        }
        return false;
    }
    set(key, value, options = {}) {
        const now = new Date().valueOf();
        this.__$cached[key] = {
            data: value,
            timeout: options.timeout != undefined ? now + options.timeout : undefined,
        };
        return value;
    }
    get(key, fn, options = {}) {
        let cacheItem = this.__$cached[key];
        const now = new Date().valueOf();
        if (cacheItem) {
            if (cacheItem.timeout != undefined && now > cacheItem.timeout) {
                cacheItem = null;
            }
        }
        if (!cacheItem) {
            if (fn) {
                cacheItem = this.__$cached[key] = {
                    timeout: options.timeout != undefined ? now + options.timeout : undefined,
                    data: fn(),
                };
            }
            else {
                cacheItem = {};
            }
        }
        return cacheItem.data;
    }
    keys() {
        return Object.keys(this.__$cached);
    }
    clear() {
        this.__$cached = {};
    }
}
export const MemoryCache = {
    __$groups: {},
    group(groupName = "default") {
        if (!MemoryCache.__$groups[groupName]) {
            MemoryCache.__$groups[groupName] = new MemoryCacheGroup(groupName);
        }
        return MemoryCache.__$groups[groupName];
    },
    clear(groupName) {
        if (groupName) {
            MemoryCache.group(groupName).clear();
        }
        else {
            MemoryCache.__$groups = {};
        }
    },
    remove(...keys) {
        MemoryCache.group().remove(...keys);
    },
    getAsync(key, fn, options = {}) {
        return MemoryCache.group().getAsync(key, fn, options);
    },
    /**
     * 多次请求返回第一次请求,请求结束后自动删除,可用于同一个请求去重
     */
    onceAsync(key, fn) {
        return MemoryCache.group().onceAsync(key, fn);
    },
    has(key) {
        return MemoryCache.group().has(key);
    },
    set(key, value, options = {}) {
        return MemoryCache.group().set(key, value, options);
    },
    get(key, fn, options = {}) {
        return MemoryCache.group().get(key, fn, options);
    },
};
export default MemoryCache;
//# sourceMappingURL=MemoryCache.js.map