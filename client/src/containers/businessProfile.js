import { connect } from 'react-redux';
import BusinessProfile from '../components/Businesses/smart/BusinessProfile.jsx';
import { fetchBusiness } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';
import { fetchReviews, postReview, updateReview, deleteReview, postReviewResponse } from '../store/actions/businessReview';

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
  updateReview(businessId, reviewId, review) {
    return dispatch(updateReview(businessId, reviewId, review));
  },
  deleteReview(businessId, reviewId) {
    return dispatch(deleteReview(businessId, reviewId));
  },
  postReviewResponse(businessId, reviewId, review) {
    return dispatch(postReviewResponse(businessId, reviewId, review));
  }
});

const BusinessProfileContainer = connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);

export default BusinessProfileContainer;
