import { IKeyValueStorage } from './types';
export declare class RxDbKeyValueStorage implements IKeyValueStorage {
    private __STORE_NAME__;
    private encrypted;
    private dbName;
    constructor(__STORE_NAME__: any, encrypted?: boolean, dbName?: string);
    private getCollection;
    keys(): Promise<any[]>;
    getAsync(key: string, defaultValue?: any): Promise<any>;
    setAsync(key: string, value: any): Promise<any>;
    batchSetObject(obj: any, keyProp?: any, valueProp?: any): Promise<{
        success: any[];
        error: any[];
    }>;
    removeAsync(key: string): Promise<void>;
    batchRemoveAsync(keys: string[]): Promise<void>;
    clearAsync(): Promise<void>;
    setObjectPropertyAsync(key: string, propertyName: string, value: any): Promise<any>;
    getObjectPropertiesAsync(key: string, ...propertyNames: any[]): Promise<{}>;
    getObjectValueAsync(key: string, propertyName: string): Promise<any>;
}
