import { createRxDatabase, RxCollectionCreator, RxDatabase, RxDatabaseCreator } from 'rxdb';

import di from '@jsmodules/di';

type RxConnectionConfig = {
    config: RxDatabaseCreator;
    collections: RxCollectionCreator[];
};

class RxDbDbConnectionImpl {
    private create_promises = new Map();

    private async createDatabase(name) {
        let setting =
            di.tryResolve<RxConnectionConfig>(`rxdbconnection_${name}`) || di.tryResolve(`rxdb_factory`, name);
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
        di.Register(`rxdb_factory`, "Request").factory(factory);
        return this;
    }

    addConfig(dbName, setting: RxConnectionConfig) {
        di.Register(`rxdbconnection_${dbName}`).value(setting);
        return this;
    }

    get(name): Promise<RxDatabase> {
        const key = `rxdbconnection_${name}`;
        if (!this.create_promises.has(key)) {
            this.create_promises.set(key, this.createDatabase(name));
        }
        return this.create_promises.get(key);
    }
}

export const RxDbConnection = new RxDbDbConnectionImpl();
