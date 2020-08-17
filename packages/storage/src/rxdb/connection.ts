import { createRxDatabase, RxCollectionCreator, RxDatabase, RxDatabaseCreator } from 'rxdb';

import di from '@jsmodules/di';

type RxConnectionConfig = {
    config: RxDatabaseCreator;
    collections: RxCollectionCreator[];
};

class RxDbDbConnectionImpl {
    private create_promises = new Map();

    private async createDatabase(setting) {
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

    addConfig(dbName, setting: RxConnectionConfig) {
        di.Register(`rxdb_${dbName}`).value(setting);
    }

    get(name): Promise<RxDatabase> {
        const key = `rxdb_${name}`;
        if (!this.create_promises.has(key)) {
            const setting = di.tryResolve(key);
            if (!setting) {
                throw new Error(`RxDB: 未找到数据库连接配置,${key}`);
            }
            this.create_promises.set(key, this.createDatabase(setting));
        }
        return this.create_promises.get(key);
    }
}

export const RxDbConnection = new RxDbDbConnectionImpl();
