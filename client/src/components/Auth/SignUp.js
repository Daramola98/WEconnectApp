import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import alertify from 'alertifyjs';
import Errors from '../Messages/Errors';

/**
 *
 *@class SignUp
 *@classdesc creates a React component- SignUp
 */
export default class SignUp extends React.Component {
    state = {
      user: {
        firstname: '',
        lastname: '',
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
   * @description - redirect registered user to all-budiness page
   *
   * @return {void} no return or void
   */
    componentWillMount() {
      if (this.props.usersReducer.authenticated) {
        this.props.history.push('/userProfile');
      }
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
        user: { ...this.state.user, [e.target.name]: e.target.value }
      });
  /**
    * Handles SignUp Form Submission
    * @param {object} e the signup page
    * @return {jsx} renders the signup page
    * @memberof React Component
    */
    handleSignUpSubmit(e) {
      e.preventDefault();
      if (this.state.user.confirmPassword !== this.state.user.password) {
        return this.setState({ errors: { ...this.state.errors, confirmPassError: 'Passwords don\'t match' } });
      }
      const {
        firstname, lastname, telephoneNumber, password, email, confirmPassword, homeNumber
      } = this.state.user;

      const userDetails = {
        firstname,
        lastname,
        email,
        telephoneNumber,
        password,
        confirmPassword,
      };

      let userHomeNumber;

      if (homeNumber.trim().length > 1) {
        userDetails.homeNumber = homeNumber;
      }
      this.props.signUp(userDetails)
        .then(() => {
          // NotificationManager.success('Registration Successful', 'Successful');
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Registration Successful');
          setTimeout(() => this.props.history.push('/userProfile'), 4000);
        })
        .catch((error) => {
          if (error && error.response.data.validationErrors) {
            return this.setState({
              errors:
              { ...this.state.errors, message: error.response.data.validationErrors }
            });
          }
          return this.setState({
            errors:
             { ...this.state.errors, conflict: error.response.data.message }
          });
        });
    }

  /**
    * Creates a React Component
    * @return {jsx} renders the signup page
    * @memberof React Component
    */
    render() {
      const { errors } = this.state;
      const {
        firstname, lastname, email, telephoneNumber, homeNumber, password, confirmPassword
      } = this.state.user;
      return <div className="row container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Sign Up to WEconnect</h3>
              </div>
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
                <form onSubmit={this.handleSignUpSubmit.bind(this)}>
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
                <NotificationContainer/>
              </div>
            </div>
          </div>
        </div>;
    }
}
