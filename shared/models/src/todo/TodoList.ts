import { flow, types } from 'mobx-state-tree';

import { di } from '@jsmodules/di';
import { createPaginationModel, Loadable, RunInAction } from '@jsmodules/models';
import { SoulsApi } from '@shared/api/dist/generated/content/common/souls';

const Todo = types
    .compose(RunInAction, Loadable)
    .props({
        id: types.identifier,
        name: types.maybeNull(types.string),
        nickname: types.optional(types.string, ""),
    })
    .named("TodoItem")
    .actions((self) => {
        const api = di.getInstance(SoulsApi);
        return {
            loadAsync: flow(function* loadAsync() {
                // const resp = yield api.me().get();
                self.nickname = "xx";
            }),
        };
    });

const TodoList = types
    .compose(RunInAction, createPaginationModel(Todo, {}))
    .props({
        selected: types.reference(Todo),
    })
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
