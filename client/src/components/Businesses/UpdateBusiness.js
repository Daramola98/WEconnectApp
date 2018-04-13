import React from 'react';

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

    /**
    * Creates a React Component
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
    */
    handleUpdateSubmit() {

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

      return (
        <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2">
                <div className="card">
                    <div className="card-action blue lighten-1 white-text center">
                        <h3>Update a Business</h3>
                    </div>
                    <div className="card-content">
                    <form onSubmit={this.handleUpdateSubmit.bind(this)}>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">business_center</i>
                                <label htmlFor="name">Business Name</label>
                                <input type="text" ref="name" className="validate" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m6 l6">
                                <select ref="location"required>
                                    <option value="null" disabled >Choose your location</option>
                                    {locationOptions}
                                </select>
                                <label>Location</label>
                            </div>
                            <div className="input-field col s12 m6 l6">
                                <select ref="category" required>
                                    <option value="null" disabled >Choose your option</option>
                                    {categoryOptions}
                                </select>
                                <label>Category</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">email</i>
                                <label htmlFor="email">Contact Email Address</label>
                                <input type="email" placeholder="johndoe@gmail.com" ref="email" className="validate" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">location_on</i>
                                <label htmlFor="address">Business Address</label>
                                <input type="text" placeholder="Enter Business Address" ref="address" className="validate" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l6">
                                <i className="material-icons prefix">phone</i>
                                <label htmlFor="telephoneNumber">Telephone Number</label>
                                <input type="number" ref="telephoneNumber" className="validate" required />
                            </div>
                            <div className="input-field col s12 m12 l6">
                                <i className="material-icons prefix">phone</i>
                                <label htmlFor="homeNumber">Home Number</label>

                                <input type="number" ref="homeNumber" className="validate" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">mode_edit</i>
                                <textarea className="materialize-textarea" ref="description" required>
                                </textarea>
                                <label htmlFor="description">Business Description</label>
                            </div>
                        </div>
                        <br/>
                        <div className="input-field">
                            <button type="submit" className="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>UPDATE BUSINESS DETAILS</button>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col s12 m12 l6 offset-l3 center">
                                <h6>
                                    <a href="userProfile.html">Go Back to Profile Page</a>
                                </h6>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
      );
    }
}
