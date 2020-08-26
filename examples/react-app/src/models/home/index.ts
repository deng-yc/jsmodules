import { types } from 'mobx-state-tree';

import { createPaginationModel } from '@jsmodules/models';

const HomeItem = types.model("home-item", {
    name: types.string,
});

const TodoList = createPaginationModel(HomeItem)
    .named("todoList")
    .extend((self) => {
        return {
            actions: {
                haha() {
                    self.fetchAsync({ page: 1 });
                },
            },
        };
    });

// const model = useMstModel(TodoList);
