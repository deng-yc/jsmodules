import React from 'react';

import { AccessProvider, AppProvider } from '@jsmodules/react';

import { accessFactory } from './access';
import { getInitialState } from './initialState';
import { AppRoutes } from './routers';
import { MstProvider, rootStore } from './stores';

function App() {
    return (
        <MstProvider value={rootStore}>
            <AppProvider getInitialState={getInitialState}>
                <AccessProvider accessFactory={accessFactory}>
                    <AppRoutes />
                </AccessProvider>
            </AppProvider>
        </MstProvider>
    );
}

export default App;
