import { RxCollectionCreator } from 'rxdb';

export const KeyValue = {
    name: "kv_data",
    schema: {
        title: "KeyValue Schema",
        description: "KeyValuePair Storage",
        version: 0,
        type: "object",
        properties: {
            id: {
                type: "string",
                primary: true,
            },
            key: {
                type: "string",
            },
            group: {
                type: "string",
            },
            value: {
                type: "object",
            },
        },
    },
};

export const EncryptedKeyValue: RxCollectionCreator = {
    name: "encrypted_kv_data",
    schema: {
        title: "Encrypted KeyValue Schema",
        description: "Encrypted KeyValuePair Storage",
        version: 0,
        type: "object",
        properties: {
            id: {
                type: "string",
                primary: true,
            },
            key: {
                type: "string",
            },
            group: {
                type: "string",
            },
            value: {
                type: "object",
            },
        },
        encrypted: ["value"],
    },
};
