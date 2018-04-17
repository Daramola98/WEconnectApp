import { connect } from 'react-redux';
import UpdateUser from '../components/Users/UpdateUser';
import { updateUser } from '../store/actions/users';
import { logout } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

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
