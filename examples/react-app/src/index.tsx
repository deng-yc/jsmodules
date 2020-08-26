import './styles/index.less';
import './di';
import './runtime';
import 'mobx-react-lite/batchingForReactDom';

// import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';

// Generate required css
import App from '@/App';

import * as serviceWorker from './serviceWorker';

enableScreens();
// register the app
AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
    initialProps: {},
    rootTag: document.getElementById("root"),
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
