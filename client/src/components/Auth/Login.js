import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

/**
 *
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
        credentials: { ...this.state.credentials, [e.target.name]: e.target.value }
      });

    /**
      * Creates a React Component
      * @param {object} e message with the business created or error message
      * @return {jsx} Success message with the business created or error message
      * @memberof React Component
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
    * Creates a React Component
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
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
