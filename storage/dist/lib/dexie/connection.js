"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexieConnection = void 0;
const tslib_1 = require("tslib");
const dexie_1 = tslib_1.__importDefault(require("dexie"));
class DexieConnectionImpl {
    create_promises = new Map();
    manager = new Map();
    async createDatabase(name) {
        let setting;
        if (this.manager.has(`dbconnection_${name}`)) {
            setting = this.manager.get(`dbconnection_${name}`);
        }
        else if (this.manager.has(`db_factory`)) {
            setting = this.manager.get('db_factory')(name);
            if (setting) {
                this.manager.set(`dbconnection_${name}`, setting);
            }
        }
        if (!setting) {
            throw new Error(`RxDB: 未找到数据库连接配置,${name}`);
        }
        const { version, options, collections } = setting;
        const database = new dexie_1.default(name, options);
        database.version(version).stores(collections);
        return database;
    }
    addFactory(factory) {
        this.manager.set('db_factory', factory);
        return this;
    }
    addConfig(dbName, setting) {
        this.manager.set(`dbconnection_${dbName}`, setting);
        return this;
    }
    async get(name) {
        const key = `dbconnection_${name}`;
        if (!this.create_promises.has(key)) {
            this.create_promises.set(key, this.createDatabase(name));
        }
        // else {
        //   const db = await this.create_promises.get(key);
        //   db.isOpen;
        //   if (!db.isOpen()) {
        //     this.create_promises.set(key, this.createDatabase(name));
        //   } else {
        //     return db;
        //   }
        // }
        return this.create_promises.get(key);
    }
    /**
     * 删除数据库
     * @param name
     */
    async remove(name) {
        const db = await this.get(name);
        await db.delete();
        const key = `dbconnection_${name}`;
        if (this.create_promises.has(key)) {
            this.create_promises.delete(key);
        }
    }
}
exports.DexieConnection = new DexieConnectionImpl();
//# sourceMappingURL=connection.js.map