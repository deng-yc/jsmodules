import { IKeyValueStorage, IKeyValueStorageManager } from './types';
export declare class KeyValueStorageManager implements IKeyValueStorageManager {
    get(storeName: any, dbName: any): IKeyValueStorage;
}
export declare const kvManager: KeyValueStorageManager;
export declare function kvStore(storeName?: string, dbName?: string): (target: any, propertyKey: any, desc?: any) => any;
export declare function useKvStore(storeName: any, dbName?: string): IKeyValueStorage;
export default kvManager;
