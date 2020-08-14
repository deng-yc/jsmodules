import './App.css';

import React, { useCallback } from 'react';

import { Application } from '@jsmodules/core';
import { AccessProvider, AppProvider } from '@jsmodules/react';

import { accessFactory } from './access';
import { AppRoutes } from './routers';

function App() {
    const getInitialState = useCallback(() => {
        return Application.use(async (state) => {
            console.log("use user");
            return {
                user: 1,
            };
        })
            .use((state: any) => {
                console.log("2");
                console.log(state.user);
                return { role: 1 };
            })
            .initAsync();
    }, []);

    const getAccess = useCallback((state) => {
        return accessFactory(state);
    }, []);
    return (
        <AppProvider getInitialState={getInitialState}>
            <AccessProvider accessFactory={getAccess}>
                <AppRoutes />
            </AccessProvider>
        </AppProvider>
    );
}

export default App;
