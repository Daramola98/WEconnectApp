import React from 'react';
import ReactDOM from 'react-dom';
import decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import WeConnectStore from './src/store/store';
import { userLoggedIn } from './src/store/actions/auth';
import setAuthorizationHeader from './src/utils/setAuthorizationHeader';

import NotFound from './src/components/General/NotFound';

import App from './src/components/App';

import style from './public/styles/index.scss';

if (localStorage.weConnectToken) {
  const user = decode(localStorage.weConnectToken);
  setAuthorizationHeader(localStorage.weConnectToken);
  WeConnectStore.dispatch(userLoggedIn(user));
}

ReactDOM.render(
<Provider store={WeConnectStore}>
  <Router history={BrowserHistory}>
    <App />
  </Router>
</Provider>,
document.getElementById('root')
);
