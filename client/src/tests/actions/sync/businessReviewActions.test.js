import { expect } from 'chai';
import * as businessReviewActions from '../../../store/actions/businessReview';
import * as actionTypes from '../../../store/actions/actionTypes';

const reviews = ['Nice Business'];
const reviewsCount = 10;

describe('Business Review Actions', () => {
  describe('Post Review Action', () => {
    it('should post a review', () => {
      const expectedAction = {
        type: actionTypes.POST_REVIEW
      };
      expect(businessReviewActions.postsReview()).to.be.eql(expectedAction);
    });
  });

  describe('Post Review Response Action', () => {
    it('should post a review response', () => {
      const expectedAction = {
        type: actionTypes.POST_REVIEW_RESPONSE
      };
      expect(businessReviewActions.postsReviewResponse()).to.be.eql(expectedAction);
    });
  });

  describe('Fetch Business Reviews Action', () => {
    it('should fetch reviews for business', () => {
      const expectedAction = {
        type: actionTypes.FETCH_BUSINESS_REVIEWS,
        reviews,
        reviewsCount
      };
      expect(businessReviewActions.fetchBusinessReviews(reviews, reviewsCount))
        .to.be.eql(expectedAction);
    });
  });

  describe('Fetch Business Reviews Failed Action', () => {
    it('should return no reviews', () => {
      const expectedAction = {
        type: actionTypes.FETCH_BUSINESS_REVIEWS_FAILED
      };
      expect(businessReviewActions.fetchBusinessReviewsFailed()).to.be.eql(expectedAction);
    });
  });
});
