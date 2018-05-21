import { connect } from 'react-redux';
import RegisterBusiness from '../components/Businesses/smart/RegisterBusiness.jsx';
import { createBusiness, fetchCategories } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers,
  businesses: state.businessesReducer
});

const mapDispatchToProps = dispatch => ({
  registerBusiness(businessDetails) {
    return dispatch(createBusiness(businessDetails));
  },
  fetchCategories() {
    return dispatch(fetchCategories());
  },
  logout() {
    return dispatch(logout());
  }
});

const RegisterBusinessContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterBusiness);

export default RegisterBusinessContainer;
