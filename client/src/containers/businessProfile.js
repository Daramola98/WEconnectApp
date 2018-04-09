import { connect } from 'react-redux';
import BusinessProfile from '../components/Businesses/BusinessProfile';

const mapStateToProps = state => ({
  businessProfile: state.businessProfile
});

const BusinessProfileContainer = connect(mapStateToProps)(BusinessProfile);

export default BusinessProfileContainer;
