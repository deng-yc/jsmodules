import { addRxPlugin } from 'rxdb';

import di from '@jsmodules/di';
import { KeyValue, RxDbKeyValueStorage } from '@jsmodules/storage';

addRxPlugin(require("pouchdb-adapter-idb"));

di.Register("rxdb_app").value({
    config: {
        name: "app",
        password: "123qwe!@#",
        ignoreDuplicate: true,
        adapter: "idb",
    },
    collections: [KeyValue],
});

di.Register("kvStorage", "Request").class(RxDbKeyValueStorage);
