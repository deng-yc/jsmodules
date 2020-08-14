import { useContext } from 'react';

import { AppContext } from './context';

export function useApp() {
    return useContext(AppContext);
}

export function useInitialState() {
    const app = useApp();
    return [app.initialState, app.setInitialState];
}
