import { connect } from 'react-redux';
import BusinessProfile from '../components/Businesses/BusinessProfile';
import { fetchBusiness } from '../store/actions/businesses';
import { fetchReviews, postReview } from '../store/actions/businessReview';

const mapStateToProps = state => ({
  businessProfile: state.businessProfile,
  user: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  fetchBusiness(businessId) {
    return dispatch(fetchBusiness(businessId));
  },
  fetchReviews(businessId) {
    return dispatch(fetchReviews(businessId));
  },
  postReview(businessId, review) {
    return dispatch(postReview(businessId, review));
  }
});

const BusinessProfileContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);

export default BusinessProfileContainer;
