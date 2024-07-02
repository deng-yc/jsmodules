"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCollections = exports.kv_data_encrypted = exports.kv_data = exports.EncryptedKeyValue = exports.KeyValue = void 0;
exports.KeyValue = {
    schema: {
        title: 'KeyValue Schema',
        description: 'KeyValuePair Storage',
        version: 0,
        type: 'object',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
            },
            key: {
                type: 'string',
            },
            group: {
                type: 'string',
            },
            value: {
                type: 'object',
            },
        },
    },
};
exports.EncryptedKeyValue = {
    schema: {
        title: 'Encrypted KeyValue Schema',
        description: 'Encrypted KeyValuePair Storage',
        version: 0,
        type: 'object',
        primaryKey: 'id',
        properties: {
            id: {
                type: 'string',
            },
            key: {
                type: 'string',
            },
            group: {
                type: 'string',
            },
            value: {
                type: 'object',
            },
        },
        encrypted: ['value'],
    },
};
exports.kv_data = 'kv_data';
exports.kv_data_encrypted = 'kv_data_encrypted';
exports.defaultCollections = {
    [exports.kv_data]: exports.KeyValue,
    [exports.kv_data_encrypted]: exports.EncryptedKeyValue,
};
//# sourceMappingURL=KeyValue.js.map