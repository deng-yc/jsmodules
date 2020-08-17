import { RxCollectionCreator, RxDatabase, RxDatabaseCreator } from 'rxdb';
declare type RxConnectionConfig = {
    config: RxDatabaseCreator;
    collections: RxCollectionCreator[];
};
declare class RxDbDbConnectionImpl {
    addConfig(dbName: any, setting: RxConnectionConfig): void;
    private create_promises;
    private createDatabase;
    get(name: any): Promise<RxDatabase>;
}
export declare const RxDbConnection: RxDbDbConnectionImpl;
export {};
