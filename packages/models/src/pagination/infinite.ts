import { applySnapshot, flow, IAnyType, types } from 'mobx-state-tree';

import { Loadable } from '../loading';

const loadingKey = "paging";

interface IPaginationModelOptions {
    pageSize?: number;
    itemKey?: string;
}

export function createInfinitePageModel<T extends IAnyType>(ItemType: T, options?: IPaginationModelOptions) {
    let opts: IPaginationModelOptions = { pageSize: 10, itemKey: "id", ...options };

    return types
        .compose(
            Loadable,
            types.model({
                loadedItems: types.optional(types.map(ItemType), {}),
                total_count: types.optional(types.number, 0),
                page: types.optional(types.number, 1),
            })
        )
        .actions((self) => {
            return {
                refreshAsync: flow(function* (query) {
                    const getPageDataAsync = self["getPageDataAsync"];
                    if (!getPageDataAsync) {
                        throw new Error("未实现 getPageDataAsync,分页加载必须实现这个 action");
                    }
                    self.page = 1;
                    self.setLoading(loadingKey, "pending");
                    try {
                        const resp = yield getPageDataAsync({
                            skip: 0,
                            ...query,
                        });
                        let {
                            result: { items, total_count },
                        } = resp.data;
                        self.total_count = 1 * total_count;
                        self.loadedItems.clear();
                        let data = {};
                        for (const item of items) {
                            data[item[opts.itemKey]] = item;
                        }
                        self.loadedItems.merge(data);
                        self.setLoading(loadingKey, "done");
                    } catch (ex) {
                        self.setLoading(loadingKey, "error");
                        return Promise.reject(ex);
                    }
                }),
                moreAsync: flow(function* (query) {
                    const getPageDataAsync = self["getPageDataAsync"];
                    if (!getPageDataAsync) {
                        throw new Error("未实现 getPageDataAsync,分页加载必须实现这个 action");
                    }
                    self.page = 1;
                    self.setLoading(loadingKey, "pending");
                    try {
                        const resp = yield getPageDataAsync({
                            skip: 0,
                            ...query,
                        });
                        let {
                            result: { items, total_count },
                        } = resp.data;
                        self.total_count = 1 * total_count;
                        let data = {};
                        for (const item of items) {
                            let key = item[opts.itemKey];
                            let itemData;
                            if (self.loadedItems.has(key)) {
                                itemData = self.loadedItems.get(key);
                                //尝试更新旧的数据
                                applySnapshot(data[key], item);
                            } else {
                                itemData = item;
                            }
                            data[key] = itemData;
                        }
                        self.loadedItems.merge(data);
                        self.setLoading(loadingKey, "done");
                    } catch (ex) {
                        self.setLoading(loadingKey, "error");
                        return Promise.reject(ex);
                    }
                }),
            };
        })
        .views((self) => {
            return {
                get items() {
                    return [...self.loadedItems.values()];
                },
            };
        });
}
