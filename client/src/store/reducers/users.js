import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes';

/**
      * Creates a React Component
      * @param {object} state current state of the application
      * @param {object} action redux action object
      * @return {object} the state of the application
      * @memberof React Component
      */
function usersReducer(state = {}, action) {
  let user;
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}

export default usersReducer;
