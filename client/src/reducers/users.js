const initialState = {
  user: {},
  userRegistered: false,
  loading: false,
  errors: null
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
    case 'REGISTER_USER_PENDING':
      return {
        ...state, loading: true, userRegistered: false, errors: null, user: {}
      };
    case 'REGISTER_USER_FULFILLED':
      return {
        ...state, loading: false, userRegistered: true, user: action.payload.data, errors: null
      };
    case 'REGISTER_USER_REJECTED':
      return {
        ...state,
        loading: false,
        userRegistered: false,
        user: {},
        errors: {
          message: `${action.payload.response.data.message}`,
          validationErrors: action.payload.response.data.validationErrors ||
           action.payload.response.data || null
        }
      };

    default:
      return state;
  }
}

export default usersReducer;
