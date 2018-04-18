import { connect } from 'react-redux';
import UpdateBusiness from '../components/Businesses/smart/UpdateBusiness';
import { updateBusiness } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  updateBusiness(businessId, businessDetails) {
    return dispatch(updateBusiness(businessId, businessDetails));
  },
  logout() {
    return dispatch(logout());
  }
});

const UpdateBusinessContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateBusiness);

export default UpdateBusinessContainer;
