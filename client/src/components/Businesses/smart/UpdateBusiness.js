import React from 'react';
import { Input } from 'react-materialize';
import { Link } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import alertify from 'alertifyjs';
import Errors from '../../Messages/presentational/Errors';

/**
 *
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class UpdateBusiness extends React.Component {
    static defaultProps = {
      categories: [
        'Gaming', 'Technology', 'Housing', 'Transport', 'Power & Energy', 'Food',
        'Consulting Services', 'Construction', 'Educational Services', 'Government', 'Religion'
      ],
      locations: [
        'ABIA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE', 'BORNO',
        'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU', 'FCT-ABUJA', 'GOMBE', 'IMO', 'JIGAWA',
        'KADUNA', 'KANO', 'KATSINA', 'KEBBI', 'KOGI', 'KWARA', 'LAGOS', 'NASSARAWA', 'NIGER', 'OGUN', 'ONDO',
        'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA'
      ]
    }

    state = {
      business: {
        name: '',
        location: 'null',
        category: 'null',
        address: '',
        email: '',
        description: '',
        telephoneNumber: '',
        homeNumber: ''
      },
      errors: {
        message: null,
        conflict: null
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
        business: { ...this.state.business, [e.target.name]: e.target.value }
      });

    /**
    * Creates a React Component
    * @param {object} e message with the business created or error message
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
    */
    handleUpdateSubmit = (e) => {
      e.preventDefault();
      const businessDetails = {};
      const businessKeys = Object.keys(this.state.business);

      for (let i = 0; i < businessKeys.length; i += 1) {
        const key = businessKeys[i];
        if (this.state.business[key].length > 1 && this.state.business[key] !== 'null') {
          businessDetails[key] = this.state.business[key];
        }
      }
      this.props.updateBusiness(this.props.match.params.id, businessDetails)
        .then((response) => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Business Updated Successfully');
          setTimeout(() => this.props.history.push(`/businessProfile${this.props.match.params.id}`), 2000);
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
    * Creates a React Component
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
    */
    render() {
      const categoryOptions = this.props.categories.map(category =>
        <option key={category} value={category}>{category}</option>);

      const locationOptions = this.props.locations.map(location =>
        <option key={location} value={location}>{location}</option>);
      const { errors, business } = this.state;
      return <div className="row container">
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
                <form onSubmit={this.handleUpdateSubmit}>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">
                        business_center
                      </i>
                      <label htmlFor="name">Business Name</label>
                      <input type="text" name="name" pattern="^[a-zA-Z0-9\s.\-]+$" title="should contain only alphabets" minLength="3" maxLength="50" value={business.name} onChange={this.onChange} className="validate"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <Input type="select" name="location" value={business.location} onChange={this.onChange} >
                        <option value="null" disabled>
                          Choose your location
                        </option>
                        {locationOptions}
                      </Input>
                      {/* <label>Location</label> */}
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <Input type="select" name="category" value={business.category} onChange={this.onChange} >
                        <option value="null" disabled>
                          Choose your category
                        </option>
                        {categoryOptions}
                      </Input>
                      {/* <label>Category</label> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">email</i>
                      <label htmlFor="email">Contact Email Address</label>
                      <input type="email" placeholder="johndoe@gmail.com" name="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" value={business.email} onChange={this.onChange} className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">location_on</i>
                      <label htmlFor="address">Business Address</label>
                      <input type="text" placeholder="Enter Business Address" name="address" value={business.address} minLength="4" maxLength="50" onChange={this.onChange} className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="telephoneNumber">
                        Telephone Number
                      </label>
                      <input type="text" name="telephoneNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={business.telephoneNumber} onChange={this.onChange} className="validate" />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="homeNumber">Home Number</label>

                      <input type="text" name="homeNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={business.homeNumber} onChange={this.onChange} className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea className="materialize-textarea" name="description" value={business.description} minLength="20" maxLength="500" onChange={this.onChange} />
                      <label htmlFor="description">
                        Business Description
                      </label>
                    </div>
                  </div>
                  <br />
                  <div className="input-field">
                    <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" onClick={this.handleUpdateSubmit} style={{ width: `${100}%` }}>
                      UPDATE BUSINESS DETAILS
                    </button>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col s12 m12 l6 offset-l3 center">
                      <h6>
                        <Link to="/userProfile">
                          Go Back to Profile Page
                        </Link>
                      </h6>
                    </div>
                  </div>
                </form>
                <NotificationContainer/>
              </div>
            </div>
          </div>
        </div>;
    }
}
