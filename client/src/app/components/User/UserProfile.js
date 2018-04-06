import React from 'react';

/**
 *
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class UserProfile extends React.Component {
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
                            <h3>My Profile</h3>
                        </div>
                        <div className="card-content">
                        <div className="row">
                        <ul id="businessProfile" className="tabs">
                            <li className="tab tabs-fixed-width col s3 m3 l5">
                                <a className="active" href="#personalInfo">
                                    <span className="truncate center blue-text text-lighten-1">Information</span>
                                </a>
                            </li>
                            <li className="tab tabs-fixed-width col s3 m3 l5">
                                <a href="#businesses">
                                    <span className="truncate center blue-text text-lighten-1">Businesses</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                            <ul className="collection">
                                <li className="collection-item avatar">
                                    <i className="material-icons circle blue lighten-1">account_circle</i>
                                    <span className="title">
                                        <h5>Full Name</h5>
                                    </span>
                                    <p>
                                        Ajiboye Daramola
                                    </p>
                                </li>
                                <li className="collection-item avatar">
                                    <i className="material-icons circle blue lighten-1">email</i>
                                    <span className="title">
                                        <h5>Email</h5>
                                    </span>
                                    <p>
                                        daramola.ajiboye@live.com
                                    </p>
                                </li>
                                <li className="collection-item avatar">
                                    <i className="material-icons circle blue lighten-1">phone</i>
                                    <span className="title">
                                        <h5>Telephone Number</h5>
                                    </span>
                                    <p>
                                        07011031609
                                    </p>
                                </li>
                                <li className="collection-item avatar">
                                    <i className="material-icons circle blue lighten-1">business_center</i>
                                    <span className="title">
                                        <h5>My Businesses</h5>
                                    </span>
                                    <br/>
                                    <div className="row">
                                        <div className="col s12 m12 align-centre">
                                    <ul className="collapsible popout" data-collapsible="accordion">
                                        <li>
                                            <div className="collapsible-header">
                                                <i className="material-icons prefix">account_circle</i>
                                                Clash of Clans
                                            </div>

                                            <div className="collapsible-body center">
                                                <span>
                                                    <a href="businessProfile.html" className="waves-effect waves-light btn">View Business Profile</a>
                                                </span>
                                                <br/>
                                                <br/>
                                                <span>
                                                    <a href="updateBusiness.html" className="waves-effect waves-light btn">Update Business Profile</a>
                                                </span>
                                                <br/>
                                                <br/>
                                                <span>
                                                    <a href="/delete/business" className="waves-effect waves-light btn">Delete Business Profile</a>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="collapsible-header">
                                                <i className="material-icons">place</i>
                                                Uber Driving
                                            </div>
                                            <div className="collapsible-body center">
                                                <span>
                                                    <a href="businessProfile.html" className="waves-effect waves-light btn">View Business Profile</a>
                                                </span>
                                                <br/>
                                                <br/>
                                                <span>
                                                    <a href="updateBusiness.html" className="waves-effect waves-light btn">Update Business Profile</a>
                                                </span>
                                                <br/>
                                                <br/>
                                                <span>
                                                    <a href="#" className="waves-effect waves-light btn">Delete Business Profile</a>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="collapsible-header">
                                                <i className="material-icons prefix">directions_car</i>
                                                Car rentals
                                            </div>
                                            <div className="collapsible-body center">
                                                <span>
                                                    <a href="businessProfile.html" className="waves-effect waves-light btn">View Business Profile</a>
                                                </span>
                                                <br/>
                                                <br/>
                                                <span>
                                                    <a href="updateBusiness.html" className="waves-effect waves-light btn">Update Business Profile</a>
                                                </span>
                                                <br/>
                                                <br/>
                                                <span>
                                                    <a href="#" className="waves-effect waves-light btn">Delete Business Profile</a>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>

                                    </div>
                                    </div>
                                </li>
                            </ul>
                            <div id="businesses">
                                <table className="bordered highlight centered center">
                                    <thead>
                                        <tr>
                                            <th>Business Name</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                Clash of Clans
                                            </td>
                                            <td><a href="businessProfile.html" className="">VIEW</a></td>
                                            <td><a href="updateBusiness.html" className="">UPDATE</a></td>
                                            <td>
                                              <a href="" className="">DELETE</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Uber Driving
                                            </td>
                                            <td><a href="businessProfile.html" className="">VIEW</a></td>
                                            <td><a href="updateBusiness.html" className="">UPDATE</a></td>
                                            <td>
                                              <a href="updateBusiness.html" className="">DELETE</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Car Rentals
                                            </td>
                                            <td><a href="businessProfile.html" className="">VIEW</a></td>
                                            <td><a href="updateBusiness.html" className="">UPDATE</a></td>
                                            <td>
                                              <a href="updateBusiness.html" className="">DELETE</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <ul className="pagination">
                                        <li className="disabled">
                                            <a href="#!">
                                                <i className="material-icons">chevron_left</i>
                                            </a>
                                        </li>
                                        <li className="active">
                                            <a href="#!">1</a>
                                        </li>
                                        <li className="waves-effect">
                                            <a href="#!">2</a>
                                        </li>
                                        <li className="waves-effect">
                                            <a href="#!">3</a>
                                        </li>
                                        <li className="waves-effect">
                                            <a href="#!">4</a>
                                        </li>
                                        <li className="waves-effect">
                                            <a href="#!">5</a>
                                        </li>
                                        <li className="waves-effect">
                                            <a href="#!">
                                                <i className="material-icons">chevron_right</i>
                                            </a>
                                        </li>
                                    </ul>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
    );
  }
}
