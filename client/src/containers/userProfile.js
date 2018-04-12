import { connect } from 'react-redux';
import UserProfile from '../components/Users/UserProfile';
import { isLoggedIn } from '../store/actions/auth';
import usersReducer from '../store/reducers';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  isLoggedIn(userDetails) {
    return dispatch(isLoggedIn(userDetails));
  }
});

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfileContainer;
