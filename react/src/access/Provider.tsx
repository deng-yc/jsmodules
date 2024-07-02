import React, { useMemo } from 'react';

import { useInitialState } from '../app/useInitialState';
import { AccessContext } from './context';

interface IAccessProviderProps {
    accessFactory(initialState): any;
    children?: React.ReactNode;
}

export function AccessProvider(props: IAccessProviderProps) {
    const { children, accessFactory } = props;
    const { initialState } = useInitialState();
    const access = useMemo(() => {
        return accessFactory(initialState);
    }, [initialState]);
    return <AccessContext.Provider value={access}>{children}</AccessContext.Provider>;
}
