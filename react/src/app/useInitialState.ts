import { useContext } from 'react';

import { SessionService } from '@jsmodules/core';
import di from '@jsmodules/di';

import { AppContext } from './context';

export function useApp() {
    return useContext(AppContext);
}

export function useInitialState() {
    const { loading, error, initialState, setInitialState, refreshInitialState } = useApp();
    return { loading, error, initialState, setInitialState, refreshInitialState };
}

export function useAuthenticated() {
    const { loading, initialState, setInitialState } = useInitialState();
    return {
        loading,
        isAuthenticated: initialState?.isAuthenticated,
        setAuthenticated(isAuthenticated: boolean) {
            const state: any = { isAuthenticated };
            if (isAuthenticated) {
                const session = di.getInstance(SessionService);
                state.user = session.user;
            }
            setInitialState(state);
        },
    };
}

export function useLoginedUser<T>(): T {
    const { initialState } = useInitialState();
    return initialState?.user || null;
}
