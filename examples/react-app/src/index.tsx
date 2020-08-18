import './index.css';
import './di/';
import './runtime';
import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import { Application, SessionService } from '@jsmodules/core';
import di from '@jsmodules/di';
import { AccessProvider, AppProvider } from '@jsmodules/react';
import { RxDbConnection } from '@jsmodules/storage';

import { accessFactory } from './access';
import * as serviceWorker from './serviceWorker';

const getInitialState = () => {
    return Application.use(async () => {
        const sessionService = di.getInstance(SessionService);
        await sessionService.initAsync();
        return {
            isAuthenticated: sessionService.isAuthenticated,
            user: sessionService.user,
        };
    }).initAsync();
};

const render = () => {
    ReactDOM.render(
        <AppProvider getInitialState={getInitialState}>
            <AccessProvider accessFactory={accessFactory}>
                <App />
            </AccessProvider>
        </AppProvider>,
        document.getElementById("root")
    );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
