import { applySnapshot, flow, getParent, types } from 'mobx-state-tree';

import { di } from '@jsmodules/di';
import { createPaginationModel, Loadable, RunInAction } from '@jsmodules/models';
import { SoulsApi } from '@shared/api/dist/generated/content/common/souls';

const loadingKey = "detail";
const Todo = types
    .compose(RunInAction, Loadable)
    .props({
        id: types.identifier,
        name: types.maybeNull(types.string),
        nickname: types.maybeNull(types.string),
    })
    .named("TodoItem")
    .actions((self) => {
        const api = di.getInstance(SoulsApi);
        return {
            getParent() {
                const parent = getParent(self);
                return parent;
            },
            loadAsync: flow(function* loadAsync() {
                try {
                    self.setLoading(loadingKey, "pending");
                    const resp = yield api.summary().get({
                        ids: self.id,
                    });
                    const { items } = resp.data.result;
                    const [item] = items;
                    if (item) {
                        applySnapshot(self, item);
                    }
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
            get fetchStatus() {
                return self.$loadingStatus.get(loadingKey);
            },
        };
    });

export const TodoDetail = types
    .model({
        todo: types.maybeNull(Todo),
    })
    .actions((self) => {
        return {
            get(id: any) {
                self.todo = Todo.create({ id });
                return self.todo;
            },
        };
    });

export const TodoList = types
    .compose(RunInAction, createPaginationModel(Todo, { pageSize: 10 }))
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
