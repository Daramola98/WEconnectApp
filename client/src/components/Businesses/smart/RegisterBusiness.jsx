import React from 'react';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import RegisterBusinessForm from '../../Forms/RegisterBusinessForm.jsx';
import FormErrors from '../../Messages/presentational/FormErrors.jsx';


/**
 * Class Representing React Component RegisterBusiness
 *@class RegisterBusiness
 *@classdesc creates a React component- RegisterBusiness
*/
export default class RegisterBusiness extends React.Component {
  /**
    * @param {object} props props from parent class
    * @return {null} creates state and initalizes class variables
    * @memberof RegisterBusiness Component
    */
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        message: null,
        conflict: null
      },
      disableBtn: false
    };
  }

  /**
   * @description - Redirects unauthenticated users to the login page
   *
   * @return {void} no return or void
   */
  componentWillMount() {
    const { authenticated } = this.props.usersReducer;
    if (authenticated !== true) {
      this.props.history.push('/login');
    }
  }

  /**
   * @description - dispatches redux action to fetch business categories
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.fetchCategories();
  }

  /**
      * onSubmit Event handler callback for RegisterBusiness form
      * @param {object} businessDetails The Business details object
      *
      * @return {null}  Business Registered message or returns error message
      * @memberof RegisterBusiness Component
      */
  onSubmit = (businessDetails) => {
    this.setState({
      errors:
      {
        message: null,
        conflict: null
      },
      disableBtn: true
    });
    this.props.registerBusiness(businessDetails)
      .then((response) => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Business Registered Successfully');
        setTimeout(() => this.props.history.push({
          pathname: '/userProfile',
          state: { info: false, businesses: true }
        }), 2000);
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
    * Renders the RegisterBusiness Component
    * @return {jsx} jsx element to render
    * @memberof RegisterBusiness Component
    */
  render() {
    const { errors, disableBtn } = this.state;
    const { categories } = this.props.businesses;
    return <div className="row formcontainer container">
        <div className="col s12 m8 offset-m2 l8 offset-l2">
          <div className="card">
            <div className="card-action blue-grey darken-2  white-text center">
              <h3>Register a Business</h3>
            </div>
            <div className="card-content">
              <FormErrors errors={errors} />
              <RegisterBusinessForm
               categories={categories} submit={this.onSubmit}
               disableBtn={disableBtn} />
            </div>
          </div>
        </div>
      </div>;
  }
}

RegisterBusiness.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  registerBusiness: PropTypes.func.isRequired,
  businesses: PropTypes.object.isRequired,
  usersReducer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
