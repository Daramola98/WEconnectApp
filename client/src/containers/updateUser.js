import { connect } from 'react-redux';
import UpdateUser from '../components/Users/smart/UpdateUser.jsx';
import { updateUser } from '../actions/users';
import { logout } from '../actions/auth';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof updateUserContainer
   */
const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof updateUserContainer
   */
const mapDispatchToProps = dispatch => ({
  updateUser(userDetails) {
    return dispatch(updateUser(userDetails));
  },
  logout() {
    return dispatch(logout());
  }
});

const UpdateUserContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateUser);

export default UpdateUserContainer;
