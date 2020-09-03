import { applyPatch, flow, IAnyType, types } from 'mobx-state-tree';

import { Loadable } from '../loading';

const loadingKey = "paging";

interface IPaginationModelOptions {
    pageSize?: number;
    itemKey?: string;
}
interface IPageFetchOptions {
    clearLoadedItems?: boolean;
}
interface IPageQueryOptions {
    skip: number;
    limit?: number;
    [key: string]: any;
}

export function createPaginationModel<T extends IAnyType>(ItemType: T, options?: IPaginationModelOptions) {
    let opts: IPaginationModelOptions = { pageSize: 10, itemKey: "id", ...options };

    return types
        .compose(
            Loadable,
            types.model({
                $loadedItems: types.optional(types.map(ItemType), {}),
                $displayItems: types.optional(types.map(types.reference(ItemType)), {}),
                total_count: types.optional(types.number, 0),
            })
        )
        .actions((self) => {
            const fetchAsync = flow(function* pagingAsync(
                query: IPageQueryOptions,
                fetchOptions: IPageFetchOptions = {}
            ) {
                const getPageDataAsync = self["getPageDataAsync"];
                if (!getPageDataAsync) {
                    throw new Error("未实现 getPageDataAsync,分页加载必须实现这个 action");
                }
                self.setLoading(loadingKey, "pending");
                try {
                    const resp = yield getPageDataAsync(query);
                    let {
                        result: { items, total_count },
                    } = resp.data;
                    const identitys = {};
                    const tempItems = {};
                    for (const item of items) {
                        const identity = item[opts.itemKey];
                        if (!self.$loadedItems.has(identity)) {
                            tempItems[identity] = item;
                        } else {
                            const model: Object = (tempItems[identity] = self.$loadedItems.get(identity));
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
                        identitys[identity] = identity;
                    }
                    self.$loadedItems.merge(tempItems);
                    if (fetchOptions.clearLoadedItems) {
                        self.$displayItems.replace(identitys);
                    } else {
                        self.$displayItems.merge(identitys);
                    }
                    self.total_count = 1 * total_count;
                    self.setLoading(loadingKey, "done");
                } catch (ex) {
                    self.$displayItems.clear();
                    self.setLoading(loadingKey, "error");
                    return Promise.reject(ex);
                }
            });

            const refreshAsync = flow(function* refreshAsync(query: any) {
                const skip = 0;
                return fetchAsync(
                    {
                        skip,
                        ...query,
                    },
                    { clearLoadedItems: true }
                );
            });
            const moreAsync = function* moreAsync(...query) {
                const skip = self.$loadedItems.size;
                return fetchAsync({
                    skip,
                    ...query,
                });
            };
            return {
                fetchAsync,
                refreshAsync,
                moreAsync,
            };
        })
        .views((self) => {
            return {
                get displayItems() {
                    return [...self.$displayItems.values()];
                },
                get pageStatus() {
                    return self.$loadingStatus.get(loadingKey) || "pending";
                },
            };
        });
}
