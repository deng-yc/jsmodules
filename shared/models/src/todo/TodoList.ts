import { types } from 'mobx-state-tree';

import { di } from '@jsmodules/di';
import { SoulsApi } from '@shared/api/dist/generated/content/common/souls';

import { RunInAction } from '../common/base/RunInAction';
import { createPaginationModel } from '../common/pagination';

const Todo = types.model("TodoItem", {
    id: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    nickname: types.optional(types.string, ""),
});

const TodoList = types
    .compose(RunInAction, createPaginationModel(Todo, {}))
    .named("todoList")
    .props({})
    .actions((self) => {
        const api = di.getInstance(SoulsApi);
        return {
            async deleteAsync(id) {
                return api.me().get();
            },
            getPageDataAsync(query) {
                return api.summary().get(query);
            },
        };
    });

export const todoList = TodoList.create();
