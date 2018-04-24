import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

/**
 * A class to represent the React Login Component
 *@class Login
 *@classdesc creates a React component- Login
 */
export default class Login extends React.Component {
    state = {
      credentials: {
        email: '',
        password: ''
      },
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
    * onChange Event handler callback for login form fields
    * @param {object} e the event object
    *
    * @return {func} updates the state of the login component
    * @memberof Login Component
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
      * @memberof Login Component
      */
    onSubmit = (e) => {
      e.preventDefault();
      this.props.login(this.state.credentials)
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
      const { message } = this.state;
      const { email, password } = this.state.credentials;
      return <div className="row container">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Login to WEconnect</h3>
              </div>
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
                <NotificationContainer/>
              </div>
            </div>
          </div>
        </div>;
    }
}
