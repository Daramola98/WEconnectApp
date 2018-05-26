import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import GuestNavBar from '../../../components/NavBar/presentational/GuestNavBar.jsx';

describe('<GuestNavBar />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<GuestNavBar />);
    expect(wrapper.exists(<Link to="/" className="brand-logo">
    WEconnect
  </Link>)).toBe(true);
  });
});
