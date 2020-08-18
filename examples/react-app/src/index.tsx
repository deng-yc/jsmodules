import './index.css';
import './di/';
import './runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import { Application, SessionService } from '@jsmodules/core';
import di from '@jsmodules/di';
import { AccessProvider, AppProvider } from '@jsmodules/react';
import { kvManager } from '@jsmodules/storage';

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
    })
        .use(async () => {
            const kv = kvManager.get("test", {
                dbName: "100",
            });
            var a = await kv.getAsync("testa");
            if (!a) {
                kv.setAsync("testa", { a: 1, b: 2 });
                console.log("seta");
            }
        })
        .use(async () => {
            const kv = kvManager.get("test", {
                dbName: "200",
            });
            var a = await kv.getAsync("testa");
            if (!a) {
                kv.setAsync("testa", { a: 1, b: 2 });
                console.log("setb");
            }
        })
        .initAsync();
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
