import React from 'react';

/**
 *
 *@class BusinessListing
 *@classdesc creates a React component- BusinessListing
 */
export default class ContactUs extends React.Component {
    state = {
      contactInfo: {
        firstname: '',
        lastname: '',
        email: '',
        message: '',
      },
    }

  /**
    * Creates a React Component
    * @param {object} e the register business page
    * @return {jsx} renders the register business page
    * @memberof React Component
    */
    onChange = e =>
      this.setState({
        ...this.state,
        contactInfo: { ...this.state.contactInfo, [e.target.name]: e.target.value }
      });
  /**
    * Creates a React Component
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
    */
    render() {
      const {
        firstname, lastname, email, message
      } = this.state.contactInfo;
      return (
      <div className="row container">
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

                                        <input type="text" name="firstname" value={firstname} onChange={this.onChange} minLength="3" maxLength="50" pattern="[A-Za-z]+$" title="should contain only alphabets" id="firstName" className="validate" required/>
                                    </div>
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">account_circle</i>
                                        <label htmlFor="lastName">Last Name</label>

                                        <input type="text" name="lastname" value={lastname} minLength="3" maxLength="50" pattern="[A-Za-z]+$" title="should contain only alphabets" onChange={this.onChange} id="lastName" className="validate" required/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">email</i>
                                        <label htmlFor="user_mail">Email Address</label>
                                        <input type="email" name="email" value={email} onChange={this.onChange} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="johndoe@gmail.com" id="user_mail" className="validate" required/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">mode_edit</i>
                                        <textarea name="message" value={message} onChange={this.onChange} className="materialize-textarea" id="contact-message" required>
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
    }
}

