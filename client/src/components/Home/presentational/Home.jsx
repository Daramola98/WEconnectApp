import React from 'react';
import { Link } from 'react-router-dom';
import HomeImageSlider from './HomeImageSlider.jsx';

const Home = props => (
    <main>
        <div id="welcome-message" className="container white-text center">
          <div className="inner-welcome">
          <h3>Welcome to WEconnect</h3>
          <p>
            <Link className="btn-large waves-effect waves-dark blue-grey signupbutton darken-2 white-text" to="/signUp">SIGN UP</Link>
            <Link className="btn-large waves-effect waves-dark blue-grey signinbutton darken-2 white-text" to="/login">SIGN IN</Link>
         </p>
         </div>
        </div>
    </main>
);
export default Home;
