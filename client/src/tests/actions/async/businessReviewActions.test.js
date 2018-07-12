import moxios from 'moxios';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as businessReviewActions from '../../../actions/businessReview';
import * as actionTypes from '../../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const businessId = 'b480cd56-7089-4210-939d-e89af667a1fc';
const reviewId = 'b480cd56-7086-4210-939d-e89af667a1fc';
const review = 'Nice Business';

describe('Async Business Review Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('PostReview Action', () => {
    it('should post a business review', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
        status: 201,
        response: {
          data: {
            msg: 'Review submitted'
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.POST_REVIEW
      }];

      const store = mockStore({ user: {} });
      return store.dispatch(businessReviewActions.postReview(businessId, review));
    });
  });

  describe('UpdateReview Action', () => {
    it('should update a business review', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, {
        status: 200,
        response: {
          data: {
            msg: 'Review Updated'
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.UPDATE_REVIEW
      }];

      const store = mockStore({ user: {} });
      return store.dispatch(businessReviewActions.updateReview(businessId, reviewId, review));
    });
  });

  describe('DeleteReview Action', () => {
    it('should delete a business review', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, {
        status: 200,
        response: {
          data: {
            msg: 'Review Deleted'
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.DELETE_REVIEW
      }];

      const store = mockStore({ user: {} });
      return store.dispatch(businessReviewActions.deleteReview(businessId, reviewId));
    });
  });

  describe('FetchReview Action', () => {
    it('should fetch a business\'s review', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?pageNumber=1`, {
        status: 200,
        response: {
          data: {
            reviews: ['Review submitted'],
            reviewsCount: 1
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.FETCH_BUSINESS_REVIEWS,
        reviews: ['Review submitted'],
        reviewsCount: 1
      }];

      const store = mockStore({ user: {} });
      return store.dispatch(businessReviewActions.fetchReviews(businessId, 1));
    });

    it('should dispatch fetch business review failed when the request as an error status', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?pageNumber=1`, {
        status: 404,
        response: {
          error: {
            msg: 'No reviews found'
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.FETCH_BUSINESS_REVIEWS_FAILED
      }];

      const store = mockStore({ user: {} });
      return store.dispatch(businessReviewActions.fetchReviews(businessId, 1));
    });
  });

  describe('PostReview Response Action', () => {
    it('should post a response to a review', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews/1`, {
        status: 201,
        response: {
          data: {
            msg: 'Response submitted'
          }
        }
      });
      const expectedAction = [{
        type: actionTypes.POST_REVIEW_RESPONSE
      }];

      const store = mockStore({ user: {} });
      return store.dispatch(businessReviewActions.postReviewResponse(businessId, 1, review));
    });
  });
});

