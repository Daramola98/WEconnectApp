import React from 'react';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';

/**
 * Class Representing React Component UpdateUserForm
 *@class UpdateUserForm
 *@classdesc creates a React component- UpdateUserForm
 */
export default class UpdateUserForm extends React.Component {
  state = {
    user: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      telephoneNumber: '',
      homeNumber: ''
    },
  }

  /**
    * onChange Event handler callback for UpdateUserForm form fields
    * @param {object} event the event object
    *
    * @return {null} updates the state of the UpdateUserForm component
    * @memberof UpdateUserForm Component
    */
    onChange = event =>
      this.setState({
        ...this.state,
        user: { ...this.state.user, [event.target.name]: event.target.value }
      });

  /**
    * Handles Update Form Submission
    * @param {object} event the event object
    * @return {null} updates the state of the UpdateUserForm component
    * @memberof UpdateUserForm Component
    */
    handleUpdateSubmit(event) {
      event.preventDefault();
      const userDetails = {};
      const userKeys = Object.keys(this.state.user);

      for (let i = 0; i < userKeys.length; i += 1) {
        const key = userKeys[i];
        if (this.state.user[key].length > 1 && this.state.user[key] !== 'null') {
          userDetails[key] = this.state.user[key];
        }
      }
      this.props.submit(userDetails);
    }

  /**
    * Renders the UpdateUserForm Component
    * @return {jsx} jsx element to render
    * @memberof UpdateUserForm Component
    */
    render() {
      const {
        firstname, lastname, username, email, telephoneNumber, homeNumber
      } = this.state.user;
      return (<div className="row">
          <form onSubmit={this.handleUpdateSubmit.bind(this)}>
            <div className="row">
              <div className="input-field col s12 m12 l6">
                <i className="material-icons prefix">account_circle</i>
                <label htmlFor="firstname">First Name</label>

                <input type="text" name="firstname" pattern="[A-Za-z]+$" title="should contain only alphabets" value={firstname} onChange={this.onChange} minLength="3" maxLength="50" className="validate" />
              </div>
              <div className="input-field col s12 m12 l6">
                <i className="material-icons prefix">account_circle</i>
                <label htmlFor="lastname">Last Name</label>

                <input type="text" name="lastname" pattern="[A-Za-z]+$" value={lastname} onChange={this.onChange} title="should contain only alphabets" minLength="3" maxLength="50" className="validate" />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m12 l12">
                <i className="material-icons prefix">account_circle</i>
                <label htmlFor="username">Username</label>
                <input type="text" value={username} onChange={this.onChange} pattern="[A-Za-z0-9]*$" name="username" title="should contain only alphanumeric characters" minLength="3" maxLength="50" className="validate" />
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
                <label htmlFor="telephoneNumber">Telephone Number</label>

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
    </div>);
    }
}

UpdateUserForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
