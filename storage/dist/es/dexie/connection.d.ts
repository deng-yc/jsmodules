import Dexie, { DexieOptions } from 'dexie';
type DexieConnectionConfig = {
    version: number;
    options: DexieOptions;
    collections: {
        [tableName: string]: string;
    };
};
declare class DexieConnectionImpl {
    private create_promises;
    private manager;
    private createDatabase;
    addFactory(factory: (name: any) => DexieConnectionConfig): this;
    addConfig(dbName: any, setting: DexieConnectionConfig): this;
    get(name: any): Promise<Dexie>;
    /**
     * 删除数据库
     * @param name
     */
    remove(name: any): Promise<void>;
}
export declare const DexieConnection: DexieConnectionImpl;
export {};
//# sourceMappingURL=connection.d.ts.map