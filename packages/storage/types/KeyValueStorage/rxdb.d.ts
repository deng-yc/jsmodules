import { IKeyValueStorage } from './types';
export declare class RxDbKeyValueStorage implements IKeyValueStorage {
    private __STORE_NAME__;
    private dbName;
    constructor(__STORE_NAME__: any, dbName?: string);
    private getCollection;
    keys(): Promise<any[]>;
    getAsync(key: string, defaultValue?: any): Promise<any>;
    setAsync(key: string, value: any): Promise<any>;
    batchSetObject(obj: any, keyProp?: any, valueProp?: any): Promise<any[]>;
    setObjectAsync(key: string, value: any): Promise<any>;
    getObjectAsync(key: string): Promise<any>;
    setObjectPropertyAsync(key: string, propertyName: string, value: any): Promise<any>;
    getObjectPropertiesAsync(key: string, ...propertyNames: any[]): Promise<{}>;
    getObjectValueAsync(key: string, propertyName: string): Promise<any>;
    removeAsync(key: string): Promise<void>;
    batchRemoveAsync(keys: any): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
    clearAsync(): Promise<any[]>;
}
