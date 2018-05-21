import { connect } from 'react-redux';
import UserProfile from '../components/Users/smart/UserProfile.jsx';
import { isLoggedIn, logout } from '../store/actions/auth';
import { getUserBusinesses, fetchUserBusinessesFailed } from '../store/actions/users';
import { deleteBusiness } from '../store/actions/businesses';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  isLoggedIn(userDetails) {
    return dispatch(isLoggedIn(userDetails));
  },
  logout() {
    return dispatch(logout());
  },
  fetchUserBusinesses(pageNumber) {
    return dispatch(getUserBusinesses(pageNumber));
  },
  fetchUserBusinessesFailed() {
    return dispatch(fetchUserBusinessesFailed());
  },
  deleteBusiness(businessId) {
    return dispatch(deleteBusiness(businessId));
  }
});

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfileContainer;
