import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../components/Forms/LoginForm.jsx';

describe('<LoginForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginForm submit={() => wrapper.setState({ submitted: true })} />);
  });

  describe('Email input', () => {
    it('should respond to change event and change the state of the LoginForm Component', () => {
      wrapper.setState({
        credentials: {
          email: '',
          password: ''
        }
      });
      wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'dara@gmail.com' } });
      expect(wrapper.state().credentials.email).toEqual('dara@gmail.com');
    });
  });

  describe('Password input', () => {
    it('should respond to change event and change the state of the LoginForm Component', () => {
      wrapper.setState({
        credentials: {
          email: '',
          password: ''
        }
      });
      wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'passward' } });
      expect(wrapper.state().credentials.password).toEqual('passward');
    });
  });

  describe('LoginForm Form Submit', () => {
    it('should respond to submit event and change the state of the LoginForm Component', () => {
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        credentials: {
          email: '',
          password: ''
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
      expect(wrapper.state().submitted).toEqual(true);
    });
  });
});
