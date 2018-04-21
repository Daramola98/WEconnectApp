import { connect } from 'react-redux';
import BusinessListing from '../components/Businesses/smart/BusinessListing';
import { fetchBusinesses, searchBusiness, fetchCategories } from '../store/actions/businesses';

const mapStateToProps = state => ({
  data: state.businessesReducer
});

const mapDispatchToProps = dispatch => ({
  fetchBusinesses() {
    return dispatch(fetchBusinesses());
  },
  fetchCategories() {
    return dispatch(fetchCategories());
  },
  searchBusiness(searchBy, value) {
    return dispatch(searchBusiness(searchBy, value));
  }
});
const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessListing);

export default BusinessListContainer;
