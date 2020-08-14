import './App.css';

import React, { useCallback } from 'react';

import { Application, sleepAsync } from '@jsmodules/core';
import { AppProvider } from '@jsmodules/react';

import logo from './logo.svg';

function App() {
    const getInitialState = useCallback(() => {
        return Application.use(async (state) => {
            console.log("use user");
            await sleepAsync(5000);
            return {
                user: 1,
            };
        })
            .use((state) => {
                console.log("2");
                console.log(state.user);
                return { role: 1 };
            })
            .initAsync();
    }, []);

    return (
        <AppProvider getInitialState={getInitialState}>
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
        </AppProvider>
    );
}

export default App;
