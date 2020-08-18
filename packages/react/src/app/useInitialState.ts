import { useContext } from 'react';

import { AppContext } from './context';

export function useApp() {
    return useContext(AppContext);
}

export function useInitialState() {
    const { initialState, setInitialState, refreshInitialState } = useApp();
    return { initialState, setInitialState, refreshInitialState };
}

export function useAuthenticated() {
    const { initialState, setInitialState } = useInitialState();
    return {
        isAuthenticated: initialState.isAuthenticated,
        setAuthenticated(isAuthenticated: boolean) {
            setInitialState({ isAuthenticated });
        },
    };
}

export function useLoginedUser<T>(): T {
    const { initialState } = useInitialState();
    return initialState.user;
}
