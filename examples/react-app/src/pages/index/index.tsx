import { Button } from 'antd';
import { Observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';

import logo from '@/logo.svg';
import { SessionService } from '@jsmodules/core';
import { useAuthenticated, useResolveClass } from '@jsmodules/react';
import { todoList } from '@shared/models/dist/todo/TodoList';

export default () => {
    const sessionService = useResolveClass(SessionService);

    const { setAuthenticated } = useAuthenticated();

    useEffect(() => {
        todoList.fetchAsync({ page: 1 });
    }, []);

    const handleLogout = useCallback(async () => {
        await sessionService.logout();
        setAuthenticated(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("renderPage");
    return (
        <div className="App">
            <header className="App-header">
                <Observer>
                    {() => {
                        const { loadingStatus, page, total_count } = todoList;
                        console.log("renderObserver", loadingStatus, page, total_count);
                        return (
                            <div>
                                {loadingStatus}-{page}-{total_count}
                            </div>
                        );
                    }}
                </Observer>
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
