import React from 'react';
import { shallow } from 'enzyme';
import ContactUsForm from '../../../components/Forms/ContactUsForm';

describe('<ContactUsForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ContactUsForm submit={() => wrapper.setState({ submitted: true })} />);
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
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
      expect(wrapper.state().submitted).toEqual(true);
    });
  });
});
