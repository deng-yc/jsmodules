import { addRxPlugin } from 'rxdb';

import { EncryptedKeyValue, KeyValue, RxDbConnection } from '@jsmodules/storage';

const pwd = "1a6mdsrih2";
const dbVersion = "v1";

export function setupRxDb() {
    console.log("setup rxdb");

    addRxPlugin(require("pouchdb-adapter-indexeddb"));
    addRxPlugin(require("pouchdb-adapter-memory"));

    RxDbConnection.addConfig("app", {
        config: {
            name: `app_${dbVersion}`,
            password: pwd,
            ignoreDuplicate: true,
            adapter: "indexeddb",
            pouchSettings: {
                revs_limit: 10,
            },
        },
        collections: [KeyValue, EncryptedKeyValue],
    }).addFactory((name) => {
        return {
            config: {
                name: `user_${name}_${dbVersion}`,
                password: pwd,
                ignoreDuplicate: true,
                adapter: "indexeddb",
                pouchSettings: {
                    revs_limit: 10,
                },
            },
            collections: [KeyValue, EncryptedKeyValue],
        };
    });
}
