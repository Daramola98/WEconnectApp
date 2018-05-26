import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from '../../../components/Home/presentational/AboutUs.jsx';

describe('<AboutUs />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.exists(<h4>About WECONNECT</h4>)).toBe(true);
  });
});
