import { applySnapshot, flow, getParent, types } from 'mobx-state-tree';

import { di } from '@jsmodules/di';
import { createPaginationModel, Loadable, RunInAction } from '@jsmodules/models';
import { SoulsApi } from '@shared/api/dist/generated/content/common/souls';

const loadingKey = "detail";
export const Todo = types
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
            applySnapshot(data) {
                applySnapshot(self, data);
            },

            updateAsync() {
                self.nickname = self.nickname + "1";
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

export const TodoList = types
    .compose(RunInAction, createPaginationModel(types.reference(Todo), { pageSize: 10 }))
    .props({
        todos: types.optional(types.map(Todo), {}),
    })
    .named("todoList")
    .actions((self) => {
        const api = di.getInstance(SoulsApi);
        return {
            getPageDataAsync: flow(function* (query) {
                const resp = yield api.summary().get(query);
                const { items } = resp.data.result;
                for (const item of items) {
                    if (!self.todos.has(item.id)) {
                        self.todos.set(item.id, item);
                    } else {
                        const model = self.todos.get(item.id);
                        model?.applySnapshot(item);
                    }
                }
                return resp;
            }),

            getOrCreate(id) {
                if (!self.todos.has(id)) {
                    self.todos.set(id, { id });
                }
                return self.todos.get(id);
            },

            async deleteAsync(id) {
                return api.me().get();
            },
        };
    });
