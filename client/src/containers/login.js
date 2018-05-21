import { connect } from 'react-redux';
import Login from '../components/Auth/Login.jsx';
import { login } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  login(userDetails) {
    return dispatch(login(userDetails));
  }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
