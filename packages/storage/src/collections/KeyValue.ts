export const KeyValue = {
    name: "kv_data",
    schema: {
        title: "KeyValue Schema",
        description: "KeyValuePair Storage",
        version: 0,
        type: "object",
        properties: {
            key: {
                type: "string",
                primary: true,
            },
            value: {
                type: "object",
            },
        },
    },
};
