import { RxCollection } from 'rxdb';

import { RxConnection } from './connection';

export class RxRepos<T> {
    constructor(private configName, private config) {}

    async getDatabase() {
        return await RxConnection.get(this.configName);
    }

    private collection_pormise;

    private async _getCollection() {
        const db = await this.getDatabase();
        return db.collection(this.config);
    }

    async getCollection(): Promise<RxCollection> {
        if (!this.collection_pormise) {
            this.collection_pormise = this._getCollection();
        }
        return this.collection_pormise;
    }

    async get(id): Promise<T | undefined> {
        const collection = await this.getCollection();
        const map = await collection.findByIds(id);
        return map.get(id);
    }

    async filter() {
        const collection = await this.getCollection();
        return collection.find();
    }

    async add(entity: T) {
        const collection = await this.getCollection();
        return collection.insert(entity);
    }

    async addOrUpdate(entity: T) {
        const collection = await this.getCollection();
        return collection.atomicUpsert(entity);
    }

    async bulkInsert(entitys: T[]) {
        const collection = await this.getCollection();
        return collection.bulkInsert(entitys);
    }

    async remove(id) {
        const collection = await this.getCollection();
        const map = await collection.findByIds(id);
        if (map[id]) {
            map[id].remove();
        }
    }
}
