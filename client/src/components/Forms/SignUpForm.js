import React from 'react';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import Errors from '../Messages/presentational/Errors';

/**
 * A class to represent the React SignUpForm Component
 *@class SignUpForm
 *@classdesc creates a React component- SignUpForm
 */
export default class SignUpForm extends React.Component {
    state = {
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephoneNumber: '',
        homeNumber: '',
      },
      errors: {
        message: null,
        conflict: null,
        confirmPassError: null
      }
    }

  /**
    * onChange Event handler callback for SignUpForm form fields
    * @param {object} e the event object
    *
    * @return {func} updates the state of the SignUpForm component
    * @memberof SignUpForm Component
    */
    onChange = e =>
      this.setState({
        ...this.state,
        user: { ...this.state.user, [e.target.name]: e.target.value }
      });

  /**
    * Handles SignUpForm Form Submission
    * @param {object} e the event object
    *
    * @return {null} user profile component if successful or returns error message
    * @memberof SignUpForm Component
    */
    handleSignUpSubmit = (e) => {
      e.preventDefault();
      if (this.state.user.confirmPassword !== this.state.user.password) {
        return this.setState({ errors: { ...this.state.errors, confirmPassError: 'Passwords don\'t match' } });
      }
      const {
        firstname, lastname, username, telephoneNumber, password, email, confirmPassword, homeNumber
      } = this.state.user;

      const userDetails = {
        firstname,
        lastname,
        username,
        email,
        telephoneNumber,
        password,
        confirmPassword,
      };

      let userHomeNumber;

      if (homeNumber.trim().length > 1) {
        userDetails.homeNumber = homeNumber;
      }
      this.props.submit(userDetails);
    }

  /**
    * Renders the SignUpForm Component
    * @return {jsx} jsx element to render
    * @memberof SignUpForm Component
    */
    render() {
      const { errors } = this.props;
      const {
        firstname, lastname, username, email, telephoneNumber, homeNumber, password, confirmPassword
      } = this.state.user;
      return <div>
              <div className="card-content">
                {errors.message ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  {errors.message.map((error, i) =>
                  <Errors key ={`error${i}`} message={error} index={i}/>)}
                 </ul> : null }
                {errors.conflict ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  <li key="conflict" className="collection-item"><span className="red-text">{errors.conflict}</span></li>
                 </ul> : null }
                <form onSubmit={this.handleSignUpSubmit}>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="firstname">First Name</label>

                      <input type="text" name="firstname" pattern="[A-Za-z]+$" title="should contain only alphabets" value={firstname} onChange={this.onChange} minLength="3" maxLength="50" className="validate" required />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="lastname">Last Name</label>

                      <input type="text" name="lastname" pattern="[A-Za-z]+$" value={lastname} onChange={this.onChange} title="should contain only alphabets" minLength="3" maxLength="50" className="validate" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">account_circle</i>
                      <label htmlFor="username">Username</label>
                      <input type="text" value={username} onChange={this.onChange} pattern="[A-Za-z0-9]*$" name="username" title="should contain only alphanumeric characters" minLength="3" maxLength="50" className="validate" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">lock</i>
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" value={password} onChange={this.onChange} title="Password should be 6-16 characters long" pattern="^([a-zA-Z0-9@*#]{6,16})$" maxLength="16" minLength="6" className="validate" required />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">lock</i>
                      <label htmlFor="confirmPass">
                        Confirm Password
                      </label>
                      <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.onChange} className="confirmPassword" required />
                      {this.state.errors.confirmPassError && <div className="right-align">
                          <span className="red-text">
                            {this.state.errors.confirmPassError}
                          </span>
                        </div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">email</i>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" value={email} onChange={this.onChange} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="johndoe@gmail.com" name="email" className="validate" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="telephoneNumber">
                        Telephone Number
                      </label>

                      <input type="text" name="telephoneNumber" value={telephoneNumber} onChange={this.onChange} pattern="^[0-9]+$" minLength="7" maxLength="11" className="validate" required />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="homeNumber">Home Number</label>

                      <input type="text" name="homeNumber" value={homeNumber} onChange={this.onChange} pattern="^[0-9]+$" minLength="7" maxLength="11" className="validate" />
                    </div>
                  </div>

                  <br />
                  <div className="input-field">
                    <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                      CREATE ACCOUNT
                    </button>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col s12 m12 l6 offset-l3 center">
                      <h6>
                        <Link to="/login">Already have an Account? Login here</Link>
                      </h6>
                    </div>
                  </div>
                </form>
              </div>
            </div>;
    }
}