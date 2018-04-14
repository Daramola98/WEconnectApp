import { FETCH_BUSINESSES, REGISTER_BUSINESS } from '../actions/actionTypes';

const initialState = {
  businesses: [],
  loading: false,
  noOfBusinessesCreated: 0,
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
    case REGISTER_BUSINESS:
      return { ...state, noOfBusinessesCreated: state.noOfBusinessesCreated + 1 };

    default:
      return state;
  }
}

export default businessesReducer;
