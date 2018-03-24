import React from 'react';

/**
 *
 *@class BusinessListing
 *@classdesc creates a React component- BusinessListing
 */
export default class BusinessListing extends React.Component {
  /**
       * Creates a React Component
       * @return {jsx} Success message with the business created or error message
       * @memberof React Component
       */
  render() {
    return (
      <div class="container">
            <div class="row">
                <div class="col s12 offset-m2 m8 offset-l2 l8">
                    <form>
                        <div class="input-field">
                            <span class="col s8 l8">
                                <i class="material-icons prefix">search</i>
                                <input type="text" id="search"/>
                                <label for="search">Search For Businesses</label>
                            </span>
                            <span class="col s4 l4">
                                <button class="waves-effect waves-light btn blue lighten-1">Search</button>
                            </span>
                        </div>
                        <div class="row">
                            <div class="input-field col l5">
                                <i class="material-icons prefix">search</i>
                                <select class="">
                                    <option value="" disabled selected>Choose Location</option>
                                    <option value="lagos">Lagos</option>
                                    <option value="adamawa">Adamawa</option>
                                    <option value="abuja">Abuja</option>
                                </select>
                                <label>Filter By Location</label>
                            </div>
                            <div class="input-field col l5">
                                <i class="material-icons prefix">search</i>
                                <select id="category">
                                    <option value="" disabled selected>Choose Category</option>
                                    <option value="gaming">Gaming</option>
                                    <option value="technology">Technology</option>
                                    <option value="housing">Housing</option>
                                </select>
                                <label for="">Filter By Category</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <table class="bordered highlight centered responsive-table">
                <thead>
                    <tr>
                        <th>Business Name</th>
                        <th>Contact Email</th>
                        <th>Business Category</th>
                        <th>Location</th>
                        <th>Business Address</th>
                        <th>Telephone Number</th>
                        <th>Home Number</th>
                        <th>Business Description</th>
                        <th>Business Owner</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <a href="businessProfile.html">Clash of Clans</a>
                        </td>
                        <td>
                            <a href="mailto:daramola.ajiboye@live.com">daramola.ajiboye@live.com</a>
                        </td>
                        <td>Gaming</td>
                        <td>Lagos</td>
                        <td>235,Ikorodu Road, Epic Tower</td>
                        <td>07011031609</td>
                        <td>07011041809</td>
                        <td>Mobile Game for Collaboration and Competition</td>
                        <td>
                            <a href="userProfile.html">Ajiboye Daramola</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="businessProfile.html">Uber Driving</a>
                        </td>
                        <td>
                            <a href="mailto:daramola.ajiboye@live.com">daramola.ajiboye@live.com</a>
                        </td>
                        <td>Gaming</td>
                        <td>Lagos</td>
                        <td>235,Ikorodu Road, Epic Tower</td>
                        <td>07011031609</td>
                        <td>07011041809</td>
                        <td>Mobile Game for Collaboration and Competition</td>
                        <td>
                            <a href="userProfile.html">Ajiboye Daramola</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="businessProfile.html">Car Rentals</a>
                        </td>
                        <td>
                            <a href="mailto:daramola.ajiboye@live.com">daramola.ajiboye@live.com</a>
                        </td>
                        <td>Gaming</td>
                        <td>Lagos</td>
                        <td>235,Ikorodu Road, Epic Tower</td>
                        <td>07011031609</td>
                        <td>07011041809</td>
                        <td>Mobile Game for Collaboration and Competition</td>
                        <td>
                            <a href="userProfile.html">Ajiboye Daramola</a>
                        </td>
                    </tr>
                    <tr>
                        <td>xyz</td>
                        <td>abc</td>
                        <td>der</td>
                        <td>fre</td>
                        <td>hgjg</td>
                        <td>iure</td>
                        <td>sure</td>
                        <td>dare</td>
                        <td>goat</td>
                    </tr>
                </tbody>
            </table>
            <ul class="pagination">
                <li class="disabled">
                    <a href="#!">
                        <i class="material-icons">chevron_left</i>
                    </a>
                </li>
                <li class="active">
                    <a href="#!">1</a>
                </li>
                <li class="waves-effect">
                    <a href="#!">2</a>
                </li>
                <li class="waves-effect">
                    <a href="#!">3</a>
                </li>
                <li class="waves-effect">
                    <a href="#!">4</a>
                </li>
                <li class="waves-effect">
                    <a href="#!">5</a>
                </li>
                <li class="waves-effect">
                    <a href="#!">
                        <i class="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        </div>
    );
  }
}
