import { FETCH_BUSINESSES, REGISTER_BUSINESS, UPDATE_BUSINESS, DELETE_BUSINESS } from '../actions/actionTypes';

const initialState = {
  businesses: [],
  loading: false,
  noOfBusinessesCreated: 0,
  error: null,
  businessUpdated: false,
  businessDeleted: false
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
    case UPDATE_BUSINESS:
      return { ...state, businessUpdated: true };
    case DELETE_BUSINESS:
      return { ...state, businessDeleted: true };
    default:
      return state;
  }
}

export default businessesReducer;
