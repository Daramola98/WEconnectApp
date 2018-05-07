import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../components/Forms/SignUpForm';

describe('<SignUpForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUpForm submit={() => wrapper.setState({ submitted: true })} />);
  });

  describe('Firstname input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#firstname').simulate('change', { target: { name: 'firstname', value: 'Daramola' } });
      expect(wrapper.state().user.firstname).toEqual('Daramola');
    });
  });

  describe('Lastname input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#lastname').simulate('change', { target: { name: 'lastname', value: 'Ajiboye' } });
      expect(wrapper.state().user.lastname).toEqual('Ajiboye');
    });
  });

  describe('Username input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#username').simulate('change', { target: { name: 'username', value: 'Daramola98' } });
      expect(wrapper.state().user.username).toEqual('Daramola98');
    });
  });

  describe('Email input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'dara@gmail.com' } });
      expect(wrapper.state().user.email).toEqual('dara@gmail.com');
    });
  });

  describe('Password input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'passward' } });
      expect(wrapper.state().user.password).toEqual('passward');
    });
  });

  describe('TelephoneNumber input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#telephoneNumber').simulate('change', { target: { name: 'telephoneNumber', value: '08023112081' } });
      expect(wrapper.state().user.telephoneNumber).toEqual('08023112081');
    });
  });

  describe('HomeNumber input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#homeNumber').simulate('change', { target: { name: 'homeNumber', value: '08022235913' } });
      expect(wrapper.state().user.homeNumber).toEqual('08022235913');
    });
  });

  describe('ConfirmPassword input', () => {
    it('should respond to change event and change the state of the SignUpForm Component', () => {
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: ''
        }
      });
      wrapper.find('#confirmPassword').simulate('change', { target: { name: 'confirmPassword', value: 'passward' } });
      expect(wrapper.state().user.confirmPassword).toEqual('passward');
    });
  });

  describe('Catch Validation Error when password not equal to confirmPassword', () => {
    it('should respond to submit event and change the state if there are errors', () => {
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: 'daramola',
          confirmPassword: 'damilola',
          telephoneNumber: '',
          homeNumber: ''
        },
        errors: {
          confirmPassError: null
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
      expect(wrapper.exists(<span className="red-text">
      Passwords don't match
    </span>)).toBe(true);
    });
  });

  describe('SignUpForm Form Submit', () => {
    it('should respond to submit event and change the state of the SignUpForm Component', () => {
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        user: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          telephoneNumber: '',
          homeNumber: '08022235913'
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
      expect(wrapper.state().submitted).toEqual(true);
    });
  });
});
