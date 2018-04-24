import { SET_BUSINESS_PROFILE, FETCH_BUSINESS_REVIEWS, FETCH_BUSINESS_REVIEWS_FAILED, POST_REVIEW } from '../actions/actionTypes';

const initialState = {
  business: {},
  reviews: [],
  reviewsCount: 0,
  reviewSubmitted: false
};

/**
    * Listens to actions and dispatches new state for the application
    * @param {object} state current state of the application
    * @param {object} action redux action object
    *
    * @return {object} the state of the application
    */
function businessProfile(state = initialState, action) {
  switch (action.type) {
    case SET_BUSINESS_PROFILE:
      return { ...state, business: action.business };

    case FETCH_BUSINESS_REVIEWS:
      return { ...state, reviews: action.reviews, reviewsCount: action.reviewsCount };

    case FETCH_BUSINESS_REVIEWS_FAILED:
      return { ...state, reviews: [], reviewsCount: 0 };

    case POST_REVIEW:
      return { ...state, reviewSubmitted: true };

    default:
      return state;
  }
}

export default businessProfile;
