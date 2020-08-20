import { IAnyType, types } from 'mobx-state-tree';
import { useMemo } from 'react';

import { createPaginationModel } from '@shared/models';

const HomeItem = types.model("home-item", {
    name: types.string,
});

const TodoList = createPaginationModel(HomeItem)
    .named("todoList")
    .extend((self) => {
        return {
            actions: {
                haha() {
                    self.refresh();
                },
            },
        };
    });

export function useMstModel<T extends IAnyType>(type: T, snapshot?: any) {
    return useMemo(() => {
        return type.create(snapshot);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

// const model = useMstModel(TodoList);
