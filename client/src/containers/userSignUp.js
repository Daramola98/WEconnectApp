import { connect } from 'react-redux';
import SignUp from '../components/Auth/SignUp';
import { registerUser, signUp } from '../store/actions/users';
import { isLoggedIn } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducer
});

const mapDispatchToProps = dispatch => ({
  signUp(userDetails) {
    return dispatch(signUp(userDetails));
  },
  isLoggedIn(userDetails) {
    return dispatch(isLoggedIn(userDetails));
  }
});

const UserSignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default UserSignUpContainer;
