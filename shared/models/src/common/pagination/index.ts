import { flow, IAnyType, types } from 'mobx-state-tree';

import { Loadable } from '../loading';

export function createPaginationModel<T extends IAnyType>(ItemType: T, { getPageDataAsync, pageSize = 20 }) {
    return types
        .compose(
            Loadable,
            types.model({
                items: types.array(ItemType),
                total_count: types.number,
                page: types.number,
            })
        )
        .actions((self) => {
            return {
                fetchAsync: flow(function* (query) {
                    self.setLoading("loading");
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
                        self.items.replace(items);
                        self.page = page;
                        self.total_count = 1 * total_count;
                        self.setLoading("success");
                    } catch (ex) {
                        self.items.clear();
                        self.setLoading("failed");
                        return Promise.reject(ex);
                    }
                }),
            };
        });
}
