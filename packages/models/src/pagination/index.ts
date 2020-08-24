import { flow, IAnyType, types } from 'mobx-state-tree';

import { Loadable } from '../loading';

const loadingKey = "paging";

export function createPaginationModel<T extends IAnyType>(ItemType: T, { pageSize = 20 }) {
    return types
        .compose(
            Loadable,
            types.model({
                items: types.optional(types.array(ItemType), []),
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
                        const skip = (page - 1) * pageSize;
                        const resp = yield getPageDataAsync({
                            skip,
                            ...filter,
                        });
                        let {
                            result: { items, total_count },
                        } = resp.data;
                        self.items.clear();
                        self.items.push(...items);
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
                    return self.loadingStatus.get(loadingKey) || "pending";
                },
            };
        });
}
