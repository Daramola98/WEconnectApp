import { FETCH_BUSINESSES } from '../actions/actionTypes';

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
    case FETCH_BUSINESSES:
      businesses = action.businessList;
      return { ...state, loading: false, businesses };

    default:
      return state;
  }
}

export default businessesReducer;
