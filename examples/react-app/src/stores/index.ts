import { Instance, onSnapshot, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { TodoList } from './todo/TodoList';

const RootStore = types.model({
    todosStore: types.optional(TodoList, {}),
});

export const rootStore = RootStore.create({});

onSnapshot(rootStore, (snapshot) => console.log("Snapshot: ", snapshot));

export type RootInstance = Instance<typeof RootStore>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const MstProvider = RootStoreContext.Provider;

export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}
