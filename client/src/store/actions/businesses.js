import axios from 'axios';
import { FETCH_BUSINESSES, FETCH_BUSINESS, SET_BUSINESS_PROFILE } from './actionTypes';

export const fetchBusinesses = () => dispatch =>
  axios.get('api/v1/businesses')
    .then((response) => {
      dispatch({
        type: FETCH_BUSINESSES,
        businessList: response.data
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const registerBusiness = () => ({
  type: 'REGISTER_BUSINESS',
  payload: 'toBeContinued'
});

export const setBusinessProfile = businessId => dispatch =>
  axios.get('api/v1/businesses')
    .then((response) => {
      console.log(response);
      dispatch({
        type: SET_BUSINESS_PROFILE,
        business: response
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

