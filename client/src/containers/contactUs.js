import { connect } from 'react-redux';
import ContactUs from '../components/Home/smart/ContactUs.jsx';
import { postContactUs } from '../actions/users';

/**
   * MapDispatch to Props of Component
   * @param {object} dispatch - The action dispatchers information
   * @return {object} maps action dispatchers to component props
   * @memberof contactUsContainer
   */
const mapDispatchToProps = dispatch => ({
  postContactUs(contactInfo) {
    return dispatch(postContactUs(contactInfo));
  },
});

const ContactUsContainer = connect(null, mapDispatchToProps)(ContactUs);

export default ContactUsContainer;
