import axios from 'axios';
import { FETCH_BUSINESSES, FETCH_BUSINESS, SET_BUSINESS_PROFILE } from './actionTypes';

export const fetchBusinesses = () => dispatch =>
  axios.get('api/v1/businesses')
    .then((response) => {
      console.log(response);
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

export const setBusinessProfile = business => ({
  type: SET_BUSINESS_PROFILE,
  business
});


export const fetchBusiness = businessId => dispatch =>
  axios.get(`api/v1/businesses/${businessId}`)
    .then((response) => {
      console.log(response);
      dispatch(setBusinessProfile(response.data.business));
    })
    .catch(error => Promise.reject(error.response.data.message));

