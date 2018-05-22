import React from 'react';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';


/**
 * Class Representing React Component ContactUs
 *@class ContactUs
 *@classdesc creates a React component- ContactUs
 */
export default class ContactUs extends React.Component {
    state = {
      contactInfo: {
        firstname: '',
        lastname: '',
        email: '',
        message: '',
      },
      submitClicked: false
    }

  /**
    * onChange Event handler callback for ContactUs form fields
    * @param {object} event the event object
    *
    * @return {null} updates the state of the ContactUs component
    * @memberof ContactUs Component
    */
    onChange = event =>
      this.setState({
        ...this.state,
        contactInfo: { ...this.state.contactInfo, [event.target.name]: event.target.value }
      });

    /**
      * onSubmit Event handler callback for ContactUs form
      * @param {object} event The event object
      *
      * @return {null}  Message Submitted message or returns error message
      * @memberof ContactUs Component
      */
    handleContactUsSubmit = (event) => {
      event.preventDefault();
      this.props.submit(this.state.contactInfo);
    }

  /**
    * Renders the ContactUs Component
    * @return {jsx} jsx element to render
    * @memberof ContactUs Component
    */
    render() {
      const {
        firstname, lastname, email, message
      } = this.state.contactInfo;
      return <div className="row">
          <form onSubmit={this.handleContactUsSubmit}>
            <div className="row">
              <div className="input-field col s12 m12 l6">
                <i className="material-icons prefix">account_circle</i>
                <label htmlFor="firstName">First Name</label>

                <input type="text" id="firstName" name="firstname" value={firstname} onChange={this.onChange} minLength="3" maxLength="50" pattern="[A-Za-z]+$" title="should contain only alphabets" id="firstName" className="validate" required />
              </div>
              <div className="input-field col s12 m12 l6">
                <i className="material-icons prefix">account_circle</i>
                <label htmlFor="lastName">Last Name</label>

                <input type="text" id="lastName" name="lastname" value={lastname} minLength="3" maxLength="50" pattern="[A-Za-z]+$" title="should contain only alphabets" onChange={this.onChange} id="lastName" className="validate" required />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">email</i>
                <label htmlFor="user_mail">Email Address</label>
                <input type="email" id="user_mail" name="email" value={email} onChange={this.onChange} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" id="user_mail" className="validate" required />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea name="message" id="contact-message" value={message} onChange={this.onChange} className="materialize-textarea" id="contact-message" required />
                <label htmlFor="contact-message">Send Us A Message</label>
              </div>
            </div>
            <div className="input-field">
              <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>;
    }
}

ContactUs.propTypes = {
  submit: PropTypes.func.isRequired,
};
