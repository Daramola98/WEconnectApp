import { connect } from 'react-redux';
import SignUp from '../components/Auth/SignUp.jsx';
import { registerUser, signUp } from '../actions/users';
import { isLoggedIn } from '../actions/auth';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof userSignUpContainer
   */
const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof userSignUpContainer
   */
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
