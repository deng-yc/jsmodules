import { Button } from 'antd';
import React, { useCallback } from 'react';

import logo from '@/logo.svg';
import { SessionService } from '@jsmodules/core';
import { useAuthenticated, useResolveClass } from '@jsmodules/react';

export default () => {
    const sessionService = useResolveClass(SessionService);

    const { setAuthenticated } = useAuthenticated();

    const handleLogout = useCallback(async () => {
        await sessionService.logout();
        setAuthenticated(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Button onClick={handleLogout}>退出登录</Button>
                <p>{process.env.REACT_APP_PAYPAL_CLIENT_ID}</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React - {process.env.API_ENV}
                </a>
            </header>
        </div>
    );
};
