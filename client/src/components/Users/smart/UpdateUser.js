import React from 'react';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import Errors from '../../Messages/presentational/Errors';

/**
 * Class Representing React Component UpdateUser
 *@class UpdateUser
 *@classdesc creates a React component- UpdateUser
 */
export default class UpdateUser extends React.Component {
  state = {
    user: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      telephoneNumber: '',
      homeNumber: ''
    },
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
    * onChange Event handler callback for UpdateUser form fields
    * @param {object} e the event object
    *
    * @return {null} updates the state of the UpdateUser component
    * @memberof UpdateUser Component
    */
    onChange = e =>
      this.setState({
        ...this.state,
        user: { ...this.state.user, [e.target.name]: e.target.value }
      });

  /**
    * Handles Update Form Submission
    * @param {object} e the event object
    * @return {null} updates the state of the updateUser component
    * @memberof UpdateUser Component
    */
    handleUpdateSubmit(e) {
      e.preventDefault();
      const userDetails = {};
      const userKeys = Object.keys(this.state.user);

      for (let i = 0; i < userKeys.length; i += 1) {
        const key = userKeys[i];
        if (this.state.user[key].length > 1 && this.state.user[key] !== 'null') {
          userDetails[key] = this.state.user[key];
        }
      }
      this.props.updateUser(userDetails)
        .then(() => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Updated Successfully');
          alertify.warning('Redirecting to login page!, You need to login to view changes made');
          this.props.logout();
          setTimeout(() => this.props.history.push('/login'), 4000);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.warning('Session Expired Login again');
            this.props.logout();
            setTimeout(() => this.props.history.push('/login'), 1000);
            return;
          }
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
      const {
        firstname, lastname, username, email, telephoneNumber, homeNumber
      } = this.state.user;
      return <div className="row container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Edit Profile</h3>
              </div>
              <div className="card-content">
                {errors.message ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  {errors.message.map((error, i) =>
                  <Errors key ={`error${i}`} message={error} index={i}/>)}
                 </ul> : null }
                {errors.conflict ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  <li key="conflict" className="collection-item"><span className="red-text">{errors.conflict}</span></li>
                 </ul> : null }
                <form onSubmit={this.handleUpdateSubmit.bind(this)}>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="firstname">First Name</label>

                      <input type="text" name="firstname" pattern="[A-Za-z]+$" title="should contain only alphabets" value={firstname} onChange={this.onChange} minLength="3" maxLength="50" className="validate" />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">
                        account_circle
                      </i>
                      <label htmlFor="lastname">Last Name</label>

                      <input type="text" name="lastname" pattern="[A-Za-z]+$" value={lastname} onChange={this.onChange} title="should contain only alphabets" minLength="3" maxLength="50" className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">account_circle</i>
                      <label htmlFor="username">Username</label>
                      <input type="text" value={username} onChange={this.onChange} pattern="[A-Za-z0-9]*$" name="username" title="should contain only alphanumeric characters" minLength="3" maxLength="50" className="validate" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">email</i>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" value={email} onChange={this.onChange} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="johndoe@gmail.com" name="email" className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="telephoneNumber">
                        Telephone Number
                      </label>

                      <input type="text" name="telephoneNumber" value={telephoneNumber} onChange={this.onChange} pattern="^[0-9]+$" minLength="7" maxLength="11" className="validate" />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="homeNumber">Home Number</label>

                      <input type="text" name="homeNumber" value={homeNumber} onChange={this.onChange} pattern="^[0-9]+$" minLength="7" maxLength="11" className="validate" />
                    </div>
                  </div>

                  <br />
                  <div className="input-field">
                    <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                      UPDATE USER DETAILS
                    </button>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col s12 m12 l6 offset-l3 center">
                      <h6>
                        <Link to="/userProfile">GO BACK TO PROFILE PAGE</Link>
                      </h6>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>;
    }
}
