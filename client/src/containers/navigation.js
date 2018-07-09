import { connect } from 'react-redux';
import Header from '../components/NavBar/smart/Header.jsx';
import { logout } from '../store/actions/auth';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof navigationContainer
   */
const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof navigationContainer
   */
const mapDispatchToProps = dispatch => ({
  logout() {
    return dispatch(logout());
  }
});

const navigationContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default navigationContainer;
