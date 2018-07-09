import React from 'react';
import { Link } from 'react-router-dom';
import HomeImageSlider from './HomeImageSlider.jsx';
import Business from '../../Businesses/presentational/Business.jsx';


const Home = () => (
    <main>
        <div className="banner">
            <div className="banner-body">
                <h3 className="white-text">Search for Businesses</h3>
                <form id="searchform">
                  <input id="businessSearch"
                    className="white grey-text autocomplete"
                    type="text"
                    name="advancedSearch"
                    required/>
                    <button id="searchSubmitBtn" type="submit" className="waves-effect waves-light blue-grey darken-2"><i className="fa fa-search"></i></button>
              </form>
            </div>
        </div>
        <section className="row container section">
            <h3 align="center">Explore WEconnect</h3>
            <div className="col s12 m12 l4 hide-on-med-and-down">
                <div className="card hoverable">
                    <div className="card-image">
                        <img className="responsive" src="/images/gettingStarted2.jpg" alt="business" />
                        <span className="card-title"></span>
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
                            <Link to="/signUp">Sign Up</Link>
                            <Link to="/login">Login</Link>
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
