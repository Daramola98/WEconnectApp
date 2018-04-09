import { connect } from 'react-redux';
import BusinessListing from '../components/Businesses/BusinessListing';
import { fetchBusinesses, setBusinessProfile } from '../actions/businesses';

const mapStateToProps = state => ({
  data: state.businessesReducer
});

const mapDispatchToProps = dispatch => ({
  fetchBusinesses() {
    return dispatch(fetchBusinesses());
  },
  setBusinessProfile(business) {
    return dispatch(setBusinessProfile(business));
  }
});
const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessListing);

export default BusinessListContainer;
