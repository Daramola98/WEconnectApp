import React from 'react';
import { shallow } from 'enzyme';
import BusinessReviewForm from '../../../components/Forms/BusinessReviewForm';

describe('LoginForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BusinessReviewForm submit={() => wrapper.setState({ submitted: true })} />);
  });

  describe('Review input', () => {
    it('should respond to change event and change the state of the BusinessReview Component', () => {
      wrapper.setState({
        reviewDetails: {
          review: ''
        }
      });
      wrapper.find('#review').simulate('change', { target: { name: 'review', value: 'Nice' } });
      expect(wrapper.state().reviewDetails.review).toEqual('Nice');
    });
  });

  describe('BusinessReview Form Submit', () => {
    it('should respond to submit event and change the state of the BusinessReview Component', () => {
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        reviewDetails: {
          review: ''
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
      expect(wrapper.state().submitted).toEqual(true);
    });
  });
});
