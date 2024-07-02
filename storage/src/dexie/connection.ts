import Dexie, { DexieOptions } from 'dexie';

type DexieConnectionConfig = {
  version: number;
  options: DexieOptions;
  collections: { [tableName: string]: string };
};

class DexieConnectionImpl {
  private create_promises = new Map<string, Promise<Dexie>>();

  private manager = new Map<string, any>();

  private async createDatabase(name) {
    let setting;
    if (this.manager.has(`dbconnection_${name}`)) {
      setting = this.manager.get(`dbconnection_${name}`);
    } else if (this.manager.has(`db_factory`)) {
      setting = this.manager.get('db_factory')(name);
      if (setting) {
        this.manager.set(`dbconnection_${name}`, setting);
      }
    }
    if (!setting) {
      throw new Error(`RxDB: 未找到数据库连接配置,${name}`);
    }
    const { version, options, collections } = setting;
    const database = new Dexie(name, options);
    database.version(version).stores(collections);
    return database;
  }

  addFactory(factory: (name) => DexieConnectionConfig) {
    this.manager.set('db_factory', factory);
    return this;
  }

  addConfig(dbName, setting: DexieConnectionConfig) {
    this.manager.set(`dbconnection_${dbName}`, setting);
    return this;
  }

  async get(name): Promise<Dexie> {
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

export const DexieConnection = new DexieConnectionImpl();
