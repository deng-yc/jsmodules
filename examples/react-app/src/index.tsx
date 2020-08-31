import './styles/index.less';
import './di';
import './runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';

import * as serviceWorker from './serviceWorker';

if (__DEV__) {
    require("mobx-react-lite/batchingForReactDom");
}

ReactDOM.hydrate(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
