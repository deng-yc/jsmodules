import { IKeyValueStorage } from './types';

export class BaseKeyValueStorage implements IKeyValueStorage {
  constructor(private __STORE_NAME__, private encrypted = false, private dbName = 'app') {}
  async getAllAsync(): Promise<any[]> {
    const keys = await this.keys();
    const tasks: any[] = [];
    for (const key of keys) {
      tasks.push(this.getAsync(key));
    }
    return Promise.all(tasks);
  }
  keys(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  getAsync(key: string, defaultValue?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  setAsync(key: string, value: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  batchSetObject(obj: any): Promise<any> {
    const tasks: any[] = [];
    for (const key in obj) {
      tasks.push(this.setAsync(key, obj[key]));
    }
    return Promise.all(tasks);
  }
  async setObjectPropertyAsync(key: string, propertyName: string, value: any): Promise<any> {
    let obj = await this.getAsync(key);
    if (!obj) {
      obj = {};
    }
    obj[propertyName] = value;
    return await this.setAsync(key, obj);
  }
  async getObjectPropertiesAsync(key: string, ...propertyNames: any[]): Promise<any> {
    let obj = await this.getAsync(key);
    if (!obj) {
      obj = {};
    }
    const result = {};
    for (const propertyName of propertyNames) {
      result[propertyName] = obj[propertyName];
    }
    return result;
  }
  async getObjectValueAsync(key: string, propertyName: string): Promise<any> {
    const obj = await this.getAsync(key);
    if (obj) {
      return obj[propertyName];
    }
    return null;
  }
  removeAsync(key: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  batchRemoveAsync(keys: string[]): Promise<any> {
    const tasks: any[] = [];
    for (const key of keys) {
      tasks.push(this.removeAsync(key));
    }
    return Promise.all(tasks);
  }
  async clearAsync(): Promise<any> {
    const keys = await this.keys();
    return this.batchRemoveAsync(keys);
  }
}
