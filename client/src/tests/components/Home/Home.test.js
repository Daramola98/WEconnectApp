import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../../components/Home/presentational/Home.jsx';
import HomeImageSlider from '../../../components/Home/presentational/HomeImageSlider.jsx';

describe('<Home />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists(<HomeImageSlider />)).toBe(true);
  });
});
