import { connect } from 'react-redux';
import BusinessListing from '../components/Businesses/smart/BusinessListing';
import { fetchBusinesses, searchBusiness } from '../store/actions/businesses';

const mapStateToProps = state => ({
  data: state.businessesReducer
});

const mapDispatchToProps = dispatch => ({
  fetchBusinesses() {
    return dispatch(fetchBusinesses());
  },
  searchBusiness(searchBy, value) {
    return dispatch(searchBusiness(searchBy, value));
  }
});
const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessListing);

export default BusinessListContainer;
