import { connect } from 'react-redux';
import UpdateUser from '../components/Users/UpdateUser';
import { updateUser } from '../store/actions/users';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  updateUser(userDetails) {
    return dispatch(updateUser(userDetails));
  }
});

const UpdateUserContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateUser);

export default UpdateUserContainer;
