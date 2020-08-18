import isArray from 'lodash/isArray';

import di from '@jsmodules/di';

import { EncryptedKeyValue, KeyValue } from '../collections/KeyValue';
import { RxDbConnection } from '../rxdb/connection';
import { IKeyValueStorage } from './types';

@di.injectable("kvStorage", "Request")
export class RxDbKeyValueStorage implements IKeyValueStorage {
    constructor(private __STORE_NAME__, private encrypted = false, private dbName = "app") {}

    private async getCollection() {
        const db = await RxDbConnection.get(this.dbName);
        if (this.encrypted) {
            return db.collections[EncryptedKeyValue.name];
        }
        return db.collections[KeyValue.name];
    }

    async keys() {
        const collection = await this.getCollection();
        const docs = await collection.find().where("group").equals(this.__STORE_NAME__).exec();
        return docs.map((doc) => doc.key);
    }

    async getAsync(key: string, defaultValue = null) {
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

    async setAsync(key: string, value: any) {
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

    async batchSetObject(obj: any, keyProp?: any, valueProp?: any) {
        const data = [];
        if (isArray(obj)) {
            if (!keyProp) {
                throw new Error("批量写入数据未数组时,必须提供keyProp");
            }
            for (const item of obj) {
                const key = item[keyProp];
                if (!key || key == "") {
                    continue;
                }
                let val = item;
                if (valueProp) {
                    val = item[valueProp];
                }
                const id = `${this.__STORE_NAME__}/${key}`;
                data.push({ id: id, key, group: this.__STORE_NAME__, value: { _: val } });
            }
        } else {
            for (const key in obj) {
                const id = `${this.__STORE_NAME__}/${key}`;
                const val = obj[key];
                data.push({ id: id, key, group: this.__STORE_NAME__, value: { _: val } });
            }
        }
        const collection = await this.getCollection();
        return collection.bulkInsert(data);
    }

    async removeAsync(key: string) {
        await this.batchRemoveAsync([key]);
    }
    async batchRemoveAsync(keys: string[]) {
        const collection = await this.getCollection();
        const query = collection
            .find()
            .where("key")
            .in(
                keys.map((k) => {
                    return `${this.__STORE_NAME__}/${k}`;
                })
            );
        await query.remove();
    }

    async clearAsync() {
        const collection = await this.getCollection();
        const query = collection.find().where("group").equals(this.__STORE_NAME__);
        await query.remove();
    }

    async setObjectPropertyAsync(key: string, propertyName: string, value: any) {
        let obj = await this.getAsync(key);
        if (!obj) {
            obj = {};
        }
        obj[propertyName] = value;
        return this.setAsync(key, obj);
    }

    async getObjectPropertiesAsync(key: string, ...propertyNames: any[]) {
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

    async getObjectValueAsync(key: string, propertyName: string) {
        const obj = await this.getAsync(key);
        if (obj) {
            return obj[propertyName];
        }
        return null;
    }
}
