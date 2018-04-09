import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import businessesReducer from './reducers/businesses';
import businessProfile from './reducers/businessProfile';

export default createStore(
  combineReducers({
    businessesReducer, businessProfile
  }),
  applyMiddleware(createLogger(), promise())
);
