import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/NavBar/smart/Header.jsx';
import GuestNavBar from '../../components/NavBar/presentational/GuestNavBar.jsx';
import UserNavBar from '../../components/NavBar/presentational/UserNavBar.jsx';

describe('<Header />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header usersReducer={{ user: { firstname: 'Admin', email: 'd@live.com' }, authenticated: false } }/>);
  });

  it('should render the <GuestNavBar/> component if user is unauthenticated', () => {
    wrapper.setProps({ usersReducer: { user: { firstname: 'Admin', email: 'd@live.com' }, authenticated: false } });
    expect(wrapper.find(GuestNavBar)).toHaveLength(1);
    expect(wrapper.find(UserNavBar)).toHaveLength(0);
  });

  it('should render the <UserNavBar/> if the user is authenticated', () => {
    wrapper.setProps({ usersReducer: { user: { firstname: 'Admin', email: 'd@live.com' }, authenticated: true } });
    expect(wrapper.find(UserNavBar)).toHaveLength(1);
    expect(wrapper.find(GuestNavBar)).toHaveLength(0);
  });
});
