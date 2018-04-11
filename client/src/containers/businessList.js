import { connect } from 'react-redux';
import BusinessListing from '../components/Businesses/BusinessListing';
import { fetchBusinesses, setBusinessProfile } from '../store/actions/businesses';

const mapStateToProps = state => ({
  data: state.businessesReducer
});

const mapDispatchToProps = dispatch => ({
  fetchBusinesses() {
    return dispatch(fetchBusinesses());
  },
  setBusinessProfile(businessId) {
    return dispatch(setBusinessProfile(businessId));
  }
});
const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessListing);

export default BusinessListContainer;
