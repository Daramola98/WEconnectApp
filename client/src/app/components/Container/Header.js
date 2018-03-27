import React from 'react';
import { Link } from 'react-router-dom';
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
        <div>
        <header>
        <div>
            <nav className="blue">
                <div className="nav-wrapper">
                    <div className="">
                        <Link to="/home" className="brand-logo">WEconnect</Link>
                        <Link to="#" data-activates="mobile-menu" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </Link>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/aboutUs">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contactUs">Contact Us</Link>
                            </li>
                            <li>
                                <Link to="/howitworks">How it Works</Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>

                        <ul className="side-nav" id="mobile-menu">
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/aboutUs">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contactUs">Contact Us</Link>
                            </li>
                            <li>
                                <Link to="/howitworks">How it Works</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
        {this.props.children}
    </div>
    );
  }
}
