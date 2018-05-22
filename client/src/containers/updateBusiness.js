import { connect } from 'react-redux';
import UpdateBusiness from '../components/Businesses/smart/UpdateBusiness.jsx';
import { updateBusiness, fetchCategories } from '../store/actions/businesses';
import { logout } from '../store/actions/auth';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers,
  businesses: state.businessesReducer
});

const mapDispatchToProps = dispatch => ({
  updateBusiness(businessId, businessDetails) {
    return dispatch(updateBusiness(businessId, businessDetails));
  },
  fetchCategories() {
    return dispatch(fetchCategories());
  },
  logout() {
    return dispatch(logout());
  }
});

const UpdateBusinessContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateBusiness);

export default UpdateBusinessContainer;
