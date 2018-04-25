import React from 'react';
import { shallow } from 'enzyme';
import Review from '../../../components/Review/presentational/Review';

describe('<Review />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Review reviewer={'Admin'} review={'Thanks'} />);
    expect(wrapper.exists(<i className="material-icons prefix">account_circle</i>)).toBe(true);
  });
});
