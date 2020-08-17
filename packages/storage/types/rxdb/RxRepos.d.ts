import { RxCollection } from 'rxdb';
export declare class RxRepos<T> {
    private configName;
    private config;
    constructor(configName: any, config: any);
    getDatabase(): Promise<import("rxdb").RxDatabase<import("rxdb").CollectionsOfDatabase>>;
    private collection_pormise;
    private _getCollection;
    getCollection(): Promise<RxCollection>;
    get(id: any): Promise<T | undefined>;
    filter(): Promise<import("rxdb").RxQuery<any, any[]>>;
    add(entity: T): Promise<any>;
    addOrUpdate(entity: T): Promise<any>;
    bulkInsert(entitys: T[]): Promise<{
        success: any[];
        error: any[];
    }>;
    remove(id: any): Promise<void>;
}
