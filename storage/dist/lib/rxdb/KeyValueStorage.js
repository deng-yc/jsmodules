"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxDbKeyValueStorage = void 0;
const tslib_1 = require("tslib");
const di_1 = tslib_1.__importDefault(require("@jsmodules/di"));
const lodash_1 = require("lodash");
const KeyValue_1 = require("./collections/KeyValue");
const connection_1 = require("./connection");
class RxDbKeyValueStorage {
    __STORE_NAME__;
    encrypted;
    dbName;
    static diOptions = di_1.default.options({
        name: 'kvStorage',
        scope: 'Request',
    });
    constructor(__STORE_NAME__, encrypted = false, dbName = 'app') {
        this.__STORE_NAME__ = __STORE_NAME__;
        this.encrypted = encrypted;
        this.dbName = dbName;
    }
    async getCollection() {
        const db = await connection_1.RxDbConnection.get(this.dbName);
        if (this.encrypted) {
            return db.collections[KeyValue_1.kv_data_encrypted];
        }
        return db.collections[KeyValue_1.kv_data];
    }
    async getAllAsync() {
        const collection = await this.getCollection();
        const docs = await collection.find().where('group').equals(this.__STORE_NAME__).exec();
        return docs;
    }
    async keys() {
        const docs = await this.getAllAsync();
        return docs.map(doc => doc.key);
    }
    async getAsync(key, defaultValue = null) {
        if (/\//.test(key)) {
            throw new Error("key不能包含'/'");
        }
        const id = `${this.__STORE_NAME__}/${key}`;
        const collection = await this.getCollection();
        const res = await collection.findByIds([id]);
        let result = defaultValue;
        if (res.has(id)) {
            result = res.get(id).toJSON().value._;
        }
        return result;
    }
    async setAsync(key, value) {
        if (/\//.test(key)) {
            throw new Error("key不能包含'/'");
        }
        const id = `${this.__STORE_NAME__}/${key}`;
        const collection = await this.getCollection();
        const res = await collection.atomicUpsert({
            id: id,
            key,
            group: this.__STORE_NAME__,
            value: {
                _: value,
            },
        });
        return res.value.data;
    }
    async batchSetObject(obj, keyProp, valueProp) {
        const data = [];
        if ((0, lodash_1.isArray)(obj)) {
            if (!keyProp) {
                throw new Error('批量写入数据未数组时,必须提供keyProp');
            }
            for (const item of obj) {
                const key = item[keyProp];
                if (!key || key == '') {
                    continue;
                }
                let val = item;
                if (valueProp) {
                    val = item[valueProp];
                }
                const id = `${this.__STORE_NAME__}/${key}`;
                data.push({ id: id, key, group: this.__STORE_NAME__, value: { _: val } });
            }
        }
        else {
            for (const key in obj) {
                const id = `${this.__STORE_NAME__}/${key}`;
                const val = obj[key];
                data.push({ id: id, key, group: this.__STORE_NAME__, value: { _: val } });
            }
        }
        const collection = await this.getCollection();
        return collection.bulkInsert(data);
    }
    async removeAsync(key) {
        await this.batchRemoveAsync([key]);
    }
    async batchRemoveAsync(keys) {
        const collection = await this.getCollection();
        const query = collection
            .find()
            .where('id')
            .in(keys.map(k => {
            return `${this.__STORE_NAME__}/${k}`;
        }));
        await query.remove();
    }
    async clearAsync() {
        const collection = await this.getCollection();
        const query = collection.find().where('group').equals(this.__STORE_NAME__);
        await query.remove();
    }
    async setObjectPropertyAsync(key, propertyName, value) {
        let obj = await this.getAsync(key);
        if (!obj) {
            obj = {};
        }
        obj[propertyName] = value;
        return this.setAsync(key, obj);
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
}
exports.RxDbKeyValueStorage = RxDbKeyValueStorage;
//# sourceMappingURL=KeyValueStorage.js.map