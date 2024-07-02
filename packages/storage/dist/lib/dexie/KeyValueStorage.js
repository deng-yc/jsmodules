"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexieKeyValueStorage = void 0;
const tslib_1 = require("tslib");
const di_1 = tslib_1.__importDefault(require("@jsmodules/di"));
const lodash_1 = require("lodash");
const InternalEncrypt_1 = require("../encrypt/InternalEncrypt");
const connection_1 = require("./connection");
const stores_1 = require("./stores");
const encrypt = new InternalEncrypt_1.InternalEncrypt();
class DexieKeyValueStorage {
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
        const db = await connection_1.DexieConnection.get(this.dbName);
        if (this.encrypted) {
            return db.table(stores_1.kv_data_encrypted);
        }
        return db.table(stores_1.kv_data);
    }
    async getAllAsync() {
        const collection = await this.getCollection();
        const docs = await collection.where('group').equals(this.__STORE_NAME__).toArray();
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
        let result = defaultValue;
        const data = await collection.get(id);
        if (data) {
            result = data.value;
            if (this.encrypted) {
                return encrypt.decode(result);
            }
        }
        return result;
    }
    async setAsync(key, value) {
        if (/\//.test(key)) {
            throw new Error("key不能包含'/'");
        }
        const id = `${this.__STORE_NAME__}/${key}`;
        const collection = await this.getCollection();
        let writeValue = value;
        if (this.encrypted) {
            writeValue = encrypt.encode(value);
        }
        await collection.put({
            id: id,
            group: this.__STORE_NAME__,
            key,
            value: writeValue,
        }, id);
        return value;
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
                data.push({ id: id, key, group: this.__STORE_NAME__, value: val });
            }
        }
        else {
            for (const key in obj) {
                const id = `${this.__STORE_NAME__}/${key}`;
                const val = obj[key];
                data.push({ id: id, key, group: this.__STORE_NAME__, value: val });
            }
        }
        const collection = await this.getCollection();
        return collection.bulkAdd(data);
    }
    async removeAsync(key) {
        await this.batchRemoveAsync([key]);
    }
    async batchRemoveAsync(keys) {
        const collection = await this.getCollection();
        const query = collection.where('id').anyOf(keys.map(k => {
            return `${this.__STORE_NAME__}/${k}`;
        }));
        await query.delete();
    }
    async clearAsync() {
        const collection = await this.getCollection();
        const query = collection.where('group').equals(this.__STORE_NAME__);
        await query.delete();
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
exports.DexieKeyValueStorage = DexieKeyValueStorage;
//# sourceMappingURL=KeyValueStorage.js.map