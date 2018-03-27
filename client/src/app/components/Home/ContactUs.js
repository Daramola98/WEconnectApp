import React from 'react';

const ContactUs = props => (
      <div className="row">
                <div className="col s12 m8 offset-m2 l8 offset-l2">
                    <div className="card">
                        <div className="card-action blue lighten-1 white-text center">
                            <h3>Contact Us</h3>
                        </div>
                        <div className="card-content">
                            <form action="">
                                <div className="row">
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">account_circle</i>
                                        <label htmlFor="firstName">First Name</label>

                                        <input type="text" id="firstName" className="validate" required/>
                                    </div>
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">account_circle</i>
                                        <label htmlFor="lastName">Last Name</label>

                                        <input type="text" id="lastName" className="validate" required/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">email</i>
                                        <label htmlFor="user_mail">Email Address</label>
                                        <input type="email" placeholder="johndoe@gmail.com" id="user_mail" className="validate" required/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">mode_edit</i>
                                        <textarea className="materialize-textarea" id="contact-message" required>
                                        </textarea>
                                        <label htmlFor="contact-message">Send Us A Message</label>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>SEND MESSAGE</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
);

export default ContactUs;
