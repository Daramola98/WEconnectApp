import { connect } from 'react-redux';
import BusinessProfile from '../components/Businesses/BusinessProfile';
import { fetchBusiness } from '../store/actions/businesses';
import { fetchReviews, postReview, postReviewResponse } from '../store/actions/businessReview';

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
  },
  postReviewResponse(businessId, reviewId, review) {
    return dispatch(postReviewResponse(businessId, reviewId, review));
  }
});

const BusinessProfileContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);

export default BusinessProfileContainer;
