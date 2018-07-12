import React from 'react';
import { Input, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';


/**
 * Class Representing React Component BusinessUpdateForm
 *@class BusinessUpdateForm
 *@classdesc creates a React component- BusinessUpdateForm
 */
export default class BusinessUpdateForm extends React.Component {
    static defaultProps = {
      locations: [
        'ABIA', 'ABUJA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE', 'BORNO',
        'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU', 'GOMBE', 'IMO', 'JIGAWA',
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
        businessImage: null,
        email: '',
        description: '',
        telephoneNumber: '',
        homeNumber: ''
      },
      imagePreviewUrl: null
    }

  /**
    * onChange Event handler callback for BusinessUpdateForm form fields
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessUpdateForm component
    * @memberof BusinessUpdateForm Component
    */
    onChange = event =>
      this.setState({
        ...this.state,
        business: { ...this.state.business, [event.target.name]: event.target.value }
      });

      /**
    * onChange Event handler callback for RegisterBusiness business Image form field
    * @param {object} event the event object
    *
    * @return {null} updates the state of the RegisterBusinessForm component
    * @memberof RegisterBusinessForm Component
    */
   onFileChange = (event) => {
     const reader = new FileReader();
     const file = event.target.files[0];

     reader.onloadend = () => {
       this.setState({
         ...this.state,
         business: { ...this.state.business, businessImage: file },
         imagePreviewUrl: reader.result
       });
     };
     reader.readAsDataURL(file);
   }

    /**
      * onSubmit Event handler callback for BusinessUpdateForm form
      * @param {object} event The event object
      *
      * @return {null}  Business Updated message or returns error message
      * @memberof BusinessUpdateForm Component
      */
    handleUpdateSubmit = (event) => {
      event.preventDefault();
      const businessDetails = {};
      const updateBusinessData = new FormData();
      const businessKeys = Object.keys(this.state.business);

      for (let i = 0; i < businessKeys.length; i += 1) {
        const key = businessKeys[i];
        if (this.state.business[key] !== '' && this.state.business[key] !== 'null') {
          businessDetails[key] = this.state.business[key];
        }
      }
      const businessDetailsKeys = Object.keys(businessDetails);
      businessDetailsKeys.forEach((key) => {
        updateBusinessData.append(key, businessDetails[key]);
      });
      this.props.submit(updateBusinessData);
    }

    /**
   * @description - dispatches the redux action to fetch business categories
   *
   * @param {object} nextProps
   * @return {void} no return or void
   */
    componentWillReceiveProps(nextProps) {
      const { business } = nextProps;
      const {
        name, email, businessImage,
        location, category, address, telephoneNumber, homeNumber, description
      } = business;
      this.setState({
        ...this.state,
        business: {
          name: nextProps.business.name,
          location: nextProps.business.location,
          category: nextProps.business.category,
          address: nextProps.business.address,
          email: nextProps.business.email,
          description: nextProps.business.description,
          telephoneNumber: nextProps.business.telephoneNumber,
          homeNumber: nextProps.business.homeNumber === null ? '' : nextProps.business.homeNumber
        },
        imagePreviewUrl: nextProps.business.businessImage
      });
    }

  /**
    * Renders the BusinessUpdateForm Component
    * @return {jsx} jsx element to render
    * @memberof BusinessUpdateForm Component
    */
    render() {
      const { categories, locations, disableBtn } = this.props;
      const { business, imagePreviewUrl } = this.state;
      const {
        name, email, businessImage,
        location, category, address, telephoneNumber, homeNumber, description
      } = business;
      const businessCategories = categories;
      const categoryOptions = businessCategories !== undefined ?
        Array.from(businessCategories).map(businesscategory =>
        <option key={businesscategory} value={businesscategory}>{businesscategory}</option>) : null;

      const locationOptions = locations.map(businesslocation =>
        <option key={businesslocation} value={businesslocation}>{businesslocation}</option>);

      let imagePreview = null;
      if (imagePreviewUrl) {
        imagePreview = (<img className="responsive preview" src={imagePreviewUrl} />);
      } else {
        imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
      return (<div className="row ">
                <form onSubmit={this.handleUpdateSubmit}>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">
                        business_center
                      </i>
                      <label htmlFor="name">Business Name</label>
                      <input type="text" id="name" name="name" pattern="^[a-zA-Z0-9\s.\-]+$" title="should contain only alphabets" minLength="3" maxLength="50" value={name} onChange={this.onChange} className="validate"/>
                    </div>
                  </div>
                  <div className="row">
                    <Row>
                    <div className="input-field col s12">
                      <Input s={12} type="select" id="location" name="location" icon="location_on" value={location} onChange={this.onChange} >
                        <option value="null" disabled>
                          Choose your location
                        </option>
                        {locationOptions}
                      </Input>
                      {/* <label>Location</label> */}
                    </div>
                    <div className="input-field col s12">
                      <Input s={12} type="select" id="category" name="category" icon="business_center" value={category} onChange={this.onChange} >
                        <option value="null" disabled>
                          Choose your category
                        </option>
                        {businessCategories.length > 0 ? categoryOptions : <option value="loading" disabled>
                        Loading...
                      </option> }
                      </Input>
                      {/* <label>Category</label> */}
                    </div>
                    </Row>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">email</i>
                      <label htmlFor="email">Contact Email Address</label>
                      <input type="email" id="email" name="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" value={email} onChange={this.onChange} className="validate" />
                    </div>
                  </div>
                  <div style={{ marginLeft: '15px' }}><h5>Upload Business Image here</h5></div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">image</i>
                      <input type="file" id="businessImage" name="businessImage" onChange={this.onFileChange} accept="image/jpeg,image/png" className="validate" />
                      <p style={{ marginLeft: '45px', marginTop: '10px' }}>Max file Size is 3MB</p>
                    </div>
                  </div>
                  <div className="imgPreview">
                    {imagePreview}
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">location_on</i>
                      <label htmlFor="address">Business Address</label>
                      <input type="text" id="address" name="address" value={address} minLength="4" maxLength="50" onChange={this.onChange} className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="telephoneNumber">
                        Telephone Number
                      </label>
                      <input type="text" id="telephoneNumber" name="telephoneNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={telephoneNumber} onChange={this.onChange} className="validate" />
                    </div>
                    <div className="input-field col s12 m12 l6">
                      <i className="material-icons prefix">phone</i>
                      <label htmlFor="homeNumber">Home Number</label>

                      <input type="text" id="homeNumber" name="homeNumber" pattern="^[0-9]+$" minLength="7" maxLength="11" value={homeNumber} onChange={this.onChange} className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea className="materialize-textarea" id="description" name="description" value={description} minLength="20" maxLength="500" onChange={this.onChange} />
                      <label htmlFor="description">
                        Business Description
                      </label>
                    </div>
                  </div>
                  <br />
                  <div className="input-field">
                    <button type="submit" className="btn-large waves-effect waves-dark blue-grey darken-2 " disabled={disableBtn} onClick={this.handleUpdateSubmit} style={{ width: `${100}%` }}>
                      UPDATE BUSINESS DETAILS
                    </button>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col s12 m12 l6 offset-l3 center">
                      <h6>
                        <Link className="blue-grey-text darken-2 "to="/userProfile">
                          Go Back to Profile Page
                        </Link>
                      </h6>
                    </div>
                  </div>
                </form>
            </div>);
    }
}

BusinessUpdateForm.propTypes = {
  categories: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
};
