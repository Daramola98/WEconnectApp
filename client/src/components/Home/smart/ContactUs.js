import React from 'react';
import alertify from 'alertifyjs';
import Errors from '../../Messages/presentational/Errors';

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
      errors: {
        message: null
      }
    }

  /**
    * onChange Event handler callback for ContactUs form fields
    * @param {object} e the event object
    *
    * @return {null} updates the state of the ContactUs component
    * @memberof ContactUs Component
    */
    onChange = e =>
      this.setState({
        ...this.state,
        contactInfo: { ...this.state.contactInfo, [e.target.name]: e.target.value }
      });

    /**
      * onSubmit Event handler callback for ContactUs form
      * @param {object} e The event object
      *
      * @return {null}  Message Submitted message or returns error message
      * @memberof ContactUs Component
      */
    handleContactUsSubmit(e) {
      e.preventDefault();
      this.props.postContactUs(this.state.contactInfo)
        .then(() => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Message Submitted');
          setTimeout(() => this.props.history.push('/'), 1000);
        })
        .catch((error) => {
          window.scroll(0, 0);
          if (error && error.response.data.validationErrors) {
            return this.setState({
              errors:
                { ...this.state.errors, message: error.response.data.validationErrors }
            });
          }
        });
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
      const { errors } = this.state;
      return <div className="row container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Contact Us</h3>
              </div>
              <div className="card-content">
                {errors.message ? <ul className="collection with-header">
                    <li key="header" className="collection-header">
                      <h4 className="red-text">Something Went Wrong</h4>
                    </li>
                    {errors.message.map((error, i) => (
                      <Errors
                        key={`error${i}`}
                        message={error}
                        index={i}
                      />
                    ))}
                  </ul> : null}
                <form onSubmit={this.handleContactUsSubmit.bind(this)}>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="firstName">First Name</label>

                      <input type="text" id="firstName" name="firstname" value={firstname} onChange={this.onChange} minLength="3" maxLength="50" pattern="[A-Za-z]+$" title="should contain only alphabets" id="firstName" className="validate" required />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="lastName">Last Name</label>

                      <input type="text" id="lastName" name="lastname" value={lastname} minLength="3" maxLength="50" pattern="[A-Za-z]+$" title="should contain only alphabets" onChange={this.onChange} id="lastName" className="validate" required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">email</i>
                      <label htmlFor="user_mail">Email Address</label>
                      <input type="email" id="user_mail" name="email" value={email} onChange={this.onChange} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="johndoe@gmail.com" id="user_mail" className="validate" required />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea name="message" id="contact-message" value={message} onChange={this.onChange} className="materialize-textarea" id="contact-message" required />
                      <label htmlFor="contact-message">
                        Send Us A Message
                      </label>
                    </div>
                  </div>
                  <div className="input-field">
                    <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>;
    }
}

