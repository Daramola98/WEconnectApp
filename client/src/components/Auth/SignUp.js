import React from 'react';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import Errors from '../Messages/presentational/Errors';
import SignUpForm from '../Forms/SignUpForm';

/**
 * A class to represent the React SignUp Component
 *@class SignUp
 *@classdesc creates a React component- SignUp
 */
export default class SignUp extends React.Component {
  state = {
    errors: {
      message: null,
      conflict: null,
      confirmPassError: null
    }
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
    * Handles SignUp Form Submission
    * @param {object} userDetails the event object
    *
    * @return {null} user profile component if successful or returns error message
    * @memberof SignUp Component
    */
  onSubmit = (userDetails) => {
    this.props.signUp(userDetails)
      .then(() => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Registration Successful');
        setTimeout(() => this.props.history.push('/userProfile'), 2000);
      })
      .catch((error) => {
        window.scroll(0, 0);
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
    * Renders the SignUp Component
    * @return {jsx} jsx element to render
    * @memberof SignUp Component
    */
  render() {
    const { errors } = this.state;
    return (<div className="row container">
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
                  {errors.message.map((error, i) => (
                    <Errors key={`error${i}`} message={error} index={i} />
                  ))}
                </ul> : null}
              {errors.conflict ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  <li key="conflict" className="collection-item">
                    <span className="red-text">{errors.conflict}</span>
                  </li>
                </ul> : null}
              <SignUpForm submit={this.onSubmit} />
            </div>
            </div>
          </div>
        </div>);
  }
}
