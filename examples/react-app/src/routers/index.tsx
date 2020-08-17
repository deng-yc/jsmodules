import React, { useCallback } from 'react';

import { AppAccessList } from '@/access';
import { useAccess, useInitialState } from '@jsmodules/react';

import logo from '../logo.svg';

export function AppRoutes() {
    const access = useAccess<AppAccessList>();

    const { setInitialState } = useInitialState();

    const handleLogin = useCallback(() => {
        setInitialState({
            logined: true,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!access.isAuthenticated) {
        return <a onClick={handleLogin}>登录</a>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>{process.env.REACT_APP_PAYPAL_CLIENT_ID}</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React - {process.env.API_ENV}
                </a>
            </header>
        </div>
    );
}
