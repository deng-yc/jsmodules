import { types } from 'mobx-state-tree';

import { di } from '@jsmodules/di';
import { SoulsApi } from '@shared/api/dist/generated/content/common/souls';

import { createPaginationModel } from '../common/pagination';

const Todo = types.model({
    name: types.maybeNull(types.string),
    nickname: types.optional(types.string, ""),
});

const TodoList = createPaginationModel(Todo, {
    getPageDataAsync(query) {
        const api = di.getInstance(SoulsApi);
        return api.summary().get(query);
    },
})
    .named("todoList")
    .props({})
    .actions((self) => {
        const api = di.getInstance(SoulsApi);
        return {
            async deleteAsync(id) {
                return api.me().get();
            },
        };
    });

export const todoList = TodoList.create({
    page: 1,
    items: [],
    loadingStatus: "none",
    total_count: 0,
});
