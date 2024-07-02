export const KeyValue = {
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
export const EncryptedKeyValue = {
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
export const kv_data = 'kv_data';
export const kv_data_encrypted = 'kv_data_encrypted';
export const defaultCollections = {
    [kv_data]: KeyValue,
    [kv_data_encrypted]: EncryptedKeyValue,
};
//# sourceMappingURL=KeyValue.js.map