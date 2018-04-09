import React from 'react';
import HomeImageSlider from './HomeImageSlider';

const Home = props => (
        <main>
            <HomeImageSlider/>
        <div className="container">
            <div className="row hide-on-med-and-down">
                <div className="col s12 m4 l4">
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
                            <a href="signUp.html">Sign Up</a>
                            <a href="login.html">Login</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m4 l4">
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
                            <a href="about.html">About WEconnect</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m4 l4">
                    <div className="card home-card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">CONTACT US</span>
                            <p>
                                Enquires or Suggestions? Contact Us by filling
                                 the form in the contact us form in the link below
                            </p>
                        </div>
                        <div className="card-action">
                            <a href="contact.html">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row hide-on-large-only">
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
                            <a href="signUp.html">Sign Up</a>
                            <a href="login.html">Login</a>
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
                        <div className="card-action">
                            <a href="about.html">About WEconnect</a>
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
                        <div className="card-action">
                            <a href="contact.html">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
);
export default Home;
