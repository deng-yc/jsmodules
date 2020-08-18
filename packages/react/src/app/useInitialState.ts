import { useContext } from 'react';

import { AppContext } from './context';

export function useApp() {
    return useContext(AppContext);
}

export function useInitialState() {
    const { initialState, setInitialState, refreshInitialState } = useApp();
    return { initialState, setInitialState, refreshInitialState };
}
