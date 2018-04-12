import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import WeConnectStore from './src/store/store';

import SignUp from './src/containers/userSignUp';
import BusinessProfile from './src/containers/businessProfile';
import BusinessList from './src/containers/businessList';
import UserProfile from './src/containers/userProfile';

import App from './src/components/App';
import Header from './src/components/NavBar/Header';
import RegisterBusiness from './src/components/Businesses/RegisterBusiness';
import UpdateBusiness from './src/components/Businesses/UpdateBusiness';
import Login from './src/components/Auth/Login';
import AboutUs from './src/components/Home/AboutUs';
import HowItWorks from './src/components/Home/HowItWorks';
import ContactUs from './src/components/Home/ContactUs';
import Home from './src/components/Home/Home';

import style from './public/styles/index.css';


ReactDOM.render(
<Provider store={WeConnectStore}>
  <Router history={BrowserHistory}>
    <div>
      <Route path='/' component={App}></Route>
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
