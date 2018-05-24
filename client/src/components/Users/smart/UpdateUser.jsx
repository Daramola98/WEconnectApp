import React from 'react';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import FormErrors from '../../Messages/presentational/FormErrors.jsx';
import UpdateUserForm from '../../Forms/UpdateUserForm.jsx';

/**
 * Class Representing React Component UpdateUser
 *@class UpdateUser
 *@classdesc creates a React component- UpdateUser
 */
export default class UpdateUser extends React.Component {
  state = {
    errors: {
      message: null,
      conflict: null
    }
  }

  /**
   * @description - Redirects unauthenticated user to the login page
   *
   * @return {void} no return or void
   */
  componentWillMount() {
    if (this.props.usersReducer.authenticated !== true) {
      this.props.history.push('/login');
    }
  }

  /**
    * Handles Update Form Submission
    * @param {object} userDetails the User Details object
    * @return {null} updates the state of the updateUser component
    * @memberof UpdateUser Component
    */
    onSubmit = (userDetails) => {
      this.props.updateUser(userDetails)
        .then(() => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Updated Successfully');
          setTimeout(() => this.props.history.push('/userProfile'), 1000);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.warning('Session Expired Login again');
            this.props.logout();
            setTimeout(() => this.props.history.push('/login'), 1000);
            return;
          }
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
    * Renders the UpdateUser Component
    * @return {jsx} jsx element to render
    * @memberof UpdateUser Component
    */
    render() {
      const { errors } = this.state;
      return <div className="row container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue-grey darken-2 white-text center">
                <h3>Edit Profile</h3>
              </div>
              <div className="card-content">
                <FormErrors errors={errors} />
                <UpdateUserForm submit={this.onSubmit}/>
              </div>
            </div>
          </div>
        </div>;
    }
}

UpdateUser.propTypes = {
  usersReducer: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
