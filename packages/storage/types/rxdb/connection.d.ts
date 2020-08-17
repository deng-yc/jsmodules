import { RxCollectionCreator, RxDatabase, RxDatabaseCreator } from 'rxdb';
declare type RxConnectionConfig = {
    config: RxDatabaseCreator;
    collections: RxCollectionCreator[];
};
declare class RxDbDbConnectionImpl {
    private create_promises;
    private createDatabase;
    addConfig(dbName: any, setting: RxConnectionConfig): void;
    get(name: any): Promise<RxDatabase>;
}
export declare const RxDbConnection: RxDbDbConnectionImpl;
export {};
