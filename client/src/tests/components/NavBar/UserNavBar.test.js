import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import UserNavBar from '../../../components/NavBar/presentational/UserNavBar';

describe('<UserNavBar />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<UserNavBar />);
    expect(wrapper.exists(<Link to="/" className="brand-logo">
    WEconnect
  </Link>)).toBe(true);
  });
});
