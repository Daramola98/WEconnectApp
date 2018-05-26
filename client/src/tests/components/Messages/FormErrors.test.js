import React from 'react';
import { shallow } from 'enzyme';
import Errors from '../../../components/Messages/presentational/Errors.jsx';
import FormErrors from '../../../components/Messages/presentational/FormErrors.jsx';

describe('<FormErrors />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<FormErrors errors={{ message: '' }}/>);
    expect(wrapper.exists(<li key="header" className="collection-header">
    <h4 className="red-text">Something Went Wrong</h4>
  </li>)).toBe(true);
  });

  it('should render one Errors component if there are messages in errors object', () => {
    const wrapper = shallow(<FormErrors errors={{ message: ['Firstname required'] }}/>);
    expect(wrapper.find(Errors)).toHaveLength(1);
  });

  it('should render Errors if there are conflicts', () => {
    const wrapper = shallow(<FormErrors errors={{ message: [], conflict: 'Email in use' }}/>);
    expect(wrapper.exists(<li key="conflict" className="collection-item">
    <span className="red-text">Email in use</span>
  </li>)).toBe(true);
  });
});
