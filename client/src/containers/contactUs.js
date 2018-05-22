import { connect } from 'react-redux';
import ContactUs from '../components/Home/smart/ContactUs.jsx';
import { postContactUs } from '../store/actions/users';

const mapDispatchToProps = dispatch => ({
  postContactUs(contactInfo) {
    return dispatch(postContactUs(contactInfo));
  },
});

const ContactUsContainer = connect(null, mapDispatchToProps)(ContactUs);

export default ContactUsContainer;
