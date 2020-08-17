import { RxCollectionCreator } from 'rxdb';
export declare const KeyValue: {
    name: string;
    schema: {
        title: string;
        description: string;
        version: number;
        type: string;
        properties: {
            id: {
                type: string;
                primary: boolean;
            };
            key: {
                type: string;
            };
            group: {
                type: string;
            };
            value: {
                type: string;
            };
        };
    };
};
export declare const EncryptedKeyValue: RxCollectionCreator;
//# sourceMappingURL=KeyValue.d.ts.map