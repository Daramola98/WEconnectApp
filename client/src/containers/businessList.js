import { connect } from 'react-redux';
import BusinessListing from '../components/Businesses/smart/BusinessListing';
import { fetchBusinesses, searchBusiness, fetchCategories } from '../store/actions/businesses';

const mapStateToProps = state => ({
  businesses: state.businessesReducer
});

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
