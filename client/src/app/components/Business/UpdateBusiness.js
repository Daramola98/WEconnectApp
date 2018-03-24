import React from 'react';

/**
 *
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class UpdateBusiness extends React.Component {
  /**
       * Creates a React Component
       * @return {jsx} Success message with the business created or error message
       * @memberof React Component
       */
  render() {
    return (
        <div className="row">
                <div className="col s12 m8 offset-m2 l8 offset-l2">
                    <div className="card">
                        <div className="card-action blue lighten-1 white-text center">
                            <h3>Update a Business</h3>
                        </div>
                        <div className="card-content">
                            <form action="">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">business_center</i>
                                        <label for="businessName">Business Name</label>
                                        <input type="text" id="businessName" className="validate" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m6 l6">
                                        <select required>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="abia">Abia</option>
                                            <option value="adamawa">Adamawa</option>
                                            <option value="lagos">Lagos</option>
                                        </select>
                                        <label>Location</label>
                                    </div>
                                    <div className="input-field col s12 m6 l6">
                                        <select required>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="estate">Estate Management</option>
                                            <option value="housing">Housing</option>
                                            <option value="technology">Technology</option>
                                        </select>
                                        <label>Category</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">email</i>
                                        <label for="user_mail">Contact Email Address</label>
                                        <input type="email" placeholder="johndoe@gmail.com" id="user_mail" className="validate" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">location_on</i>
                                        <label for="address">Business Address</label>
                                        <input type="text" placeholder="Enter Business Address" id="address" className="validate" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">phone</i>
                                        <label for="telephone">Telephone Number</label>
                                        <input type="number" id="telephone" className="validate" required />
                                    </div>
                                    <div className="input-field col s12 m12 l6">
                                        <i className="material-icons prefix">phone</i>
                                        <label for="home_number">Home Number</label>

                                        <input type="number" id="home_number" className="validate" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <i className="material-icons prefix">mode_edit</i>
                                        <textarea className="materialize-textarea" id="business_description" required> </textarea>
                                        <label for="business_description">Business Description</label>
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
