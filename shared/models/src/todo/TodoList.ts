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
    .actions((self) => {
        const api = di.getInstance(SoulsApi);
        return {
            getPageDataAsync(query) {
                return api.summary().get(query);
            },
            async deleteAsync(id) {
                return api.me().get();
            },
        };
    });

export const todoList = TodoList.create();
