import React from 'react';

/**
 *
 *@class Login
 *@classdesc creates a React component- Login
 */
export default class Login extends React.Component {
    state = {
      userCredentials: {
        email: '',
        password: ''
      },
      errors: null
    }

  /**
    * Creates a React Component
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
    */
    formSubmitHandler() {

    }

  /**
    * Creates a React Component
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
    */
    render() {
      return (
          <div className="row container">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                  <div className="card">
                      <div className="card-action blue lighten-1 white-text center">
                          <h3>Login to WEconnect</h3>
                      </div>
                      <div className="card-content">
                          <form onSubmit={this.handleLoginSubmit.bind(this)}>
                              <div className="form-field">
                                  <label htmlFor="username">Username</label>
                                  <input type="text" ref="username" className="validate" required />
                              </div>
                              <div className="form-field">
                                  <label htmlFor="password">Password</label>
                                  <input type="password" ref="password" className="validate" required />
                              </div>
                              <div className="form-field">
                                  <input type="checkbox" ref="remember" />
                                  <label htmlFor="remember">Remember Me</label>
                              </div>
                              <br />
                              <div className="form-field">
                                  <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>Login</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}
