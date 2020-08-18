import { RxCollectionCreator, RxDatabase, RxDatabaseCreator } from 'rxdb';
declare type RxConnectionConfig = {
    config: RxDatabaseCreator;
    collections: RxCollectionCreator[];
};
declare class RxDbDbConnectionImpl {
    private create_promises;
    private createDatabase;
    addFactory(factory: (name: any) => RxConnectionConfig): this;
    addConfig(dbName: any, setting: RxConnectionConfig): this;
    get(name: any): Promise<RxDatabase>;
}
export declare const RxDbConnection: RxDbDbConnectionImpl;
export {};
//# sourceMappingURL=connection.d.ts.map