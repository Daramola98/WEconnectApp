import { connect } from 'react-redux';
import SignUp from '../components/Auth/SignUp';
import { registerUser } from '../actions/users';

const mapStateToProps = state => ({
  usersReducer: state.usersReducer
});

const mapDispatchToProps = dispatch => ({
  registerUser(userDetails) {
    return dispatch(registerUser(userDetails));
  }
});

const UserSignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default UserSignUpContainer;
