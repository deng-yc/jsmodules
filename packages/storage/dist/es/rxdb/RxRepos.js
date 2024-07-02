import { RxDbConnection } from './connection';
export class RxRepos {
    configName;
    config;
    constructor(configName, config) {
        this.configName = configName;
        this.config = config;
    }
    async getDatabase() {
        return await RxDbConnection.get(this.configName);
    }
    collection_pormise;
    async _getCollection() {
        const db = await this.getDatabase();
        return db.addCollections(this.config);
    }
    async getCollection() {
        if (!this.collection_pormise) {
            this.collection_pormise = this._getCollection();
        }
        return this.collection_pormise;
    }
    async get(id) {
        const collection = await this.getCollection();
        const map = await collection.findByIds(id);
        return map.get(id);
    }
    async filter() {
        const collection = await this.getCollection();
        return collection.find();
    }
    async add(entity) {
        const collection = await this.getCollection();
        return collection.insert(entity);
    }
    async addOrUpdate(entity) {
        const collection = await this.getCollection();
        return collection.atomicUpsert(entity);
    }
    async bulkInsert(entitys) {
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
//# sourceMappingURL=RxRepos.js.map