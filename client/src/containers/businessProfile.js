import { connect } from 'react-redux';
import BusinessProfile from '../components/Businesses/BusinessProfile';
import { setBusinessProfile } from '../store/actions/businesses';

const mapStateToProps = state => ({
  businessProfile: state.businessProfile
});

const mapDispatchToProps = dispatch => ({
  setBusinessProfile(businessId) {
    return dispatch(setBusinessProfile(businessId));
  }
});

const BusinessProfileContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);

export default BusinessProfileContainer;
