import axios from 'axios';

export const fetchBusinesses = () => ({
  type: 'FETCH_BUSINESSES',
  payload: axios.get('/api/v1/businesses')
});

export const registerBusiness = () => ({
  type: 'REGISTER_BUSINESS',
  payload: 'toBeContinued'
});

export const setBusinessProfile = business => ({
  type: 'SET_BUSINESS_PROFILE',
  payload: business
});

