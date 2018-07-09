import { connect } from 'react-redux';
import Login from '../components/Auth/Login.jsx';
import { login } from '../store/actions/auth';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof loginContainer
   */
const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof loginContainer
   */
const mapDispatchToProps = dispatch => ({
  login(userDetails) {
    return dispatch(login(userDetails));
  }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
