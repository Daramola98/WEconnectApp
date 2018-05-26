import React from 'react';
import { shallow } from 'enzyme';
import { Slider } from 'react-materialize';
import HomeImageSlider from '../../../components/Home/presentational/HomeImageSlider.jsx';

describe('<HomeImageSlider />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<HomeImageSlider />);
    expect(wrapper.exists(<Slider />)).toBe(true);
  });
});
