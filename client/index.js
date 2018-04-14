import React from 'react';
import ReactDOM from 'react-dom';
import decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import WeConnectStore from './src/store/store';
import { userLoggedIn } from './src/store/actions/auth';
import setAuthorizationHeader from './src/utils/setAuthorizationHeader';

import SignUp from './src/containers/userSignUp';
import BusinessProfile from './src/containers/businessProfile';
import BusinessList from './src/containers/businessList';
import UserProfile from './src/containers/userProfile';
import Login from './src/containers/login';
import Header from './src/containers/navigation';

import App from './src/components/App';
import RegisterBusiness from './src/components/Businesses/RegisterBusiness';
import UpdateBusiness from './src/components/Businesses/UpdateBusiness';
import AboutUs from './src/components/Home/AboutUs';
import HowItWorks from './src/components/Home/HowItWorks';
import ContactUs from './src/components/Home/ContactUs';
import Home from './src/components/Home/Home';

import style from './public/styles/index.css';

if (localStorage.weConnectToken) {
  const user = decode(localStorage.weConnectToken);
  setAuthorizationHeader(localStorage.weConnectToken);
  WeConnectStore.dispatch(userLoggedIn(user));
}

ReactDOM.render(
<Provider store={WeConnectStore}>
  <Router history={BrowserHistory}>
    <div>
      <Route path='/' component={Header}></Route>
      <Route exact path='/' component={Home}/>
      <Route path = '/aboutUs' component={AboutUs}/>
      <Route path = '/businessListing' component={BusinessList}/>
      <Route path = '/businessProfile' component={BusinessProfile}/>
      <Route path = '/userProfile' component={UserProfile}/>
      <Route path = '/contactUs' component={ContactUs}/>
      <Route path = '/howItWorks' component={HowItWorks}/>
      <Route path = '/login' component={Login}/>
      <Route path = '/signUp' component={SignUp}/>
    </div>
  </Router>
</Provider>,
document.getElementById('root')
);
