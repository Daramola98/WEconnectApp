import React from 'react';

/**
 *
 *@class BusinessProfile
 *@classdesc creates a React component- BusinessProfile
 */
export default class BusinessProfile extends React.Component {
  /**
       * Creates a React Component
       * @return {jsx} renders the business profile page
       * @memberof React Component
       */
  render() {
    return (
      <div class="row">
          <div class="col s12 m8 offset-m2 l8 offset-l2">
            <div class="card">
                <div class="card-action blue lighten-1 white-text center">
                  <h3>Business Profile</h3>
                </div>
                <div class="card-content">
                  <div class="row">
                    <ul id="businessProfile" class="tabs">
                      <li class="tab tabs-fixed-width col s3 m3 l3">
                        <a class="active" href="#businessInfo">
                          <span class="truncate center blue-text text-lighten-1">Information</span>
                        </a>
                      </li>
                      <li class="tab tabs-fixed-width col s3 m3 l3">
                        <a href="#businessReviews">
                          <span class="truncate center blue-text text-lighten-1">Review</span>
                        </a>
                      </li>
                    </ul>
                    <div id="businessInfo" class="col s12 m12 l12 ">
                      <ul class="collection">
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">business_center</i>
                          <span class="title">
                            <h5>Business Name</h5>
                          </span>
                          <p>
                            <strong>Clash of Clans</strong>
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">email</i>
                          <span class="title">
                            <h5>Contact Email</h5>
                          </span>
                          <p>
                            <strong>daramola.ajiboye@live.com</strong>
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">phone</i>
                          <span class="title">
                            <h5>Telephone Number</h5>
                          </span>
                          <p>
                            <strong> 07011031609</strong>
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">phone</i>
                          <span class="title">
                            <h5>Office Phone</h5>
                          </span>
                          <p>
                            <strong>07011031608</strong>
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">business</i>
                          <span class="title">
                            <h5>Business Category</h5>
                          </span>
                          <p>
                           <strong>Gaming</strong>
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">location_on</i>
                          <span class="title">
                            <h5>Location</h5>
                          </span>
                          <p>
                           <strong>Lagos</strong>
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">directions</i>
                          <span class="title">
                            <h5>Business Address</h5>
                          </span>
                          <p>
                            <strong>235,Ikorodu Road, Epic Tower</strong>
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">business_center</i>
                          <span class="title">
                            <h5>Business Description</h5>
                          </span>
                          <p>
                            Mobile Game for Collaboration and Competition
                          </p>
                        </li>
                        <li class="collection-item avatar">
                          <i class="material-icons circle blue lighten-1">business_center</i>
                          <span class="title">
                            <h5>Business Owner</h5>
                          </span>
                          <p>
                            <a href="userProfile.html" class="waves-effect waves-light btn blue lighten-1">Ajiboye Daramola</a>
                          </p>
                        </li>
                      </ul>
                      </div>
                        <div id="businessReviews" class="col s12 m12 l12">
                          <div class="card">
                            <div class="card-content">
                              <form action="">
                                <div class="row">
                                  <div class="input-field col s12 m12 l12">
                                    <i class="material-icons prefix">account_circle</i>
                                    <label for="Username">Username</label>
                                    <input type="text" id="userName" value="Ajiboye Daramola" disabled/>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="input-field col s12 m12 l12">
                                  <i class="material-icons prefix">feedback</i>
                                  <textarea class="materialize-textarea" id="business_feedback"> </textarea>
                                  <label for="business_feedback">Give Feedback about Business</label>
                                  </div>
                                </div>
                                <div class="form-field">
                                  <button type="submit" class="btn-large waves-effect waves-dark blue lighten-1" style="width:100%;">POST REVIEW</button>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div class="card">
                            <div class="card-content">
                              <div>
                                <h5>
                                 <span class="blue-text text-lighten-1">Previous Reviews</span>
                                </h5>
                              </div>
                              <div>
                               <ul>
                                 <li>
                                  <i class="material-icons prefix">account_circle</i>
                                   <a href="userProfile.html">
                                    <span>Ajiboye Damilola</span>
                                   </a>
                                   <p>This business is awesome
                                      you guys should try
                                      it out you wont be dissapointed
                                  </p>
                                  <hr/>
                                 </li>
                                 <li>
                                   <i class="material-icons prefix">account_circle</i>
                                   <a href="userProfile.html">
                                     <span>Ajiboye Daramola</span>
                                   </a>
                                    <p>This business is
                                       bad skip it or you would be disappointed
                                    </p>
                                    <hr/>
                                 </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}
