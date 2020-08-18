import './index.css';
import './di/';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import { Application, SessionService, TokenService } from '@jsmodules/core';
import di from '@jsmodules/di';
import { AccessProvider, AppProvider } from '@jsmodules/react';

import { accessFactory } from './access';
import * as serviceWorker from './serviceWorker';

//处理token
TokenService.Getter.use(async (token) => {
    return token;
});

SessionService.UserGetter.use(async () => {
    return { id: 1 };
})
    .use(async (user) => {
        //getMateByUserId( user.id)
        return { mate: 1 };
    })
    .use(async (user) => {
        // {id:1,mate:1}
        return { soul: 1 };
    });
//得到 {id:1,mate:1,soul:1}

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
