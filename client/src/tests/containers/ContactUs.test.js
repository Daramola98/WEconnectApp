import React from 'react';
import { shallow } from 'enzyme';
import ContactUs from '../../components/Home/smart/ContactUs';
import Errors from '../../components/Messages/presentational/Errors';

describe('<ContactUs />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ContactUs />);
  });

  it('should render the <ContactUs /> component', () => {
    expect(wrapper.exists(<h3>Contact Us</h3>)).toBe(true);
  });

  it('should render the <Errors /> component if there are errors', () => {
    wrapper.setState({ errors: { message: ['Firstname is required'] } });
    expect(wrapper.find(Errors)).toHaveLength(1);
  });

  describe('Email input', () => {
    it('should respond to change event and change the state of the ContactUs Component', () => {
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        }
      });
      wrapper.find('#user_mail').simulate('change', { target: { name: 'email', value: 'blah@gmail.com' } });
      expect(wrapper.state().contactInfo.email).toEqual('blah@gmail.com');
    });
  });

  describe('FirstName input', () => {
    it('should respond to change event and change the state of the ContactUs Component', () => {
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        }
      });
      wrapper.find('#firstName').simulate('change', { target: { name: 'firstname', value: 'Daramola' } });
      expect(wrapper.state().contactInfo.firstname).toEqual('Daramola');
    });
  });

  describe('LastName input', () => {
    it('should respond to change event and change the state of the ContactUs Component', () => {
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        }
      });
      wrapper.find('#lastName').simulate('change', { target: { name: 'lastname', value: 'Ajiboye' } });
      expect(wrapper.state().contactInfo.lastname).toEqual('Ajiboye');
    });
  });

  describe('Message input', () => {
    it('should respond to change event and change the state of the ContactUs Component', () => {
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        }
      });
      wrapper.find('#contact-message').simulate('change', { target: { name: 'message', value: 'Thanks' } });
      expect(wrapper.state().contactInfo.message).toEqual('Thanks');
    });
  });

  describe('Contact Form Submit', () => {
    it('should respond to submit event and change the state of the ContactUs Component', () => {
      const fakeEvent = { preventDefault: () => console.log('preventDefault') };
      const then = { then: () => console.log('then') };
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        },
        submitted: false
      });
      wrapper.setProps({ postContactUs: () => { wrapper.setState({ submitted: true }); } });
      wrapper.find('form').simulate('submit', fakeEvent, then);
      expect(wrapper.state().contactInfo.message).toEqual('Thanks');
    });
  });
});
