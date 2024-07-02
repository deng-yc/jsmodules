import { IKeyValueStorage } from './types';
export declare class BaseKeyValueStorage implements IKeyValueStorage {
    private __STORE_NAME__;
    private encrypted;
    private dbName;
    constructor(__STORE_NAME__: any, encrypted?: boolean, dbName?: string);
    getAllAsync(): Promise<any[]>;
    keys(): Promise<string[]>;
    getAsync(key: string, defaultValue?: any): Promise<any>;
    setAsync(key: string, value: any): Promise<any>;
    batchSetObject(obj: any): Promise<any>;
    setObjectPropertyAsync(key: string, propertyName: string, value: any): Promise<any>;
    getObjectPropertiesAsync(key: string, ...propertyNames: any[]): Promise<any>;
    getObjectValueAsync(key: string, propertyName: string): Promise<any>;
    removeAsync(key: string): Promise<any>;
    batchRemoveAsync(keys: string[]): Promise<any>;
    clearAsync(): Promise<any>;
}
//# sourceMappingURL=KeyValueStorage.d.ts.map