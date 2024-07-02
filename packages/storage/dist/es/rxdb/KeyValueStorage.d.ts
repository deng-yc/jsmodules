import { IKeyValueStorage } from '../KeyValueStorage/types';
export declare class RxDbKeyValueStorage implements IKeyValueStorage {
    private __STORE_NAME__;
    private encrypted;
    private dbName;
    static diOptions: {
        name?: string;
        scope?: import("@jsmodules/di/dist/es/binding").BindingScope;
    };
    constructor(__STORE_NAME__: any, encrypted?: boolean, dbName?: string);
    private getCollection;
    getAllAsync(): Promise<any[]>;
    keys(): Promise<any[]>;
    getAsync(key: string, defaultValue?: any): Promise<any>;
    setAsync(key: string, value: any): Promise<any>;
    batchSetObject(obj: any, keyProp?: any, valueProp?: any): Promise<{
        success: any[];
        error: import("rxdb").RxStorageBulkWriteError<any>[];
    }>;
    removeAsync(key: string): Promise<void>;
    batchRemoveAsync(keys: string[]): Promise<void>;
    clearAsync(): Promise<void>;
    setObjectPropertyAsync(key: string, propertyName: string, value: any): Promise<any>;
    getObjectPropertiesAsync(key: string, ...propertyNames: any[]): Promise<{}>;
    getObjectValueAsync(key: string, propertyName: string): Promise<any>;
}
//# sourceMappingURL=KeyValueStorage.d.ts.map