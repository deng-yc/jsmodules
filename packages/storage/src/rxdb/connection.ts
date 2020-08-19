import { createRxDatabase, RxCollectionCreator, RxDatabase, RxDatabaseCreator } from 'rxdb';

type RxConnectionConfig = {
    config: RxDatabaseCreator;
    collections: RxCollectionCreator[];
};

class RxDbDbConnectionImpl {
    private create_promises = new Map<string, Promise<RxDatabase>>();

    private manager = new Map<string, any>();

    private async createDatabase(name) {
        let setting;
        if (this.manager.has(`rxdbconnection_${name}`)) {
            setting = this.manager.get(`rxdbconnection_${name}`);
        } else if (this.manager.has(`rxdb_factory`)) {
            setting = this.manager.get("rxdb_factory")(name);
            if (setting) {
                this.manager.set(`rxdbconnection_${name}`, setting);
            }
        }
        if (!setting) {
            throw new Error(`RxDB: 未找到数据库连接配置,${name}`);
        }
        const { config, collections } = setting;
        const database = await createRxDatabase(config);
        console.log("DatabaseService: created database");
        // show leadership in title
        database.waitForLeadership().then(() => {
            console.log("isLeader now");
        });
        // create collections
        console.log("DatabaseService: create collections");
        await Promise.all(
            collections.map((colData) => {
                console.log("create collection", colData.name);
                return database.collection(colData);
            })
        );
        return database;
    }

    addFactory(factory: (name) => RxConnectionConfig) {
        this.manager.set("rxdb_factory", factory);
        return this;
    }

    addConfig(dbName, setting: RxConnectionConfig) {
        this.manager.set(`rxdbconnection_${dbName}`, setting);
        return this;
    }

    async get(name): Promise<RxDatabase> {
        const key = `rxdbconnection_${name}`;
        if (!this.create_promises.has(key)) {
            this.create_promises.set(key, this.createDatabase(name));
        } else {
            const db = await this.create_promises.get(key);
            if (db.destroyed) {
                this.create_promises.set(key, this.createDatabase(name));
            } else {
                return db;
            }
        }
        return this.create_promises.get(key);
    }

    /**
     * 销毁数据库实例
     * @param name
     */
    async destroy(name) {
        const key = `rxdbconnection_${name}`;
        if (this.create_promises.has(key)) {
            const db = await this.get(name);
            await db.destroy();
        }
    }

    /**
     * 删除数据库
     * @param name
     */
    async remove(name) {
        const db = await this.get(name);
        await db.remove();
        const key = `rxdbconnection_${name}`;
        if (this.create_promises.has(key)) {
            this.create_promises.delete(key);
        }
    }
}

export const RxDbConnection = new RxDbDbConnectionImpl();
