import React from 'react';
import { shallow } from 'enzyme';
import FilterBusiness from '../../../components/Forms/FilterBusiness.jsx';

describe('<FilterBusiness />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FilterBusiness onSearchChange={jest.fn()}
    search={jest.fn()}
    disableBtn={false} />);
  });

  describe('Search input', () => {
    it('should respond to change event and change the state of the FilterBusiness Component', () => {
      wrapper.find('input').simulate('change', { target: { name: 'search', value: 'dara@gmail.com' } });
    });
  });
});
