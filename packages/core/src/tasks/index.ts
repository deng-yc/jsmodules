const tasksMap = new Map<string, Promise<any>>();

export const Task = {
    onceAsync<T extends any>(key: string, func: () => Promise<T>) {
        if (!tasksMap.has(key)) {
            tasksMap.set(key, func());
        }
        return tasksMap
            .get(key)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                tasksMap.delete(key);
                return Promise.reject(err);
            });
    },

    throttleAsync<T extends any>(key: string, func: () => Promise<T>) {
        return Task.onceAsync(key, func).then((result) => {
            tasksMap.delete(key);
            return result;
        });
    },
};
