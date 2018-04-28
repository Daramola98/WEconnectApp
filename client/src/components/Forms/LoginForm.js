import React from 'react';

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
      }
    }

    /**
    * onChange Event handler callback for login form fields
    * @param {object} e the event object
    *
    * @return {func} updates the state of the loginForm component
    * @memberof LoginForm Component
    */
    onChange = e =>
      this.setState({
        ...this.state,
        credentials: { ...this.state.credentials, [e.target.name]: e.target.value }
      });

    /**
      * onSubmit Event handler callback for login form
      * @param {object} e The event object
      *
      * @return {null}  user profile component if successful or returns error message
      * @memberof LoginForm Component
      */
    onSubmit = (e) => {
      e.preventDefault();
      this.props.submit(this.state.credentials);
    }

  /**
    * Renders the LoginForm Component
    * @return {jsx} jsx element to render
    * @memberof LoginForm Component
    */
    render() {
      const { message } = this.props;
      const { email, password } = this.state.credentials;
      return (<div className="row">
              <div className="card-content">
                {message ? <ul className="collection with-header">
                    <li key="header" className="collection-header">
                      <h4 className="red-text">Something Went Wrong</h4>
                    </li>
                    <li key="error" className="collection-item"><span className="red-text">{message}</span></li>
                  </ul> : null}
                <form onSubmit={this.onSubmit}>
                  <div className="form-field">
                    <label htmlFor="username">Email</label>
                    <input type="email" name="email" value={email} onChange={this.onChange} className="validate" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={this.onChange} className="validate" required />
                  </div>
                  <div className="form-field">
                    <input type="checkbox" name="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <br />
                  <div className="form-field">
                    <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                      Login
                    </button>
                  </div>
                </form>
              </div>
    </div>);
    }
}