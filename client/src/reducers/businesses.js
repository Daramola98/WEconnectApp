const initialState = {
  businesses: [],
  loading: false,
  error: null
};

/**
    * Creates a React Component
    * @param {object} state current state of the application
    * @param {object} action redux action object
    * @return {object} the state of the application
    * @memberof React Component
    */
function businessesReducer(state = initialState, action) {
  let businesses;

  switch (action.type) {
    case 'FETCH_BUSINESSES_PENDING':
      return { ...state, loading: true };
    case 'FETCH_BUSINESSES_FULFILLED':
      businesses = action.payload.data;
      return { ...state, loading: false, businesses };
    case 'FETCH_BUSINESSES_REJECTED':
      return { ...state, loading: false, error: `${action.payload.message}` };

    default:
      return state;
  }
}

export default businessesReducer;
