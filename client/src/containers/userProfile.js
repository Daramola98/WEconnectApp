import { connect } from 'react-redux';
import UserProfile from '../components/Users/UserProfile';
import { isLoggedIn } from '../store/actions/auth';
import { getUserBusinesses } from '../store/actions/users';
import { deleteBusiness } from '../store/actions/businesses';
import usersReducer from '../store/reducers';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  isLoggedIn(userDetails) {
    return dispatch(isLoggedIn(userDetails));
  },
  fetchUserBusinesses() {
    return dispatch(getUserBusinesses());
  },
  deleteBusiness(businessId) {
    return dispatch(deleteBusiness(businessId));
  }
});

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfileContainer;
