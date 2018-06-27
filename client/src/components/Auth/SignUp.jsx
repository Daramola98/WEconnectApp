import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import FormErrors from '../Messages/presentational/FormErrors.jsx';
import SignUpForm from '../Forms/SignUpForm.jsx';

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
    },
    disableBtn: false
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
    this.setState({ disableBtn: true });
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
            { ...this.state.errors, message: error.response.data.validationErrors },
            disableBtn: false
          });
        }
        return this.setState({
          errors:
           { ...this.state.errors, conflict: error.response.data.message },
          disableBtn: false
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
              <div className="card-action blue-grey darken-2 white-text center">
                <h3>Sign Up</h3>
              </div>
              <div className="card-content">
              <FormErrors errors={errors} />
              <SignUpForm submit={this.onSubmit} disableBtn={this.state.disableBtn} />
            </div>
            </div>
          </div>
        </div>);
  }
}

SignUp.propTypes = {
  usersReducer: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
