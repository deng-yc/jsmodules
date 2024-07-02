const tasksMap = new Map<string, Promise<any>>();

export const Task = {
  /**
   * 多次调用只执行一次，执行成功后不会删除缓存结果
   * @param key
   * @param func
   */
  onceAsync<T extends any>(key: string, func: () => Promise<T>) {
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
  throttleAsync<T extends any>(key: string, func: () => Promise<T>) {
    return Task.onceAsync(key, func).then(result => {
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
