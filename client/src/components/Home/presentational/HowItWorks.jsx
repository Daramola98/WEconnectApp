import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = props => (
        <div className="container white-text">
            <div className="center-align">
                <h4>HOW WECONNECT WORKS</h4>
            </div>

            <div>
                <h5>WeConnect provides a platform that brings businesses and individuals together.
                 This platform creates awareness
                for businesses and gives the users the ability to write reviews about
                 the businesses they have interacted
                with.</h5>
                <br />
                {/* <div className="how-it-works row hide-on-med-and-down">
                <div className="col s12 m12 l12">
                <div className="card home-card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">GETTING STARTED</span>
                            <p>
                                To get started sign up to start creating and
                                interacting with businesses or if you already have
                                an account login to create and find businesses
                            </p>
                        </div>
                        <div className="card-action">
                            <Link to="/signUp">Sign Up</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
                <div className="col s12 m12 l12">
                    <div className="card home-card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">ABOUT WECONNECT</span>
                            <p>
                                WeConnect provides a platform that brings businesses and individuals
                                 together. This platform
                                creates awareness for businesses and gives the users the ability to
                                 write reviews about the
                                businesses they have interacted with.
                            </p>
                        </div>
                        <div className="card-action">
                            <Link to="/aboutUs">About WEconnect</Link>
                        </div>
                    </div>
                </div>
                <div className="col s12 m12 l12">
                    <div className="card home-card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">CONTACT US</span>
                            <p>
                                Enquires or Suggestions? Contact Us by filling
                                 the form in the contact us form in the link below
                            </p>
                        </div>
                        <div className="card-action">
                            <Link to="/contactUs">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="how-it-works row ">
                <div className="col s12 m12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">GETTING STARTED</span>
                            <p>
                                To get started sign up to start creating and
                                interacting with businesses or if you already have
                                an account login to create and find businesses
                            </p>
                        </div>
                        <div className="card-action">
                            <div>
                            <Link to="/signUp">Sign Up</Link>
                            <Link to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12 m12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">ABOUT WECONNECT</span>
                            <p>
                                WeConnect provides a platform that brings businesses and individuals
                                 together. This platform
                                creates awareness for businesses and gives the users the ability to
                                 write reviews about the
                                businesses they have interacted with.
                            </p>
                        </div>
                        <div className="card-action action-aboutlink">
                            <Link to="/aboutUs">About WEconnect</Link>
                        </div>
                    </div>
                </div>
                <div className="col s12 m12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">CONTACT US</span>
                            <p>
                                Enquires or Suggestions? Contact Us by filling
                                 the form in the contact us form in the link below
                            </p>
                        </div>
                        <div className="card-action action-contactlink">
                            <Link to="/contactUs">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
);

export default HowItWorks;

