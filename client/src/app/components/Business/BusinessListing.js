import React from 'react';

/**
 *
 *@class BusinessListing
 *@classdesc creates a React component- BusinessListing
 */
export default class BusinessListing extends React.Component {
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
    handleSearchSubmit() {

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
        <div className="container">
            <div className="row">
                <div className="col s12 offset-m2 m8 offset-l2 l8">
                    <form onSubmit={this.handleSearchSubmit.bind(this)}>
                        <div className="input-field">
                            <span className="col s8 l8">
                                <i className="material-icons prefix">search</i>
                                <input type="text" ref="search"/>
                                <label htmlFor="search">Search For Businesses</label>
                            </span>
                            <span className="col s4 l4">
                                <button className="waves-effect waves-light btn blue lighten-1">Search</button>
                            </span>
                        </div>
                        <div className="row">
                            <div className="input-field col l5">
                                <i className="material-icons prefix">search</i>
                                <select ref="location">
                                    <option value="null" disabled>Choose Location</option>
                                    {locationOptions}
                                </select>
                                <label>Filter By Location</label>
                            </div>
                            <div className="input-field col l5">
                                <i className="material-icons prefix">search</i>
                                <select ref="category">
                                    <option value="null" disabled>Choose Category</option>
                                    {categoryOptions}
                                </select>
                                <label htmlFor="category">Filter By Category</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <table id="businessListing" className="bordered highlight centered">
                <thead>
                    <tr>
                        <th>Business Name</th>
                        <th>Business Category</th>
                        <th>Location</th>
                    </tr>
                </thead>

                <tbody>
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
      );
    }
}
