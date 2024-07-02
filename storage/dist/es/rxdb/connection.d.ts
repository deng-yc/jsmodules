import { RxCollectionCreator, RxDatabase, RxDatabaseCreator } from 'rxdb';
type RxConnectionConfig = {
    config: RxDatabaseCreator;
    collections: {
        [coll_name: string]: RxCollectionCreator;
    };
};
declare class RxDbDbConnectionImpl {
    private create_promises;
    private manager;
    private createDatabase;
    addFactory(factory: (name: any) => RxConnectionConfig): this;
    addConfig(dbName: any, setting: RxConnectionConfig): this;
    get(name: any): Promise<RxDatabase>;
    /**
     * 销毁数据库实例
     * @param name
     */
    destroy(name: any): Promise<void>;
    /**
     * 删除数据库
     * @param name
     */
    remove(name: any): Promise<void>;
}
export declare const RxDbConnection: RxDbDbConnectionImpl;
export {};
//# sourceMappingURL=connection.d.ts.map