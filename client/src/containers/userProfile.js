import { connect } from 'react-redux';
import UserProfile from '../components/Users/smart/UserProfile.jsx';
import { isLoggedIn, logout } from '../store/actions/auth';
import { getUserBusinesses, fetchUserBusinessesFailed } from '../store/actions/users';
import { deleteBusiness } from '../store/actions/businesses';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof userProfileContainer
   */
const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof userProfileContainer
   */
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
