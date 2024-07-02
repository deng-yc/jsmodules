import React from 'react';
export const AppContext = React.createContext({
    loading: true,
    initialState: {},
    error: null,
    refreshInitialState() { },
    setInitialState(initialState) { },
});
//# sourceMappingURL=context.js.map