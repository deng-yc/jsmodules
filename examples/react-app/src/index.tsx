import './index.css';
import './di';
import './runtime';
import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import { AccessProvider, AppProvider } from '@jsmodules/react';

import { accessFactory } from './access';
import { getInitialState } from './initialState';
import * as serviceWorker from './serviceWorker';

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
