import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = props => (
        <div className="container">
            <div className="center-align">
                <h4>HOW WECONNECT WORKS</h4>
            </div>

            <div>
                WeConnect provides a platform that brings businesses and individuals together.
                 This platform creates awareness
                for businesses and gives the users the ability to write reviews about
                 the businesses they have interacted
                with.
                <br />
                <p>
                    To Get Started
                </p>
                <ol>
                  <li>Create an Account <Link to="/signUp">here</Link></li>
                  if you already have an account move to step 2
                  <li>Login to your account <Link to="/login">here</Link></li>
                  <li>Register a Business</li>
                  <li>Find Businesses</li>
                  <li>Review Businesses</li>
                </ol>
            </div>
        </div>
);

export default HowItWorks;

