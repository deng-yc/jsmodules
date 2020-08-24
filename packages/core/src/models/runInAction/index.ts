import { types } from 'mobx-state-tree';

export const RunInAction = types.model().actions((self) => {
    return {
        runInAction(fn: () => void) {
            fn();
        },
    };
});
