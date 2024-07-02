import React, { useMemo } from 'react';
import { useInitialState } from '../app/useInitialState';
import { AccessContext } from './context';
export function AccessProvider(props) {
    const { children, accessFactory } = props;
    const { initialState } = useInitialState();
    const access = useMemo(() => {
        return accessFactory(initialState);
    }, [initialState]);
    return React.createElement(AccessContext.Provider, { value: access }, children);
}
//# sourceMappingURL=Provider.js.map