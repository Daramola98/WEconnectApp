import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'react-materialize';

/**
 * Class Representing a BusinessListing React Component
 *@class BusinessListing
 *@classdesc creates a React component- BusinessListing
 */
export default class BusinessListing extends React.Component {
  /**
    * @param {object} props props from parent class
    * @return {null} creates state and initalizes class variables
    * @memberof BusinessListing Component
    */
  constructor(props) {
    super(props);
    this.state = {
      searchBy: 'name',
      advancedSearch: '',
    };
  }

  /**
    * onChange Event handler callback for Advanced Search form field
    * @param {object} e the event object
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onAdvancedSearchChange = e =>
      this.setState({ advancedSearch: e.target.value });

  /**
    * onChange Event handler callback for Advanced search select field
    * @param {object} e the event object
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onSearchByChange = e =>
      this.setState({ searchBy: e.target.value });

  /**
    * onChange Event handler callback for pagination component
    * @param {object} pageNumber the page number
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onSearchChangePage = (pageNumber) => {
      this.props.searchBusiness(
        this.state.searchBy,
        this.state.advancedSearch, pageNumber
      )
        .then(() => this.setState({ searchCurrentPage: pageNumber }));
    }

  /**
    * Handles Search Form Submission
    * @param {object} e the event object
    *
    * @return {null} result of the search
    * @memberof BusinessListing Component
    */
    handleSearchSubmit = (e) => {
      e.preventDefault();
      this.setState({ businessPagination: 'hide', searchPagination: '' });
      this.props.searchBusiness(
        this.state.searchBy,
        this.state.advancedSearch, this.state.searchCurrentPage
      );
    }

  /**
   * @description - Dispatches redux actions to fetch businesses and business categories
   *
   * @return {void} no return or void
   */
    componentDidMount() {
      this.props.fetchBusinesses(this.state.currentPage);
      this.props.fetchCategories();
    }

  /**
    * Renders the BusinessListing Component
    * @return {jsx} jsx element to render
    * @memberof BusinessListing Component
    */
    render() {
      const { data, setBusinessProfile } = this.props;
      const businessCategories = data.categories;
      const { businessesCount } = this.props.data;
      const categoryOptions = businessCategories !== undefined ?
        Array.from(businessCategories).map(category =>
        <option key={category} value={category}>{category}</option>) : null;

      const locationOptions = this.props.locations.map(location =>
        <option key={location} value={location}>{location}</option>);
      let filteredBusinesses = data.businesses;
      if (filteredBusinesses.length > 0) {
        filteredBusinesses = filteredBusinesses
          .filter(business =>
            business.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
      }

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
              <form onSubmit={this.handleSearchSubmit}>
                <span className="col s12 l6 radio-btn">
                <input type="text" placeholder={`Search for Business By ${this.state.searchBy}`} name="advancedSearch" value={this.state.advancedSearch} onChange={this.onAdvancedSearchChange} required/>
                </span>
                <span className="col s12 l4">
                <Input name="searchBy" type="select" value={this.state.searchBy} onChange={this.onSearchByChange} >
                  <option value="name">
                    Search By Name
                  </option>
                  <option value="location">
                    Search By Location
                  </option>
                  <option value="category">
                    Search By Category
                  </option>
                </Input>
                </span>
                <span className="adSearch"><button type="submit" className="adSearch waves-effect waves-light btn blue ligthen-1">SEARCH</button></span>
              </form>
                <div className="input-field">
                  <span className="col s8 l8">
                    <i className="material-icons prefix">search</i>
                    <input type="text" name="search" value={this.state.search} onChange={this.onSearchChange} />
                    <label htmlFor="search">Filter Businesses</label>
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col l5">
                    <Input type="select" value={this.state.location} onChange={this.onLocationChange}>
                      <option value="null" disabled>
                        Filter By Location
                      </option>
                      {locationOptions}
                    </Input>
                  </div>
                  <div className="input-field col l5">
                    <Input type="select" value={this.state.category} onChange={this.onCategoryChange}>
                      <option value="null" disabled>
                        Filter By Category
                      </option>
                      {businessCategories.length > 0 ? categoryOptions : <option value="loading" disabled>
                        Loading...
                      </option> }
                    </Input>
                  </div>
                </div>
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
                  <td colSpan="3">NO BUSINESSES</td>
                </tr>}
              </tbody>
            </table>
          </div>
          <Pagination
           className={this.state.businessPagination}
           key={Date.now()} items={Math.ceil(businessesCount / 10) || 0 }
            activePage={this.state.currentPage} maxButtons={5}
            onSelect = {this.onChangePage}
             />
          <Pagination
           className={this.state.searchPagination}
           key={Date.now() + 1} items={Math.ceil(businessesCount / 10) || 0 }
            activePage={this.state.searchCurrentPage} maxButtons={5}
            onSelect = {this.onSearchChangePage}
             />
        </div>;
    }
}
