/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IKeyValueStorage {
    /**
     * 获取所有key
     */
    keys(): Promise<string[]>;
    /**
     * 获取一个值
     * @param key
     * @param defaultValue 默认值
     */
    getAsync(key: string, defaultValue?): Promise<any>;

    /**
     * 保存一个值
     * @param key
     * @param value
     */
    setAsync(key: string, value: string): Promise<any>;

    /**
     * 保存一个对象到数据库
     * @param key
     * @param value
     */
    setObjectAsync(key: string, value: any): Promise<any>;

    batchSetObject(obj: any | any[]): Promise<any>;
    /**
     * 获取一个对象
     * @param key
     */
    getObjectAsync(key: string): Promise<any>;

    /**
     * 设置一个对象的属性
     * @param key
     * @param value
     */
    setObjectPropertyAsync(key: string, propertyName: string, value: any): Promise<any>;

    /**
     * 获取一个对象的指定属性
     * @param key
     * @param propertyNames
     */
    getObjectPropertiesAsync(key: string, ...propertyNames): Promise<any>;

    /**
     *
     * @param key 获取一个对象的属性值
     * @param propertyName
     */
    getObjectValueAsync(key: string, propertyName: string): Promise<any>;

    /**
     * 删除一个值
     * @param key
     */
    removeAsync(key: string): Promise<any>;

    batchRemoveAsync(keys: string[]): Promise<any>;
    /**
     * 删除所有对象
     */
    clearAsync(): Promise<any>;
}

export interface IKeyValueStorageManager {
    get(STORE_NAME, dbName): IKeyValueStorage;
}
