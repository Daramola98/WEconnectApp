import React from 'react';
import PropTypes from 'prop-types';

/**
 * A class to represent the React LoginForm Component
 *@class Login
 *@classdesc creates a React component- LoginForm
 */
export default class LoginForm extends React.Component {
    state = {
      credentials: {
        email: '',
        password: ''
      },
      submitClicked: false
    }

    /**
    * onChange Event handler callback for login form fields
    * @param {object} event the event object
    *
    * @return {func} updates the state of the loginForm component
    * @memberof LoginForm Component
    */
    onChange = event =>
      this.setState({
        ...this.state,
        credentials: { ...this.state.credentials, [event.target.name]: event.target.value }
      });

    /**
      * onSubmit Event handler callback for login form
      * @param {object} event The event object
      *
      * @return {null}  user profile component if successful or returns error message
      * @memberof LoginForm Component
      */
    onSubmit = (event) => {
      event.preventDefault();
      this.props.submit(this.state.credentials);
    }

  /**
    * Renders the LoginForm Component
    * @return {jsx} jsx element to render
    * @memberof LoginForm Component
    */
    render() {
      const { email, password } = this.state.credentials;
      return (
          <form onSubmit={this.onSubmit}>
            <div className="form-field">
              <label htmlFor="username">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={this.onChange} className="validate" required />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={this.onChange} className="validate" required />
            </div>
            <div className="form-field">
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <br />
            <div className="form-field">
              <button type="submit" className="btn-large waves-effect waves-dark blue-grey darken-2" disabled={this.props.disableBtn} style={{ width: `${100}%` }}>
                Login
              </button>
            </div>
      </form>);
    }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  disableBtn: PropTypes.bool.isRequired
};
