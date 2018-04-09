import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import BusinessesStore from './store';

import App from './components/App';
import Header from './components/NavBar/Header';
import RegisterBusiness from './components/Businesses/RegisterBusiness';
import BusinessProfile from './containers/businessProfile';
import BusinessList from './containers/businessList';
import UpdateBusiness from './components/Businesses/UpdateBusiness';
import UserProfile from './components/Users/UserProfile';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import AboutUs from './components/Home/AboutUs';
import HowItWorks from './components/Home/HowItWorks';
import style from './public/styles/index.css';
import ContactUs from './components/Home/ContactUs';
import Home from './components/Home/Home';


ReactDOM.render(
<Provider store={BusinessesStore}>
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
