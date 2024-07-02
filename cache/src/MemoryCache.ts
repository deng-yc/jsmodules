const cached = {};
type CacheOptions = {
    timeout?: number;
};

class MemoryCacheGroup {
    private __$cached: any = {};
    constructor(public groupName) {
        this.__$cached = cached[groupName] = cached[groupName] = {};
    }

    remove(...keys) {
        for (const key of keys) {
            delete this.__$cached[key];
        }
    }
    getAsync<T>(key, fn: () => Promise<T>, options: CacheOptions = {}): Promise<T> {
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
            } else {
                cacheItem = {};
            }
        }
        return Promise.resolve(cacheItem.data);
    }
    /**
     * 多次请求返回第一次请求,请求结束后自动删除,可用于同一个请求去重
     */
    onceAsync<T>(key, fn: () => Promise<T>): Promise<T> {
        return this.getAsync<T>(key, fn).then((res) => {
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
    set<T>(key, value: T, options: CacheOptions = {}): T {
        const now = new Date().valueOf();
        this.__$cached[key] = {
            data: value,
            timeout: options.timeout != undefined ? now + options.timeout : undefined,
        };
        return value;
    }
    get<T>(key, fn?: () => T, options: CacheOptions = {}) {
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
            } else {
                cacheItem = {};
            }
        }
        return cacheItem.data as T;
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

    group(groupName = "default"): MemoryCacheGroup {
        if (!MemoryCache.__$groups[groupName]) {
            MemoryCache.__$groups[groupName] = new MemoryCacheGroup(groupName);
        }
        return MemoryCache.__$groups[groupName];
    },

    clear(groupName?) {
        if (groupName) {
            MemoryCache.group(groupName).clear();
        } else {
            MemoryCache.__$groups = {};
        }
    },

    remove(...keys) {
        MemoryCache.group().remove(...keys);
    },

    getAsync<T>(key, fn: () => Promise<T>, options: CacheOptions = {}): Promise<T> {
        return MemoryCache.group().getAsync<T>(key, fn, options);
    },

    /**
     * 多次请求返回第一次请求,请求结束后自动删除,可用于同一个请求去重
     */
    onceAsync<T>(key, fn: () => Promise<T>): Promise<T> {
        return MemoryCache.group().onceAsync<T>(key, fn);
    },

    has(key) {
        return MemoryCache.group().has(key);
    },

    set<T>(key, value: T, options: CacheOptions = {}): T {
        return MemoryCache.group().set<T>(key, value, options);
    },

    get<T>(key, fn?: () => T, options: CacheOptions = {}) {
        return MemoryCache.group().get<T>(key, fn, options);
    },
};

export default MemoryCache;
