import { createRxDatabase, RxDatabase, RxDatabaseCreator } from 'rxdb';

import di from '@jsmodules/di';

class RxConnectionImpl {
    private create_promises = new Map();

    get(name): Promise<RxDatabase> {
        const key = `rxdb_${name}`;
        if (!this.create_promises.has(key)) {
            const config = di.tryResolve<RxDatabaseCreator>(key);
            if (!config) {
                throw new Error(`RxDB: 未找到数据库连接配置,${key}`);
            }
            this.create_promises.set(key, createRxDatabase(config));
        }
        return this.create_promises.get(key);
    }
}

export const RxConnection = new RxConnectionImpl();
