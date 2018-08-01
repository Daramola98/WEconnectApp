import React from 'react';
import { Link } from 'react-router-dom';
import HomeImageSlider from './HomeImageSlider.jsx';

const Home = () => (
    <main>
        <div className="banner center">
            <div className="banner-body">
                <h3 className="white-text">WELCOME TO WECONNECT</h3>
                <Link to="/businessListing"><a className="waves-effect waves-light btn grey"><h6 className="black-text">Click Here to View Businesses</h6></a></Link>
            </div>
        </div>
        <section className="row container section">
            <h3 align="center">EXPLORE WECONNECT</h3>
            <div className="col s12 m12 l4 hide-on-med-and-down">
                <div className="card hoverable">
                    <div className="card-image">
                        <img className="responsive" src="/images/gettingStarted2.jpg" alt="business" />
                    </div>
                    <div className="home-card card-content">
                    <span className="card-title">GETTING STARTED</span>
                      <p>
                        To get started sign up to start creating and
                        interacting with businesses or if you already have
                        an account login to create and find businesses
                      </p>
                    </div>
                    <div className="card-action">
                        <div>
                            <Link className="signuplink" to="/signUp">Sign Up</Link>
                            <Link className="loginlink" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col s12 m12 l4 hide-on-med-and-down">
                <div className="card hoverable">
                    <div className="card-image">
                        <img className="responsive about" src="/images/aboutus.jpg" alt="business" />
                        <span className="card-title"></span>
                    </div>
                    <div className="home-card card-content">
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
                      <Link to="#">About WEconnect</Link>
                    </div>
                </div>
            </div>
            <div className="col s12 m12 l4 hide-on-med-and-down">
                <div className="card hoverable">
                    <div className="card-image">
                        <img className="responsive" src="/images/contact-us.jpg" alt="business" />
                        <span className="card-title"></span>
                    </div>
                    <div className="home-card card-content">
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
            {/* Card for Small Devices */}
            <div className="col s12 m12 hide-on-large-only">
                <div className="card hoverable">
                    <div className="card-image">
                        <img className="responsive" src="/images/gettingStarted2.jpg" alt="business" />
                        <span className="card-title"></span>
                    </div>
                    <div className="card-content">
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
            <div className="col s12 m12 hide-on-large-only">
                <div className="card hoverable">
                    <div className="card-image">
                        <img className="responsive about" src="/images/aboutus.jpg" alt="business" />
                        <span className="card-title"></span>
                    </div>
                    <div className="card-content">
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
                      <Link to="#">About WEconnect</Link>
                    </div>
                </div>
            </div>
            <div className="col s12 m12 hide-on-large-only">
                <div className="card hoverable">
                    <div className="card-image">
                        <img className="responsive" src="/images/contact-us.jpg" alt="business" />
                        <span className="card-title"></span>
                    </div>
                    <div className="card-content">
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
        </section>
    </main>
);
export default Home;
