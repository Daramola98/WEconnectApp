import { connect } from 'react-redux';
import RegisterBusiness from '../components/Businesses/smart/RegisterBusiness.jsx';
import { createBusiness, fetchCategories } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof registerBusinessContainer
   */
const mapStateToProps = state => ({
  usersReducer: state.usersReducers,
  businesses: state.businessesReducer
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof registerBusinessContainer
   */
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
