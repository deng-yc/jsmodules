import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import { Application } from '@jsmodules/core';
import { AccessProvider, AppProvider } from '@jsmodules/react';

import { accessFactory } from './access';
import * as serviceWorker from './serviceWorker';

const getInitialState = () => {
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
