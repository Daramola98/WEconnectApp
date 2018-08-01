import React from 'react';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import SignUpContainer from '../../containers/userSignUp';
import SignUp from '../../components/Auth/SignUp.jsx';
import SignUpForm from '../../components/Forms/SignUpForm.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;
const setup = () => {
  props = {
    history: { push: jest.fn() },
    signUp: jest.fn(() => Promise.reject()),
    isLoggedIn: jest.fn(() => Promise.resolve()),
    usersReducer: {
      authenticated: true
    },
  };
  return shallow(<SignUp { ...props } />);
};

const wrapper = setup();
const action = wrapper.instance();
describe('Component: SignUp', () => {
  it('it should render review signup form', () => {
    expect(wrapper.exists(<h3>Sign Up</h3>)).toBe(true);
  });
});

describe('componentWillMount()', () => {
  it('should call componentWillMount', () => {
    const componentWillMount = jest.spyOn(wrapper.instance(), 'componentWillMount');
    action.componentWillMount();
    expect(componentWillMount).toBeCalled();
  });
});

describe('Submit function', () => {
  it('should submit business information', () => {
    const fakeEvent = { preventDefault: () => ({}) };
    const SignUpForms = wrapper.find(SignUpForm);
    wrapper.setState({
      user: {
        firstname: 'Admin',
        email: 'weconnect@admin.com',
        userId: 'a790348m-dujk-4c52-9402-4e6d041c1b5a',
        lastname: 'Admin',
        username: 'Admin',
        telephoneNumber: '07011031688',
        homeNumber: null
      },
    });

    SignUpForms.simulate('submit', fakeEvent);
  });
});

describe('onSubmit()', () => {
  it('should call onSubmit', () => {
    const onSubmit = jest.spyOn(wrapper.instance(), 'onSubmit');
    action.onSubmit({ name: 'dara' });
    expect(onSubmit).toBeCalled();
  });
});

describe('onSubmit() reject', () => {
  const setup2 = () => {
    props = {
      history: { push: jest.fn() },
      signUp: jest.fn(() => Promise.resolve()),
      isLoggedIn: jest.fn(() => Promise.resolve()),
      usersReducer: {
        authenticated: true
      },
    };
    return shallow(<SignUp {...props} />);
  };
  const wrapper2 = setup2();
  const action2 = wrapper2.instance();
  it('should call onSubmit', () => {
    const onSubmit = jest.spyOn(wrapper2.instance(), 'onSubmit');
    action2.onSubmit({ name: 'dara' });
    expect(onSubmit).toBeCalled();
  });
});

describe('<SignUpContainer />', () => {
  const store = mockStore({
    usersReducer: {
      authenticated: false
    }
  });
  const wrapper3 = shallow(<SignUpContainer store={store}
            {...props}
            />);
  it('should render the component', () => {
    expect(wrapper3.length).toBe(1);
  });
});

