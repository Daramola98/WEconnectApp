import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../components/General/NotFound.jsx';

describe('<NotFound />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
