import { connect } from 'react-redux';
import BusinessProfile from '../components/Businesses/smart/BusinessProfile';
import { fetchBusiness } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';
import { fetchReviews, postReview, postReviewResponse } from '../store/actions/businessReview';

const mapStateToProps = state => ({
  businessProfile: state.businessProfile,
  user: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  fetchBusiness(businessId) {
    return dispatch(fetchBusiness(businessId));
  },
  logout() {
    return dispatch(logout());
  },
  fetchReviews(businessId, pageNumber) {
    return dispatch(fetchReviews(businessId, pageNumber));
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
