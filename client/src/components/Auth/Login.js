import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import LoginForm from '../Forms/LoginForm';

/**
 * A class to represent the React Login Component
 *@class Login
 *@classdesc creates a React component- Login
 */
export default class Login extends React.Component {
    state = {
      message: null
    }

  /**
   * @description - Redirects authenticated users to the user profile page
   *
   * @return {void} no return or void
   */
    componentWillMount() {
      if (this.props.usersReducer.authenticated) {
        this.props.history.push('/userProfile');
      }
    }

    /**
      * onSubmit Event handler callback for login form
      * @param {object} credentials The event object
      *
      * @return {null}  user profile component if successful or returns error message
      * @memberof Login Component
      */
    onSubmit = (credentials) => {
      this.props.login(credentials)
        .then(() => {
          NotificationManager.success('Login Successful Welcome Back!!', 'Successful');
          setTimeout(() => this.props.history.push('/userProfile'), 2000);
        })
        .catch((err) => {
          this.setState({ message: err.response.data.message });
        });
    }

  /**
    * Renders the Login Component
    * @return {jsx} jsx element to render
    * @memberof Login Component
    */
    render() {
      return (<div className="row container">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Login to WEconnect</h3>
              </div>
              <LoginForm submit={this.onSubmit} message={this.state.message} />
              <NotificationContainer/>
            </div>
          </div>
    </div>);
    }
}
