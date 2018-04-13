import { connect } from 'react-redux';
import BusinessListing from '../components/Businesses/BusinessListing';
import { fetchBusinesses } from '../store/actions/businesses';

const mapStateToProps = state => ({
  data: state.businessesReducer
});

const mapDispatchToProps = dispatch => ({
  fetchBusinesses() {
    return dispatch(fetchBusinesses());
  }
});
const BusinessListContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessListing);

export default BusinessListContainer;
