import { SET_BUSINESS_PROFILE } from '../actions/actionTypes';

/**
    * Creates a React Component
    * @param {object} state current state of the application
    * @param {object} action redux action object
    * @return {object} the state of the application
    * @memberof React Component
    */
function businessProfile(state = {}, action) {
  switch (action.type) {
    case SET_BUSINESS_PROFILE:
      return action.business;

    default:
      return state;
  }
}

export default businessProfile;
