import React, { useCallback } from 'react';
import { useDidMount } from '../hooks/useDidMount';
import { AppContext } from './context';
const initState = {
    initialState: undefined,
    loading: true,
    error: undefined,
};
export function AppProvider(props) {
    const { children, getInitialState } = props;
    const [state, setState] = React.useState(initState);
    const refreshInitialState = useCallback(async () => {
        try {
            const asyncFunc = () => new Promise(res => res(getInitialState()));
            const ret = await asyncFunc();
            setState(prevState => ({ ...prevState, initialState: ret, loading: false }));
        }
        catch (e) {
            setState(prevState => ({ ...prevState, error: e, loading: false }));
        }
    }, []);
    useDidMount(async () => {
        refreshInitialState();
    });
    const setInitialState = useCallback(initialState => {
        setState(prevState => {
            const prevInitialState = prevState.initialState;
            return { ...prevState, initialState: { ...prevInitialState, ...initialState }, loading: false };
        });
    }, [state]);
    return (React.createElement(AppContext.Provider, { value: {
            ...state,
            refreshInitialState,
            setInitialState,
        } }, children));
}
//# sourceMappingURL=Provider.js.map