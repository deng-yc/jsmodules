import './index.css';
import './di/';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import { Application } from '@jsmodules/core';
import { AccessProvider, AppProvider } from '@jsmodules/react';
import { kvManager } from '@jsmodules/storage';

import { accessFactory } from './access';
import * as serviceWorker from './serviceWorker';

const getInitialState = () => {
    return Application.use(async (state) => {
        try {
            const kvStore = kvManager.get("global", { encrypted: true });

            const keys = await kvStore.keys();
            console.log(keys);
            const a = await kvStore.getAsync("a");
            if (!a) {
                kvStore.setAsync("a", { a: 1, b: 2 });
            }
        } catch (ex) {
            console.warn(ex);
        }
        console.log("use user");
        return {
            user: 1,
            logined: true,
        };
    })
        .use((state: any) => {
            console.log("2");
            console.log(state.user);
            return { role: 1 };
        })
        .initAsync();
};

ReactDOM.render(
    <AppProvider getInitialState={getInitialState}>
        <AccessProvider accessFactory={accessFactory}>
            <App />
        </AccessProvider>
    </AppProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
