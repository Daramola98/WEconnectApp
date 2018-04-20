import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Input } from 'react-materialize';
import alertify from 'alertifyjs';
import Errors from '../../Messages/presentational/Errors';


/**
 *
 *@class RegisterBusiness
 *@classdesc creates a React component- RegisterBusiness
*/
export default class RegisterBusiness extends React.Component {
  /**
* Creates a React Component
* @param {object} props the props object for component
* @return {jsx} renders the register business page
* @memberof React Component
*/
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }
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

/**
   * @description - redirect registered user to all-budiness page
   *
   * @return {void} no return or void
   */
componentWillMount() {
  if (this.props.usersReducer.authenticated !== true) {
    this.props.history.push('/login');
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
* @param {object} e the register business page
* @return {jsx} renders the register business page
* @memberof React Component
*/
handleRegisterBusinessSubmit = (e) => {
  e.preventDefault();
  if (this.state.business.category === 'null' || this.state.business.location === 'null') {
    alertify.set('notifier', 'position', 'top-right');
    return alertify.error('Business Location and Category are required');
  }
  const businessDetails = {
    name: this.state.business.name,
    location: this.state.business.location,
    category: this.state.business.category,
    description: this.state.business.description,
    address: this.state.business.address,
    email: this.state.business.email,
    telephoneNumber: this.state.business.telephoneNumber
  };

  if (this.state.business.homeNumber.length > 1) {
    businessDetails.homeNumber = this.state.business.homeNumber;
  }
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
* Creates a React Component
* @return {jsx} renders the register business page
* @memberof React Component
*/
render() {
  const categoryOptions = this.props.categories.map(category =>
    <option key={category} value={category}>{category}</option>);

  const locationOptions = this.props.locations.map(location =>
  <option key={location} value={location}>{location}</option>);

  const { business, errors } = this.state;
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
            <form onSubmit={this.handleRegisterBusinessSubmit}>
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <i className="material-icons prefix">business_center</i>
                  <label htmlFor="name">Business Name</label>
                  <input type="text" name="name" pattern="^[a-zA-Z0-9\s.\-]+$" title="should contain only alphabets" minLength="3" maxLength="50" value={business.name} onChange={this.onChange} className="validate" required />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <Input type="select" name="location" value={business.location} onChange={this.onChange} required>
                    <option value="null" disabled>
                      Choose Your Location
                    </option>
                    {locationOptions}
                  </Input>
                  {/* <label>Location</label> */}
                </div>
                <div className="input-field col s12 m6 l6">
                  <Input type="select" name="category" value={business.category} onChange={this.onChange} required>
                    <option value="null" disabled>
                      Choose Your Category
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
                  <input type="email" name="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" value={business.email} onChange={this.onChange} placeholder="johndoe@gmail.com" ref="email" className="validate" required />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <i className="material-icons prefix">location_on</i>
                  <label htmlFor="address">Business Address</label>
                  <input type="text" name="address" value={business.address} minLength="4" maxLength="50" onChange={this.onChange} placeholder="Enter Business Address" ref="address" className="validate" required />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12 l6">
                  <i className="material-icons prefix">phone</i>
                  <label htmlFor="telephoneNumber">Telephone Number</label>
                  <input type="text" name="telephoneNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={business.telephoneNumber} onChange={this.onChange} ref="telephoneNumber" className="validate" required />
                </div>
                <div className="input-field col s12 m12 l6">
                  <i className="material-icons prefix">phone</i>
                  <label htmlFor="homeNumber">Home Number</label>

                  <input type="text" name="homeNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={business.homeNumber} onChange={this.onChange} ref="homeNumber" className="validate" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <i className="material-icons prefix">mode_edit</i>
                  <textarea name="description" value={business.description} minLength="20" maxLength="500" onChange={this.onChange} className="materialize-textarea" ref="description" required />
                  <label htmlFor="description">Business Description</label>
                </div>
              </div>
              <br />
              <div className="input-field">
                <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>
                  REGISTER BUSINESS
                </button>
              </div>
              <br />
              <div className="row">
                <div className="col s12 m12 l6 offset-l3 center">
                  <h6>
                    <Link to="/userProfile">Go Back to Profile Page</Link>
                  </h6>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </div>;
}
}

