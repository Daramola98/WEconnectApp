import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../../components/Home/presentational/Home';
import HomeImageSlider from '../../../components/Home/presentational/HomeImageSlider';

describe('<Home />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists(<HomeImageSlider />)).toBe(true);
  });
});
