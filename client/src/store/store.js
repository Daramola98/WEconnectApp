import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import businessesReducer from './reducers/businesses';
import businessProfile from './reducers/businessProfile';
import usersReducers from './reducers/users';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  combineReducers({
    businessesReducer, businessProfile, usersReducers
  }),
  composeEnhancers(applyMiddleware(createLogger(), thunk))
);
