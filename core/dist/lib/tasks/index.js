"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const tasksMap = new Map();
exports.Task = {
    /**
     * 多次调用只执行一次，执行成功后不会删除缓存结果
     * @param key
     * @param func
     */
    onceAsync(key, func) {
        if (!tasksMap.has(key)) {
            tasksMap.set(key, func());
        }
        return tasksMap
            .get(key)
            .then(result => {
            return result;
        })
            .catch(err => {
            tasksMap.delete(key);
            return Promise.reject(err);
        });
    },
    /**
     * 同时调用执行一次，执行成功后会删除缓存结果
     * @param key
     * @param func
     */
    throttleAsync(key, func) {
        return exports.Task.onceAsync(key, func).then(result => {
            tasksMap.delete(key);
            return result;
        });
    },
    /**
     * 删除任务缓存结果
     * @param key
     */
    clear(key) {
        if (tasksMap.has(key)) {
            tasksMap.delete(key);
        }
    },
};
//# sourceMappingURL=index.js.map