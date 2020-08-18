import React from 'react';

export const AppContext = React.createContext<{
    loading: boolean;
    initialState: any;
    error: any;
    refreshInitialState();
    setInitialState(initialState): void;
}>(null);
