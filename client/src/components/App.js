import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/navigation';
import SignUp from '../containers/userSignUp';
import BusinessProfile from '../containers/businessProfile';
import BusinessList from '../containers/businessList';
import UserProfile from '../containers/userProfile';
import Login from '../containers/login';
import RegisterBusiness from '../containers/registerBusiness';
import UpdateBusiness from '../containers/updateBusiness';
import UpdateUser from '../containers/updateUser';
import ContactUs from '../containers/contactUs';

import AboutUs from '../components/Home/presentational/AboutUs';
import HowItWorks from '../components/Home/presentational/HowItWorks';
import Home from '../components/Home/presentational/Home';
import Footer from '../components/General/Footer';
import NotFound from '../components/General/NotFound';

/**
 *
 *@class App
 *@classdesc creates a React component- App
 */
class App extends React.Component {
/**
   * Creates a React Component
   * @return {jsx} Success message with the business created or error message
   * @memberof React Component
   */
  render() {
    return (
    <div className="wrapper">
      <Header/>
      <div className="main">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path = '/aboutUs' component={AboutUs}/>
        <Route path = '/businessListing' component={BusinessList}/>
        <Route path = '/businessProfile/:id' component={BusinessProfile}/>
        <Route path = '/userProfile' component={UserProfile}/>
        <Route path = '/contactUs' component={ContactUs}/>
        <Route path = '/howItWorks' component={HowItWorks}/>
        <Route path = '/login' component={Login}/>
        <Route path = '/signUp' component={SignUp}/>
        <Route path = '/registerBusiness' component={RegisterBusiness}/>
        <Route path = '/updateBusiness/:id' component={UpdateBusiness}/>
        <Route path = '/updateUserProfile' component={UpdateUser}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
      <Footer />
    </div>
    );
  }
}

export default App;

