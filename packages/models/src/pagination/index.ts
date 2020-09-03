import { applyPatch, flow, IAnyType, types } from 'mobx-state-tree';

import { Loadable } from '../loading';

const loadingKey = "paging";

interface IPaginationModelOptions {
    pageSize?: number;
    itemKey?: string;
}

export function createPaginationModel<T extends IAnyType>(ItemType: T, options?: IPaginationModelOptions) {
    let opts: IPaginationModelOptions = { pageSize: 10, itemKey: "id", ...options };

    return types
        .compose(
            Loadable,
            types.model({
                loadedItems: types.optional(types.map(ItemType), {}),
                items: types.optional(types.array(types.reference(ItemType)), []),
                total_count: types.optional(types.number, 0),
                page: types.optional(types.number, 1),
            })
        )
        .actions((self) => {
            return {
                fetchAsync: flow(function* pagingAsync(query) {
                    const getPageDataAsync = self["getPageDataAsync"];
                    if (!getPageDataAsync) {
                        throw new Error("未实现 getPageDataAsync,分页加载必须实现这个 action");
                    }
                    self.setLoading(loadingKey, "pending");
                    try {
                        const { page = 1, ...filter } = query;
                        const skip = (page - 1) * opts.pageSize;
                        const resp = yield getPageDataAsync({
                            skip,
                            ...filter,
                        });
                        let {
                            result: { items, total_count },
                        } = resp.data;

                        const identitys = [];

                        for (const item of items) {
                            const identity = item[opts.itemKey];
                            if (!self.loadedItems.has(identity)) {
                                self.loadedItems.set(identity, item);
                            } else {
                                const model: Object = self.loadedItems.get(identity);
                                if (model) {
                                    const patchs = [];
                                    for (const field in item) {
                                        if (model.hasOwnProperty(field) && model[field] != item[field]) {
                                            patchs.push({
                                                op: "replace",
                                                path: `/${field}`,
                                                value: item[field],
                                            });
                                        }
                                    }
                                    if (patchs.length > 0) {
                                        applyPatch(model, patchs);
                                    }
                                }
                            }
                            identitys.push(identity);
                        }
                        self.items.replace(identitys);
                        self.page = page;
                        self.total_count = 1 * total_count;
                        self.setLoading(loadingKey, "done");
                    } catch (ex) {
                        self.items.clear();
                        self.setLoading(loadingKey, "error");
                        return Promise.reject(ex);
                    }
                }),
            };
        })
        .views((self) => {
            return {
                get pageStatus() {
                    return self.$loadingStatus.get(loadingKey) || "pending";
                },
            };
        });
}
