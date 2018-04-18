import { connect } from 'react-redux';
import UpdateBusiness from '../components/Businesses/smart/UpdateBusiness';
import { updateBusiness } from '../store/actions/businesses';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  updateBusiness(businessId, businessDetails) {
    return dispatch(updateBusiness(businessId, businessDetails));
  }
});

const UpdateBusinessContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateBusiness);

export default UpdateBusinessContainer;
