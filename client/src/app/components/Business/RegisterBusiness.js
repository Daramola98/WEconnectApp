import React from 'react';

/**
 *
 *@class RegisterBusiness
 *@classdesc creates a React component- RegisterBusiness
 */
export default class RegisterBusiness extends React.Component {
  /**
       * Creates a React Component
       * @return {jsx} renders the register business page
       * @memberof React Component
       */
  render() {
    return (
        <div class="row">
                <div class="col s12 m8 offset-m2 l8 offset-l2">
                    <div class="card">
                        <div class="card-action blue lighten-1 white-text center">
                            <h3>Register a Business</h3>
                        </div>
                        <div class="card-content">
                            <form action="">
                                <div class="row">
                                    <div class="input-field col s12 m12 l12">
                                        <i class="material-icons prefix">business_center</i>
                                        <label for="businessName">Business Name</label>
                                        <input type="text" id="businessName" class="validate" required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m6 l6">
                                        <select required>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="abia">Abia</option>
                                            <option value="adamawa">Adamawa</option>
                                            <option value="lagos">Lagos</option>
                                        </select>
                                        <label>Location</label>
                                    </div>
                                    <div class="input-field col s12 m6 l6">
                                        <select required>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="estate">Estate Management</option>
                                            <option value="housing">Housing</option>
                                            <option value="technology">Technology</option>
                                        </select>
                                        <label>Category</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m12 l12">
                                        <i class="material-icons prefix">email</i>
                                        <label for="user_mail">Contact Email Address</label>
                                        <input type="email" placeholder="johndoe@gmail.com" id="user_mail" class="validate" required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m12 l12">
                                        <i class="material-icons prefix">locatio_on</i>
                                        <label for="address">Business Address</label>
                                        <input type="text" placeholder="Enter Business Address" id="address" class="validate" required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m12 l6">
                                        <i class="material-icons prefix">phone</i>
                                        <label for="telephone">Telephone Number</label>
                                        <input type="number" id="telephone" class="validate" required/>
                                    </div>
                                    <div class="input-field col s12 m12 l6">
                                        <i class="material-icons prefix">phone</i>
                                        <label for="home_number">Home Number</label>

                                        <input type="number" id="home_number" class="validate"/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 m12 l12">
                                        <i class="material-icons prefix">mode_edit</i>
                                        <textarea class="materialize-textarea" id="business_description"> </textarea>
                                        <label for="business_description">Business Description</label>
                                    </div>
                                </div>
                                <br/>
                                <div class="input-field">
                                    <button type="submit" class="btn-large waves-effect waves-dark blue lighten-1" style={{ width: `${100}%` }}>REGISTER BUSINESS</button>
                                </div>
                                <br/>
                                <div class="row">
                                    <div class="col s12 m12 l6 offset-l3 center">
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
