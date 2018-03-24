import React from 'react';

/**
 *
 *@class Login
 *@classdesc creates a React component- Login
 */
export default class Login extends React.Component {
  /**
       * Creates a React Component
       * @return {jsx} Success message with the business created or error message
       * @memberof React Component
       */
  render() {
    return (
        <div class="row">
                <div class="col s12 m8 offset-m2 l6 offset-l3">
                    <div class="card">
                        <div class="card-action blue lighten-1 white-text center">
                            <h3>Login to WEconnect</h3>
                        </div>
                        <div class="card-content">
                            <form action="userProfile.html">
                                <div class="form-field">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" class="validate" required/>
                                </div>
                                <div class="form-field">
                                    <label for="passwd">Password</label>
                                    <input type="password" id="passwd" class="validate" required/>
                                </div>
                                <div class="form-field">
                                    <input type="checkbox" id="remember"/>
                                    <label for="remember">Remember Me</label>
                                </div>
                                <br/>
                                <div class="form-field">
                                    <button type="submit" class="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}
