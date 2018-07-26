import { FETCH_BUSINESSES, FETCH_CATEGORIES, FETCH_BUSINESSES_FAILED, SEARCH_BUSINESS, SEARCH_BUSINESS_FAILED, REGISTER_BUSINESS, UPDATE_BUSINESS, DELETE_BUSINESS } from '../actions/actionTypes';

const initialState = {
  businesses: [],
  businessesCount: 0,
  loading: false,
  noOfBusinessesCreated: 0,
  categories: [],
  businessUpdated: false,
  businessDeleted: false
};

/**
    * Listens to actions and dispatches new state for the application
    * @param {object} state current state of the application
    * @param {object} action redux action object
    *
    * @return {object} the state of the application
    */
function businessesReducer(state = initialState, action) {
  let businesses;

  switch (action.type) {
    case FETCH_BUSINESSES:
      businesses = action.businessList;
      return {
        ...state, loading: false, businesses, businessesCount: action.businessesCount
      };
    case SEARCH_BUSINESS:
      businesses = action.result;
      return {
        ...state, loading: false, businesses, businessesCount: action.businessesCount
      };
    case SEARCH_BUSINESS_FAILED:
      return {
        ...state, loading: false, businesses: [], businessesCount: 0
      };
    case FETCH_CATEGORIES:
      return { ...state, loading: false, categories: action.categories };
    case FETCH_BUSINESSES_FAILED:
      return {
        ...state, loading: false, businesses: [], businessesCount: 0
      };
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
