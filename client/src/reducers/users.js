import { USER_LOGGED_IN, POST_CONTACTUS, USER_LOGGED_OUT, FETCH_USER_BUSINESSES, UPDATE_USER, FETCH_USER_BUSINESSES_FAILED } from '../actions/actionTypes';

const initialState = {
  user: {},
  businesses: [],
  businessesCount: 0,
  authenticated: false,
  contactUsSubmitted: false
};
/**
      * Listens to actions and dispatches new state for the application
      * @param {object} state current state of the application
      * @param {object} action redux action object
      *
      * @return {object} the state of the application
      */
function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.user, authenticated: true };
    case USER_LOGGED_OUT:
      return { ...state, user: {}, authenticated: false };
    case FETCH_USER_BUSINESSES:
      return { ...state, businesses: action.businesses, businessesCount: action.businessesCount };
    case FETCH_USER_BUSINESSES_FAILED:
      return { ...state, businesses: [], businessesCount: 0 };
    case POST_CONTACTUS:
      return { ...state, contactUsSubmitted: true };
    case UPDATE_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default usersReducer;
