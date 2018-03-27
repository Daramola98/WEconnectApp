import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './app/components/App';
import Header from './app/components/Container/Header';
import RegisterBusiness from './app/components/Business/RegisterBusiness';
import BusinessProfile from './app/components/Business/BusinessProfile';
import BusinessListing from './app/components/Business/BusinessListing';
import UpdateBusiness from './app/components/Business/UpdateBusiness';
import UserProfile from './app/components/User/UserProfile';
import SignUp from './app/components/Auth/SignUp';
import Login from './app/components/Auth/Login';
import AboutUs from './app/components/Home/AboutUs';
import HowItWorks from './app/components/Home/HowItWorks';
import style from './styles/index.css';
import ContactUs from './app/components/Home/ContactUs';


ReactDOM.render(
<Router>
    <div>
    <Route path='/' component={Header}/>
    <Route path='/home' component={App}/>
    <Route path='/aboutUs' component={AboutUs}/>
    <Route path='/contactUs' component={ContactUs}/>
    <Route path='/howitworks' component={HowItWorks}/>
    <Route path='/registerBusiness' component={RegisterBusiness}/>
    <Route path='/businessProfile' component={BusinessProfile}/>
    <Route path='/businessListing' component={BusinessListing}/>
    <Route path='/updateBusiness' component={UpdateBusiness}/>
    <Route path='/userProfile' component={UserProfile}/>
    <Route path='/signup' component={SignUp}/>
    <Route path='/login' component={Login}/>
    </div>
</Router>,
document.getElementById('root')
);
