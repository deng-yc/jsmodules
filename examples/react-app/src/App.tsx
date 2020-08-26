import React from 'react';

import { AccessProvider, AppProvider } from '@jsmodules/react';

import { accessFactory } from './access';
import { getInitialState } from './initialState';
import { AppRoutes } from './routers';

function App() {
    return (
        <AppProvider getInitialState={getInitialState}>
            <AccessProvider accessFactory={accessFactory}>
                <AppRoutes />
            </AccessProvider>
        </AppProvider>
    );
}

export default App;
