import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'react-materialize';
import Business from '../presentational/Business';

/**
 *
 *@class BusinessListing
 *@classdesc creates a React component- BusinessListing
 */
export default class BusinessListing extends React.Component {
  /**
    * Creates a React Component
    * @param {object} props message with the business created or error message
    * @return {null} Success message with the business created or error message
    * @memberof React Component
    */
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      search: '',
      location: 'null',
      category: 'null'
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
    * Creates a React Component
    * @param {object} e the register business page
    * @return {jsx} renders the register business page
    * @memberof React Component
    */
    onSearchChange = e =>
      this.setState({ search: e.target.value });

  /**
    * Creates a React Component
    * @param {object} e the register business page
    * @return {jsx} renders the register business page
    * @memberof React Component
    */
    onLocationChange = e =>
      this.setState({ location: e.target.value });

  /**
    * Creates a React Component
    * @param {object} e the register business page
    * @return {jsx} renders the register business page
    * @memberof React Component
    */
    onCategoryChange = e =>
      this.setState({ category: e.target.value });

  /**
    * Creates a React Component
    * @return {jsx} Success message with the business created or error message
    * @memberof React Component
    */
    componentDidMount() {
      this.props.fetchBusinesses();
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
      const { data, setBusinessProfile } = this.props;
      let filteredBusinesses = data.businesses
        .filter(business =>
          business.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
      if (this.state.location !== 'null' && this.state.category !== 'null') {
        filteredBusinesses = data.businesses
          .filter(business =>
            business.location.indexOf(this.state.location) !== -1
             && business.category.toLowerCase().indexOf(this.state.category.toLowerCase()) !== -1);
      }
      if (this.state.location !== 'null' && this.state.category === 'null') {
        filteredBusinesses = data.businesses
          .filter(business =>
            business.location.indexOf(this.state.location) !== -1);
      }
      if (this.state.location === 'null' && this.state.category !== 'null') {
        filteredBusinesses = data.businesses
          .filter(business =>
            business.category.toLowerCase().indexOf(this.state.category.toLowerCase()) !== -1);
      }
      return <div className="container">
          <div className="row">
            <div className="col s12 offset-m2 m8 offset-l2 l8">
              <form>
                <div className="input-field">
                  <span className="col s8 l8">
                    <i className="material-icons prefix">search</i>
                    <input type="text" name="search" value={this.state.search} onChange={this.onSearchChange} />
                    <label htmlFor="search">Search For Businesses</label>
                  </span>
                  <span className="col s4 l4">
                    <button className="waves-effect waves-light btn blue lighten-1">
                      Search
                    </button>
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col l5">
                    {/* <i className="material-icons prefix">search</i> */}
                    <Input type="select" value={this.state.location} onChange={this.onLocationChange}>
                      <option value="null" disabled>
                        Filter By Location
                      </option>
                      {locationOptions}
                    </Input>
                    {/* <label>Filter By Location</label> */}
                  </div>
                  <div className="input-field col l5">
                    {/* <i className="material-icons prefix">search</i> */}
                    <Input type="select" value={this.state.category} onChange={this.onCategoryChange}>
                      <option value="null" disabled>
                        Filter By Category
                      </option>
                      {categoryOptions}
                    </Input>
                    {/* <label htmlFor="category">Filter By Category</label> */}
                  </div>
                </div>
              </form>
              <div className="center">
                <a className="btn blue lighten-1" onClick={(e) => {
                    e.preventDefault();
                    this.setState({ location: 'null', category: 'null' });
                  }}>
                  Reset Filters
                </a>
              </div>
            </div>
          </div>
          <div id="businessTable">
            <table id="businessListing" className="bordered highlight centered">
              <thead>
                <tr>
                  <th>Business Name</th>
                  <th>Business Category</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {filteredBusinesses.length > 0 ? filteredBusinesses.map((business, i) => (
                  <Business business={business} key={i} />
                )) : <tr>
                  <td colspan="3">NO BUSINESSES</td>
                </tr>}
              </tbody>
            </table>
          </div>
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
        </div>;
    }
}
