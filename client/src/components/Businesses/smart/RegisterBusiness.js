import React from 'react';
import alertify from 'alertifyjs';
import RegisterBusinessForm from '../../Forms/RegisterBusinessForm';


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
      }
    };
  }

  /**
   * @description - Redirects unauthenticated users to the login page
   *
   * @return {void} no return or void
   */
  componentWillMount() {
    if (this.props.usersReducer.authenticated !== true) {
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
    this.props.registerBusiness(businessDetails)
      .then((response) => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Business Registered Successfully');
        setTimeout(() => this.props.history.push('/userProfile'), 4000);
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
    * Renders the RegisterBusiness Component
    * @return {jsx} jsx element to render
    * @memberof RegisterBusiness Component
    */
  render() {
    const { errors } = this.state;
    const { businesses } = this.props;
    const businessCategories = businesses.categories;
    return <div className="row container">
        <div className="col s12 m8 offset-m2 l8 offset-l2">
          <div className="card">
            <div className="card-action blue lighten-1 white-text center">
              <h3>Register a Business</h3>
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
              <RegisterBusinessForm businesses={businesses} submit={this.onSubmit} />
            </div>
          </div>
        </div>
      </div>;
  }
}

