import { SET_BUSINESS_PROFILE, FETCH_BUSINESS_REVIEWS, POST_REVIEW } from '../actions/actionTypes';

const initialState = {
  business: {},
  reviews: [],
  reviewSubmitted: false
};

/**
    * Creates a React Component
    * @param {object} state current state of the application
    * @param {object} action redux action object
    * @return {object} the state of the application
    * @memberof React Component
    */
function businessProfile(state = initialState, action) {
  switch (action.type) {
    case SET_BUSINESS_PROFILE:
      return { ...state, business: action.business };

    case FETCH_BUSINESS_REVIEWS:
      return { ...state, reviews: action.reviews };

    case POST_REVIEW:
      return { ...state, reviewSubmitted: true };

    default:
      return state;
  }
}

export default businessProfile;
