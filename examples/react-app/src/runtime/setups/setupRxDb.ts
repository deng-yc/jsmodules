import { addRxPlugin } from 'rxdb';

import { EncryptedKeyValue, KeyValue, RxDbConnection } from '@jsmodules/storage';

const pwd = "1a6mdsrih2";

export function setupRxDb() {
    console.log("setup rxdb");

    addRxPlugin(require("pouchdb-adapter-indexeddb"));
    addRxPlugin(require("pouchdb-adapter-memory"));

    RxDbConnection.addConfig("app", {
        config: {
            name: "app",
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
                name: `user_${name}`,
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
