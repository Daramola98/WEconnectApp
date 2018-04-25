import React from 'react';
import { shallow } from 'enzyme';
import Business from '../../../components/Businesses/presentational/Business';

describe('<Business />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Business business={'Andela'} />);
    expect(wrapper.exists(<td></td>)).toBe(true);
  });
});
