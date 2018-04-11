import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import WeConnectStore from './src/store/store';

import App from './src/components/App';
import Header from './src/components/NavBar/Header';
import RegisterBusiness from './src/components/Businesses/RegisterBusiness';
import BusinessProfile from './src/containers/businessProfile';
import BusinessList from './src/containers/businessList';
import UpdateBusiness from './src/components/Businesses/UpdateBusiness';
import UserProfile from './src/components/Users/UserProfile';
import SignUp from './src/containers/userSignUp';
import Login from './src/components/Auth/Login';
import AboutUs from './src/components/Home/AboutUs';
import HowItWorks from './src/components/Home/HowItWorks';
import style from './public/styles/index.css';
import ContactUs from './src/components/Home/ContactUs';
import Home from './src/components/Home/Home';


ReactDOM.render(
<Provider store={WeConnectStore}>
  <Router history={BrowserHistory}>
    <div>
      <Route path='/' component={App}></Route>
      <Route exact path='/' component={Home}/>
      <Route path = '/aboutUs' component={AboutUs}/>
      <Route path = '/businessListing' component={BusinessList}/>
      <Route path = '/businessProfile/:id' component={BusinessProfile}/>
      <Route path = '/contactUs' component={ContactUs}/>
      <Route path = '/howItWorks' component={HowItWorks}/>
      <Route path = '/login' component={Login}/>
      <Route path = '/signUp' component={SignUp}/>
    </div>
  </Router>
</Provider>,
document.getElementById('root')
);
