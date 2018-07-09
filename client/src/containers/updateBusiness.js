import { connect } from 'react-redux';
import UpdateBusiness from '../components/Businesses/smart/UpdateBusiness.jsx';
import { updateBusiness, fetchCategories, fetchBusiness } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';

/**
   * MapState to Props of Component
   * @param {object} state - The redux state information
   * @return {object} maps redux state to component props
   * @memberof updateBusinessContainer
   */
const mapStateToProps = state => ({
  usersReducer: state.usersReducers,
  businesses: state.businessesReducer,
  businessProfile: state.businessProfile
});

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof updateBusinessContainer
   */
const mapDispatchToProps = dispatch => ({
  updateBusiness(businessId, businessDetails) {
    return dispatch(updateBusiness(businessId, businessDetails));
  },
  fetchCategories() {
    return dispatch(fetchCategories());
  },
  fetchBusiness(businessId) {
    return dispatch(fetchBusiness(businessId));
  },
  logout() {
    return dispatch(logout());
  }
});

const UpdateBusinessContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateBusiness);

export default UpdateBusinessContainer;
