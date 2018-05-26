import React from 'react';
import { shallow } from 'enzyme';
import HowItWorks from '../../../components/Home/presentational/HowItWorks.jsx';

describe('<HowItWorks />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<HowItWorks />);
    expect(wrapper.exists(<h4>HOW WECONNECT WORKS</h4>)).toBe(true);
  });
});
