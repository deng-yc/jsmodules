export declare const KeyValue: {
    name: string;
    schema: {
        title: string;
        description: string;
        version: number;
        type: string;
        properties: {
            key: {
                type: string;
                primary: boolean;
            };
            value: {
                type: string;
            };
        };
    };
};
