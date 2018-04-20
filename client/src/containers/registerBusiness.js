import { connect } from 'react-redux';
import RegisterBusiness from '../components/Businesses/smart/RegisterBusiness';
import { createBusiness } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  registerBusiness(businessDetails) {
    return dispatch(createBusiness(businessDetails));
  },
  logout() {
    return dispatch(logout());
  }
});

const RegisterBusinessContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterBusiness);

export default RegisterBusinessContainer;
