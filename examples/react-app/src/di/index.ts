import { addRxPlugin } from 'rxdb';

import di from '@jsmodules/di';
import { EncryptedKeyValue, KeyValue, RxDbConnection, RxDbKeyValueStorage } from '@jsmodules/storage';

addRxPlugin(require("pouchdb-adapter-indexeddb"));
// addRxPlugin(require("pouchdb-adapter-websql"));

RxDbConnection.addConfig("app", {
    config: {
        name: "app",
        password: "123qwe!@#",
        ignoreDuplicate: true,
        adapter: "indexeddb",
    },
    collections: [KeyValue, EncryptedKeyValue],
});

di.Register("kvStorage", "Request").class(RxDbKeyValueStorage);
