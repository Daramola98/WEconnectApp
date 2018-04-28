import React from 'react';
import alertify from 'alertifyjs';
import BusinessUpdateForm from '../../Forms/BusinessUpdateForm';

/**
 * Class Representing React Component UpdateBusiness
 *@class UpdateBusiness
 *@classdesc creates a React component- UpdateBusiness
 */
export default class UpdateBusiness extends React.Component {
    state = {
      errors: {
        message: null,
        conflict: null
      }
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
   * @description - dispatches the redux action to fetch business categories
   *
   * @return {void} no return or void
   */
    componentDidMount() {
      this.props.fetchCategories();
    }

    /**
      * onSubmit Event handler callback for UpdateBusiness form
      * @param {object} businessDetails The Business Details object
      *
      * @return {null}  Business Updated message or returns error message
      * @memberof UpdateBusiness Component
      */
    onSubmit = (businessDetails) => {
      this.props.updateBusiness(this.props.match.params.id, businessDetails)
        .then((response) => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Business Updated Successfully');
          setTimeout(() => this.props.history.push(`/businessProfile${this.props.match.params.id}`), 2000);
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
    * Renders the UpdateBusiness Component
    * @return {jsx} jsx element to render
    * @memberof UpdateBusiness Component
    */
    render() {
      const { businesses } = this.props;
      const businessCategories = businesses.categories;
      const { errors } = this.state;
      return (<div className="row container">
          <div className="col s12 m8 offset-m2 l8 offset-l2">
            <div className="card">
              <div className="card-action blue lighten-1 white-text center">
                <h3>Update a Business</h3>
              </div>
              <div className="card-content">
                {errors.message ? <ul className="collection with-header">
                    <li key="header" className="collection-header">
                      <h4 className="red-text">Something Went Wrong</h4>
                    </li>
                    {errors.message.map((error, i) => (
                      <Errors
                        key={`error${i}`}
                        message={error}
                        index={i}
                      />
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
              <BusinessUpdateForm
               businesses={businesses} submit={this.onSubmit}/>
            </div>
          </div>
        </div>
    </div>);
    }
}
