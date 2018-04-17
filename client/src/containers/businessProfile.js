import { connect } from 'react-redux';
import BusinessProfile from '../components/Businesses/BusinessProfile';
import { fetchBusiness } from '../store/actions/businesses';

const mapStateToProps = state => ({
  businessProfile: state.businessProfile,
  user: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  fetchBusiness(businessId) {
    return dispatch(fetchBusiness(businessId));
  }
});

const BusinessProfileContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);

export default BusinessProfileContainer;
