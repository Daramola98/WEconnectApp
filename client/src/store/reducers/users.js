import { USER_LOGGED_IN, USER_LOGGED_OUT, FETCH_USER_BUSINESSES } from '../actions/actionTypes';

const initialState = {
  user: {},
  businesses: [],
  authenticated: false
};
/**
      * Creates a React Component
      * @param {object} state current state of the application
      * @param {object} action redux action object
      * @return {object} the state of the application
      * @memberof React Component
      */
function usersReducer(state = initialState, action) {
  let user;
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.user, authenticated: true };
    case USER_LOGGED_OUT:
      return { ...state, user: {}, authenticated: false };
    case FETCH_USER_BUSINESSES:
      return { ...state, businesses: action.businesses };
    default:
      return state;
  }
}

export default usersReducer;
