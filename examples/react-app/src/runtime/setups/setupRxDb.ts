import { addRxPlugin } from 'rxdb';

import { EncryptedKeyValue, KeyValue, RxDbConnection } from '@jsmodules/storage';

export function setupRxDb() {
    console.log("setup rxdb");

    addRxPlugin(require("pouchdb-adapter-indexeddb"));
    addRxPlugin(require("pouchdb-adapter-memory"));

    RxDbConnection.addConfig("app", {
        config: {
            name: "app",
            password: "123qwe!@#",
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
                password: "123qwe!@#",
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
