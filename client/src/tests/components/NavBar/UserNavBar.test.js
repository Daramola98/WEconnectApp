import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import UserNavBar from '../../../components/NavBar/presentational/UserNavBar.jsx';

describe('<UserNavBar />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<UserNavBar logout={() => ({})} />);
    expect(wrapper.exists(<Link to="/" className="brand-logo">
    WEconnect
  </Link>)).toBe(true);
  });

  it('should logout when logout button is clicked', () => {
    const wrapper = shallow(<UserNavBar logout={() => ({})} />);
    expect(wrapper.find('#logout1').simulate('click'));
  });

  it('should logout when logout button is clicked', () => {
    const wrapper = shallow(<UserNavBar logout={() => ({})} />);
    expect(wrapper.find('#logout2').simulate('click'));
  });

  it('should logout when logout button is clicked', () => {
    const wrapper = shallow(<UserNavBar logout={() => ({})} />);
    expect(wrapper.find('#logout3').simulate('click'));
  });
});
