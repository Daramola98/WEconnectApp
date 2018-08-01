import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../../components/General/Loader.jsx';

describe('<Loader />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
