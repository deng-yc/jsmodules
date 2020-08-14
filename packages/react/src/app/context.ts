import React from 'react';

export const AppContext = React.createContext<{
    loading: boolean;
    initialState: any;
    error: any;
    refresh();
    setInitialState(initialState): void;
}>(null);
