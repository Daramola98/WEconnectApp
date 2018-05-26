import React from 'react';
import { shallow, mount } from 'enzyme';
import ContactUs from '../../components/Home/smart/ContactUs.jsx';
import ContactUsForm from '../../components/Forms/ContactUsForm.jsx';
import FormErrors from '../../components/Messages/presentational/FormErrors.jsx';

describe('<ContactUs />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ContactUs postContactUs={() => ({})} />);
  });

  it('should render the <ContactUs /> component', () => {
    expect(wrapper.exists(<h3>Contact Us</h3>)).toBe(true);
  });

  it('should render the <ContactUsForm /> component', () => {
    expect(wrapper.find(ContactUsForm)).toHaveLength(1);
  });

  it('should render the <FormErrors /> component if there are errors', () => {
    wrapper.setState({ errors: { message: ['Firstname is required'] } });
    expect(wrapper.find(FormErrors)).toHaveLength(1);
  });
});

