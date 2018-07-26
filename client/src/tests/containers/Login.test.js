import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from '../../components/Auth/Login.jsx';
import LoginContainer from '../../containers/login';
import LoginForm from '../../components/Forms/LoginForm.jsx';

const mockStore = configureMockStore([thunk]);

describe('<Login />', () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({
      usersReducers: {
        user: {
          firstname: 'Admin'
        },
        authenticated: false
      },
    });
    wrapper = mount(<Login
      usersReducer={{ authenticated: false }}
      history={{ push: jest.fn() }}
      login={() => wrapper.setState({ submitted: true })} />);
  });

  it('should render the container component', () => {
    store = mockStore({
      usersReducers: {
        user: {
          firstname: 'Admin'
        },
        authenticated: false
      },
    });
    wrapper = mount(<Provider store={store}>
        <LoginContainer
        history={{ push: jest.fn() }}
        login={() => wrapper.setState({ submitted: true })} />
      </Provider>);

    expect(wrapper.find(LoginContainer)).toHaveLength(1);
    const container = wrapper.find(LoginContainer);
    expect(container.find(LoginForm)).toHaveLength(1);
  });

  it('should not render the <Login /> component', () => {
    wrapper = mount(<Login
      usersReducer={{ authenticated: true }}
      history={{ push: jest.fn() }}
      login={() => wrapper.setState({ submitted: true })} />);
  });

  it('should render the <Login /> component', () => {
    expect(wrapper.exists(<h3>Login</h3>)).toBe(true);
  });

  it('should render the <LoginForm /> component', () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
});

