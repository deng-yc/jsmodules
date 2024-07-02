"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
class LRUCacheImpl {
    cache;
    capacity;
    constructor(capacity = 100) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        let cache = this.cache;
        if (cache.has(key)) {
            let temp = cache.get(key);
            //删除原有数据，然后将他添加到最后位置
            cache.delete(key);
            cache.set(key, temp);
            return temp;
        }
        else {
            return -1;
        }
    }
    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        let cache = this.cache;
        if (cache.has(key)) {
            cache.delete(key);
        }
        else if (cache.size >= this.capacity) {
            //如果超过了最大数，删除第一条
            cache.delete(cache.keys().next().value);
        }
        cache.set(key, value);
    }
    /**
     * 清空所有缓存
     */
    clear() {
        this.cache.clear();
    }
}
exports.LRUCache = new LRUCacheImpl(100);
//# sourceMappingURL=LRUCache.js.map