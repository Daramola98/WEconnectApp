import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserProfile from '../../components/Users/smart/UserProfile.jsx';
import UserProfileContainer from '../../containers/userProfile';
import Business from '../../components/Businesses/presentational/Business.jsx';

const mockStore = configureMockStore([thunk]);

let props;
const setup = () => {
  props = {
    locations: ['lagos', 'abuja'],
    history: { push: jest.fn() },
    fetchUserBusinesses: jest.fn(() => Promise.reject()),
    fetchUserBusinessesFailed: jest.fn(() => Promise.resolve()),
    isLoggedIn: jest.fn(() => Promise.resolve()),
    deleteBusiness: jest.fn(() => Promise.resolve()),
    logout: jest.fn(() => Promise.resolve()),
    usersReducer: {
      user: {
        firstname: 'Admin',
        email: 'weconnect@admin.com',
        userId: 'a790348m-dujk-4c52-9402-4e6d041c1b5a',
        lastname: 'Admin',
        username: 'Admin',
        telephoneNumber: '07011031688',
        homeNumber: null
      },
      businesses: [{
        name: 'Andela',
        location: 'Lagos',
        category: 'Technology',
        description: 'Nice Business'
      },
      {
        name: 'Andela Kenya',
        location: 'Bayelsa',
        category: 'Technology',
        description: 'Nice Business'
      }],
      businessesCount: 2,
      authenticated: false
    },
    handleSearchSubmit: jest.fn(() => Promise.resolve())
  };
  return shallow(<UserProfile { ...props } />);
};

let wrapper = setup();
const action = wrapper.instance();

describe('onSearchChange()', () => {
  it('should call onSearchChange', () => {
    const onSearchChange = jest.spyOn(wrapper.instance(), 'onSearchChange');
    action.onSearchChange('Andela');
    expect(onSearchChange).toBeCalled();
  });
});

describe('onPageChange()', () => {
  it('should call onPageChange', () => {
    const onPageChange = jest.spyOn(wrapper.instance(), 'onPageChange');
    action.onPageChange(1);
    expect(onPageChange).toBeCalled();
  });
});

describe('Should delete a business', () => {
  it('should handle delete click', () => {
    const onCloseMock = jest.fn();
    global.$ = () => ({
      modal: onCloseMock,
    });
    const deleteBusiness = wrapper.find('#deleteBusiness').simulate('click');
  });
});

describe('componentDidMount()', () => {
  it('should call componentDidMount', () => {
    const componentDidMount = jest.spyOn(wrapper.instance(), 'componentDidMount');
    action.componentDidMount();
    expect(componentDidMount).toBeCalled();
  });
});

describe('componentWillMount()', () => {
  it('should call componentWillMount', () => {
    const componentWillMount = jest.spyOn(wrapper.instance(), 'componentWillMount');
    action.componentWillMount();
    expect(componentWillMount).toBeCalled();
  });
});


describe('<UserProfile />', () => {
  it('should render the component', () => {
    wrapper = shallow(<UserProfile
        fetchUserBusinesses={jest.fn(() => Promise.resolve())}
        fetchUserBusinessesFailed={jest.fn(() => Promise.resolve())}
        usersReducer={{
            user: {
              firstname: 'Admin',
              email: 'weconnect@admin.com',
              userId: 'a790348m-dujk-4c52-9402-4e6d041c1b5a',
              lastname: 'Admin',
              username: 'Admin',
              telephoneNumber: '07011031688',
              homeNumber: null
            },
            businesses: [{
                name: 'Andela',
                location: 'Lagos',
                category: 'Technology',
                description: 'Nice Business'
              },
              {
                name: 'Andela Kenya',
                location: 'Bayelsa',
                category: 'Technology',
                description: 'Nice Business'
              }],
            businessesCount: 2,
            authenticated: true
          }}
        deleteBusiness={jest.fn(() => Promise.resolve())}
        logout={jest.fn(() => Promise.resolve())}
        />);
    expect(wrapper.find(Business)).toHaveLength(2);
  });
});

describe('<UserProfile />', () => {
  it('should render the component', () => {
    const store = mockStore({
      usersReducer: {
        user: {
          firstname: 'Admin',
          email: 'weconnect@admin.com',
          userId: 'a790348m-dujk-4c52-9402-4e6d041c1b5a',
          lastname: 'Admin',
          username: 'Admin',
          telephoneNumber: '07011031688',
          homeNumber: null
        },
        businesses: [{
          name: 'Andela',
          location: 'Lagos',
          category: 'Technology',
          description: 'Nice Business'
        },
        {
          name: 'Andela Kenya',
          location: 'Bayelsa',
          category: 'Technology',
          description: 'Nice Business'
        }],
        businessesCount: 2,
        authenticated: true
      }
    });
    wrapper = shallow(<UserProfileContainer store={store}
          fetchUserBusinesses={jest.fn(() => Promise.resolve())}
          fetchUserBusinessesFailed={jest.fn(() => Promise.resolve())}
          deleteBusiness={jest.fn(() => Promise.resolve())}
          logout={jest.fn(() => Promise.resolve())}
          />);
    expect(wrapper.length).toBe(1);
  });
});
