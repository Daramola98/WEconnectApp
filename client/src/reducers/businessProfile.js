/**
    * Creates a React Component
    * @param {object} state current state of the application
    * @param {object} action redux action object
    * @return {object} the state of the application
    * @memberof React Component
    */
function businessProfile(state = null, action) {
  switch (action.type) {
    case 'SET_BUSINESS_PROFILE':
      return action.payload;

    default:
      return state;
  }
}

export default businessProfile;
