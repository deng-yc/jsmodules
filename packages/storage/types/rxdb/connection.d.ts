import { RxDatabase } from 'rxdb';
declare class RxConnectionImpl {
    private create_promises;
    private createDatabase;
    get(name: any): Promise<RxDatabase>;
}
export declare const RxConnection: RxConnectionImpl;
export {};
