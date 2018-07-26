import { connect } from 'react-redux';
import BusinessListing from '../components/Businesses/smart/BusinessListing.jsx';
import { fetchBusinesses, searchBusiness, fetchCategories } from '../actions/businesses';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof businessListContainer
   */
const mapStateToProps = state => ({
  businessList: state.businessesReducer
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof businessListContainer
   */
const mapDispatchToProps = dispatch => ({
  fetchBusinesses(pageNumber) {
    return dispatch(fetchBusinesses(pageNumber));
  },
  fetchCategories() {
    return dispatch(fetchCategories());
  },
  searchBusiness(searchBy, value, pageNumber) {
    return dispatch(searchBusiness(searchBy, value, pageNumber));
  }
});
const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessListing);

export default BusinessListContainer;
