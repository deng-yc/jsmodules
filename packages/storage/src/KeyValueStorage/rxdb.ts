import isArray from 'lodash/isArray';

import { KeyValue } from '../collections/KeyValue';
import { RxConnection } from '../rxdb/connection';
import { IKeyValueStorage } from './types';

export class RxDbKeyValueStorage implements IKeyValueStorage {
    constructor(private __STORE_NAME__, private dbName = "app") {}

    private async getCollection() {
        const db = await RxConnection.get(this.dbName);
        return db.collections[KeyValue.name];
    }

    async keys() {
        const len = localStorage.length;
        const keys = [];
        for (let i = 0; i < len; i++) {
            const key = localStorage.key(i);
            const [name, _key] = key.split("/");
            if (name == this.__STORE_NAME__) {
                keys.push(_key);
            }
        }
        return keys;
    }

    async getAsync(key: string, defaultValue = null) {
        if (/\//.test(key)) {
            throw new Error("key不能包含'/'");
        }
        const _key = `${this.__STORE_NAME__}/${key}`;
        const collection = await this.getCollection();
        const res = await collection.findByIds([_key]);
        let result = defaultValue;
        if (res.has(_key)) {
            result = res.get(_key).toJSON().value._;
        }
        return result;
    }

    async setAsync(key: string, value: any) {
        if (/\//.test(key)) {
            throw new Error("key不能包含'/'");
        }
        const _key = `${this.__STORE_NAME__}/${key}`;
        const collection = await this.getCollection();
        const res = await collection.atomicUpsert({
            key: _key,
            value: {
                _: value,
            },
        });
        return res.value.data;
    }

    async batchSetObject(obj: any, keyProp?: any, valueProp?: any) {
        const tasks: any[] = [];
        if (isArray(obj)) {
            for (const item of obj) {
                const key = item[keyProp];
                if (!key || key == "") {
                    continue;
                }
                let val = item;
                if (valueProp) {
                    val = item[valueProp];
                }
                tasks.push(this.setObjectAsync(key, val));
            }
        } else {
            for (const key in obj) {
                tasks.push(this.setObjectAsync(key, obj[key]));
            }
        }
        return Promise.all(tasks);
    }

    async setObjectAsync(key: string, value: any) {
        await this.setAsync(key, value);
        return value;
    }

    async getObjectAsync(key: string) {
        const data = await this.getAsync(key, null);
        return data;
    }

    async setObjectPropertyAsync(key: string, propertyName: string, value: any) {
        let obj = await this.getObjectAsync(key);
        if (!obj) {
            obj = {};
        }
        obj[propertyName] = value;
        return this.setObjectAsync(key, obj);
    }

    async getObjectPropertiesAsync(key: string, ...propertyNames: any[]) {
        let obj = await this.getObjectAsync(key);
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
        const obj = await this.getObjectAsync(key);
        if (obj) {
            return obj[propertyName];
        }
        return null;
    }

    async removeAsync(key: string) {
        const _key = `${this.__STORE_NAME__}/${key}`;
        localStorage.removeItem(_key);
    }

    batchRemoveAsync(keys) {
        const tasks: any = [];
        for (const key of keys) {
            tasks.push(this.removeAsync(key));
        }
        return Promise.all(tasks);
    }
    async clearAsync() {
        const keys: any[] = await this.keys();
        const removeKeys: any[] = [];
        for (const key of keys) {
            const name = key.split("/")[0];
            if (name == this.__STORE_NAME__) {
                removeKeys.push(key);
            }
        }
        this.batchRemoveAsync(removeKeys);
        return keys;
    }
}
