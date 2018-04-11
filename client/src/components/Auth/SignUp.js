import React from 'react';
import Errors from '../Messages/Errors';
/**
 *
 *@class SignUp
 *@classdesc creates a React component- SignUp
 */
export default class SignUp extends React.Component {
    state = {
      errors: {
        message: null
      }
    }

  /**
    * Handles SignUp Form Submission
    * @param {object} e the signup page
    * @return {jsx} renders the signup page
    * @memberof React Component
    */
    handleSignUpSubmit(e) {
      e.preventDefault();
      if (this.refs.confirmPassword.value !== this.refs.password.value) {
        return this.setState({ errors: { message: 'Passwords don\'t match' } });
      }
      const {
        firstname, lastname, telephoneNumber, password, email, confirmPassword, homeNumber
      } = this.refs;

      const userDetails = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        telephoneNumber: telephoneNumber.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      let userHomeNumber;

      if (homeNumber.value.trim().length > 1) {
        userDetails.homeNumber = homeNumber.value;
      }
      this.props.registerUser(userDetails)
        .then(() => {
          console.log(this.props);
          if (this.props.usersReducer.errors) {
            return this.setState({ errors: { message: this.props.usersReducer.errors.validationErrors } });
          }
        });
    }

  /**
    * Creates a React Component
    * @return {jsx} renders the signup page
    * @memberof React Component
    */
    render() {
      const { errors } = this.state;
      return <div className="row container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Sign Up to WEconnect</h3>
              </div>
              <div className="card-content">
                {errors.message ? <ul class="collection with-header">
                  <li class="collection-header">
                    <h4>Something Went Wrong</h4>
                  </li>
                  {errors.message.map((error, i) =>
                  <Errors message={error} key={i}/>)}
                </ul> : null }
                <form onSubmit={this.handleSignUpSubmit.bind(this)}>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="firstname">First Name</label>

                      <input type="text" ref="firstname" pattern="[A-Za-z]+$" title="should contain only alphabets" minLength="3" maxLength="50" className="validate" required />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="lastname">Last Name</label>

                      <input type="text" ref="lastname" pattern="[A-Za-z]+$" title="should contain only alphabets" minLength="3" maxLength="50" className="validate" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">lock</i>
                      <label htmlFor="password">Password</label>
                      <input type="password" ref="password" title="Password should be 6-16 characters long" pattern="^([a-zA-Z0-9@*#]{6,16})$" maxLength="16" minLength="6" className="validate" required />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">lock</i>
                      <label htmlFor="confirmPass">
                        Confirm Password
                      </label>
                      <input type="password" ref="confirmPassword" className="confirmPassword" required />
                      {this.state.errors.message && <div className="right-align">
                          <span className="red-text">
                            {this.state.errors.message}
                          </span>
                        </div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">email</i>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="johndoe@gmail.com" ref="email" className="validate" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="telephoneNumber">
                        Telephone Number
                      </label>

                      <input type="text" ref="telephoneNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" className="validate" required />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="homeNumber">Home Number</label>

                      <input type="text" ref="homeNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" className="validate" />
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
                        <a>Already have an Account? Login here</a>
                      </h6>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>;
    }
}
