import { connect } from 'react-redux';
import Header from '../components/NavBar/Header';
import { logout } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  logout() {
    return dispatch(logout());
  }
});

const navigationContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default navigationContainer;
