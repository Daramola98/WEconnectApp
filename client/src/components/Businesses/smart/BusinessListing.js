import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader';
import { Input, Pagination, PaginationButton, SideNav, SideNavItem, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import Business from '../presentational/Business';
import spinner from '../../../../public/images/loader.gif';

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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      search: '',
      searchBy: 'name',
      advancedSearch: '',
      loader: 'show',
      location: 'null',
      category: 'null',
      currentPage: 1,
      searchCurrentPage: 1,
      searchPagination: 'hide',
      businessPagination: ''
    };
    this.searchBy = '';
    this.advancedSearch = '';
  }


    static defaultProps = {
      locations: [
        'ABIA', 'ABUJA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE', 'BORNO',
        'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU', 'GOMBE', 'IMO', 'JIGAWA',
        'KADUNA', 'KANO', 'KATSINA', 'KEBBI', 'KOGI', 'KWARA', 'LAGOS', 'NASSARAWA', 'NIGER', 'OGUN', 'ONDO',
        'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA'
      ]
    }

  /**
    * onChange Event handler callback for Advanced Search form field
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onAdvancedSearchChange = event =>
      this.setState({ advancedSearch: event.target.value });

  /**
    * onChange Event handler callback for Filter Business Search field
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onSearchChange = event =>
      this.setState({ search: event.target.value });

  /**
    * onChange Event handler callback for Advanced search select field
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onSearchByChange = event =>
      this.setState({ searchBy: event.target.value });

  /**
    * onChange Event handler callback for location filter
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onLocationChange = event =>
      this.setState({ location: event.target.value });

  /**
    * onChange Event handler callback for location filter
    * @param {object} event the event object
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onCategoryChange = event =>
      this.setState({ category: event.target.value });

  /**
    * onChange Event handler callback for pagination component
    * @param {object} pageNumber the page number
    *
    * @return {null} updates the state of the BusinessListing component
    * @memberof BusinessListing Component
    */
    onChangePage = (pageNumber) => {
      this.props.fetchBusinesses(pageNumber)
        .then(() => this.setState({ currentPage: pageNumber }));
    }

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
    * @param {object} event the event object
    *
    * @return {null} result of the search
    * @memberof BusinessListing Component
    */
    handleSearchSubmit = (event) => {
      event.preventDefault();
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
      this.props.fetchBusinesses(this.state.currentPage)
        .then(() => this.setState({ loader: 'hide' }));
      this.props.fetchCategories();
    }

  /**
    * Renders the BusinessListing Component
    * @return {jsx} jsx element to render
    * @memberof BusinessListing Component
    */
    render() {
      const { businesses } = this.props;
      const businessCategories = businesses.categories;
      const { businessesCount } = this.props.businesses;
      const categoryOptions = businessCategories !== undefined ?
        Array.from(businessCategories).map(category =>
        <option key={category} value={category}>{category}</option>) : null;

      const locationOptions = this.props.locations.map(location =>
        <option key={location} value={location}>{location}</option>);
      let filteredBusinesses = businesses.businesses;
      if (filteredBusinesses.length > 0) {
        filteredBusinesses = filteredBusinesses
          .filter(business =>
            business.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
      }

      if (this.state.location !== 'null' && this.state.category !== 'null') {
        filteredBusinesses = businesses.businesses
          .filter(business =>
            business.location.indexOf(this.state.location) !== -1
             && business.category.toLowerCase().indexOf(this.state.category.toLowerCase()) !== -1);
      }

      if (this.state.location !== 'null' && this.state.category === 'null') {
        filteredBusinesses = businesses.businesses
          .filter(business =>
            business.location.indexOf(this.state.location) !== -1);
      }

      if (this.state.location === 'null' && this.state.category !== 'null') {
        filteredBusinesses = businesses.businesses
          .filter(business =>
            business.category.toLowerCase().indexOf(this.state.category.toLowerCase()) !== -1);
      }
      const options = {
        lines: 13,
        length: 20,
        width: 10,
        radius: 30,
        scale: 1.00,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
      };
      return <div className="">
      <div className="row">
          <div id="searchbusiness" className="col s6">
            <div className="row">
              <form onSubmit={this.handleSearchSubmit}>
                <span className="col s12 l4 radio-btn">
                <input type="text" placeholder={`Search for Business By ${this.state.searchBy}`} name="advancedSearch" value={this.state.advancedSearch} onChange={this.onAdvancedSearchChange} required/>
                </span>
                <span className="col s12 m6 l4">
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
                <span className="col s12 m6 l4"><button type="submit" className="radio-btn waves-effect waves-light btn blue ligthen-1">SEARCH</button></span>
              </form>
              </div>
            </div>
            <div id="filterbusiness" className="col s6">
          <div>
          <input type="text" name="search" value={this.state.search} placeholder="Filter Businesses by Name" onChange={this.onSearchChange} />
          </div>
          <div className="">
            <Input type="select" value={this.state.location} onChange={this.onLocationChange}>
              <option value="null" disabled>
                Filter By Location
                      </option>
              {locationOptions}
            </Input>
          </div>
          <div className="">
            <Input type="select" value={this.state.category} onChange={this.onCategoryChange}>
              <option value="null" disabled>
                Filter By Category
              </option>
              {businessCategories.length > 0 ? categoryOptions : <option value="loading" disabled>
                Loading...
              </option>}
            </Input>
          </div>
          <div className="">
            <a className="btn radio-btn blue lighten-1" onClick={(event) => {
              event.preventDefault();
              this.setState({ location: 'null', category: 'null' });
            }}>
              Reset Filters
                </a>
          </div>
        </div>
          </div>
          <hr/>
          <div id="businessTable" className="row">
          <div>
            <img className={this.state.loader} src={spinner} />
          </div>
          <div className={!this.state.loader}>
          {filteredBusinesses.length > 0 ? filteredBusinesses.map((business, i) => (
                  <Business business={business} key={i} />
                )) : <div>
                  <h1>NO BUSINESSES</h1>
                </div>}
          </div>
            {/* <table id="businessListing" className="bordered highlight centered">
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
            </table> */}
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

BusinessListing.propTypes = {
  businesses: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  searchBusiness: PropTypes.func.isRequired,
  fetchBusinesses: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};
