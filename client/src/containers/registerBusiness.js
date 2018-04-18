import { connect } from 'react-redux';
import RegisterBusiness from '../components/Businesses/smart/RegisterBusiness';
import { createBusiness } from '../store/actions/businesses';

const mapStateToProps = state => ({
  usersReducer: state.usersReducers
});

const mapDispatchToProps = dispatch => ({
  registerBusiness(businessDetails) {
    return dispatch(createBusiness(businessDetails));
  }
});

const RegisterBusinessContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterBusiness);

export default RegisterBusinessContainer;
