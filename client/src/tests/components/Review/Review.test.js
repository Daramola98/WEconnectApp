import React from 'react';
import { shallow } from 'enzyme';
import Review from '../../../components/Review/presentational/Review.jsx';

describe('<Review />', () => {
  it('should render the component', () => {
    const review = {
      reviewer: 'Admin',
      review: 'Nice'
    };
    const wrapper = shallow(<Review review={review} setReviewId={jest.fn()} />);
    expect(wrapper.exists(<i className="material-icons prefix">account_circle</i>)).toBe(true);
  });

  it('should call the click event for edit', () => {
    const review = {
      reviewer: 'Admin',
      review: 'Nice'
    };
    const onCloseMock = jest.fn();
    global.$ = () => ({
      modal: onCloseMock,
    });
    const wrapper = shallow(<Review review={review} setReviewId={jest.fn()} />);
    wrapper.find('#edit').simulate('click');
  });

  it('should call the click event for delete', () => {
    const review = {
      reviewer: 'Admin',
      review: 'Nice'
    };
    const onCloseMock = jest.fn();
    global.$ = () => ({
      modal: onCloseMock,
    });
    const wrapper = shallow(<Review review={review} setReviewId={jest.fn()} />);
    wrapper.find('#delete').simulate('click');
  });
});
