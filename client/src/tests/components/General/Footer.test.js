import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/General/Footer.jsx';

describe('<Footer />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer')).toHaveLength(1);
  });
});
