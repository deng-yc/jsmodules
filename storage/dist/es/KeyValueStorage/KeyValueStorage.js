export class BaseKeyValueStorage {
    __STORE_NAME__;
    encrypted;
    dbName;
    constructor(__STORE_NAME__, encrypted = false, dbName = 'app') {
        this.__STORE_NAME__ = __STORE_NAME__;
        this.encrypted = encrypted;
        this.dbName = dbName;
    }
    async getAllAsync() {
        const keys = await this.keys();
        const tasks = [];
        for (const key of keys) {
            tasks.push(this.getAsync(key));
        }
        return Promise.all(tasks);
    }
    keys() {
        throw new Error('Method not implemented.');
    }
    getAsync(key, defaultValue) {
        throw new Error('Method not implemented.');
    }
    setAsync(key, value) {
        throw new Error('Method not implemented.');
    }
    batchSetObject(obj) {
        const tasks = [];
        for (const key in obj) {
            tasks.push(this.setAsync(key, obj[key]));
        }
        return Promise.all(tasks);
    }
    async setObjectPropertyAsync(key, propertyName, value) {
        let obj = await this.getAsync(key);
        if (!obj) {
            obj = {};
        }
        obj[propertyName] = value;
        return await this.setAsync(key, obj);
    }
    async getObjectPropertiesAsync(key, ...propertyNames) {
        let obj = await this.getAsync(key);
        if (!obj) {
            obj = {};
        }
        const result = {};
        for (const propertyName of propertyNames) {
            result[propertyName] = obj[propertyName];
        }
        return result;
    }
    async getObjectValueAsync(key, propertyName) {
        const obj = await this.getAsync(key);
        if (obj) {
            return obj[propertyName];
        }
        return null;
    }
    removeAsync(key) {
        throw new Error('Method not implemented.');
    }
    batchRemoveAsync(keys) {
        const tasks = [];
        for (const key of keys) {
            tasks.push(this.removeAsync(key));
        }
        return Promise.all(tasks);
    }
    async clearAsync() {
        const keys = await this.keys();
        return this.batchRemoveAsync(keys);
    }
}
//# sourceMappingURL=KeyValueStorage.js.map