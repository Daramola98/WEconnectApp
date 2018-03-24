import React from 'react';

/**
 *
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class Header extends React.Component {
/**
   * Creates a React Component
   * @return {jsx} Success message with the business created or error message
   * @memberof React Component
   */
  render() {
    return (
        <header>
        <div>
            <nav className="blue">
                <div className="nav-wrapper">
                    <div className="">
                        <a href="index.html" className="brand-logo">WEconnect</a>
                        <a href="#" data-activates="mobile-menu" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="about.html">About Us</a>
                            </li>
                            <li>
                                <a href="contact.html">Contact Us</a>
                            </li>
                            <li>
                                <a href="how-it-works.html">How it Works</a>
                            </li>
                            <li>
                                <a href="login.html">
                                    Sign In
                                </a>
                            </li>
                            <li>
                                <a href="signUp.html">
                                    Sign Up
                                </a>
                            </li>
                        </ul>

                        <ul className="side-nav" id="mobile-menu">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="about.html">About Us</a>
                            </li>
                            <li>
                                <a href="contact.html">Contact Us</a>
                            </li>
                            <li>
                                <a href="how-it-works.html">How it Works</a>
                            </li>
                            <li>
                                <a href="signUp.html">Sign Up</a>
                            </li>
                            <li>
                                <a href="login.html">Login</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    );
  }
}
