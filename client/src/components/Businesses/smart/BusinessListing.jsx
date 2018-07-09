import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Row, Pagination, PaginationButton, SideNav, SideNavItem, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import Business from '../presentational/Business.jsx';
import Loader from '../../General/Loader.jsx';

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
      loader: 'false',
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
      this.setState({ loader: true });
      this.props.fetchBusinesses(this.state.currentPage)
        .then(() => this.setState({ loader: false }));
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
      return <div className="">
        <section id="search" className="section section-search white-text center">
          <div className="container">
            <div className="row">
                <h3 className="white-text">Search Businesses</h3>
                <form id="searchform" onSubmit={this.handleSearchSubmit}>
                  <select name="searchBy" value={this.state.searchBy} onChange={this.onSearchByChange} className="search-select blue-grey darken-2 browser-default">
                    <option className="option" value="" disabled>Choose your option</option>
                    <option value="category">Category</option>
                    <option value="location">Location</option>
                    <option value="name">Name</option>
                  </select>
                  <input id="businessSearch"
                    className="white grey-text autocomplete"
                    type="text"
                    placeholder={`Search for Business By ${this.state.searchBy}`}
                    name="advancedSearch"
                    value={this.state.advancedSearch}
                    onChange={this.onAdvancedSearchChange}
                    required/>
                    <button id="searchSubmitBtn" type="submit" className="waves-effect waves-light blue-grey darken-2"><i className="fa fa-search"></i></button>
              </form>
              </div>
            </div>
        </section>
          {this.state.loader ? <Loader size={'100px'}/> : <div>
            <section id="businessTable" className="section section-popular">
            <div className="container">
             <div className="row">
          {filteredBusinesses.length > 0 ? filteredBusinesses.map((business, i) => (
                  <Business business={business} key={i} />
                )) : <div>
                  <h1 className="no-business col l6 offset-l3 blue darken-2 white-text">NO BUSINESSES</h1>
                </div>}
             </div>
            </div>
          </section>
          <div className="container paginate">
          <Pagination
           className={this.state.businessPagination}
           key={Date.now()} items={Math.ceil(businessesCount / 9) || 0 }
            activePage={this.state.currentPage} maxButtons={5}
            onSelect = {this.onChangePage}
             />
          <Pagination
           className={this.state.searchPagination}
           key={Date.now() + 1} items={Math.ceil(businessesCount / 9) || 0 }
            activePage={this.state.searchCurrentPage} maxButtons={5}
            onSelect = {this.onSearchChangePage}
             />
             </div>
            </div> }
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
