import axios from 'axios';
import querystring from 'querystring';
import { FETCH_BUSINESSES, FETCH_CATEGORIES, FETCH_BUSINESS, SET_BUSINESS_PROFILE, REGISTER_BUSINESS, UPDATE_BUSINESS, SEARCH_BUSINESS, SEARCH_BUSINESS_FAILED, FETCH_BUSINESSES_FAILED } from './actionTypes';


export const registerBusiness = () => ({
  type: REGISTER_BUSINESS
});

export const updatesBusiness = () => ({
  type: UPDATE_BUSINESS
});

export const searchesBusiness = (result, businessesCount) => ({
  type: SEARCH_BUSINESS,
  result,
  businessesCount
});

export const fetchesCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories
});

export const searchesBusinessFailed = () => ({
  type: SEARCH_BUSINESS_FAILED
});

export const deletesBusiness = () => ({
  type: UPDATE_BUSINESS
});

export const setBusinessProfile = business => ({
  type: SET_BUSINESS_PROFILE,
  business
});

export const fetchBusinessesFailed = () => ({
  type: FETCH_BUSINESSES_FAILED
});

export const fetchBusinesses = (pageNumber = 0) => dispatch =>
  axios.get(`api/v1/businesses?pageNumber=${pageNumber}`)
    .then((response) => {
      dispatch({
        type: FETCH_BUSINESSES,
        businessList: response.data.businesses,
        businessesCount: response.data.businessesCount
      });
    })
    .catch(error => dispatch(fetchBusinessesFailed));

export const fetchCategories = () => dispatch =>
  axios.get('api/v1/admin/businessCategory')
    .then((response) => {
      dispatch(fetchesCategories(response.data));
    });

export const createBusiness = businessDetails => dispatch =>
  axios.post('api/v1/businesses', businessDetails)
    .then((response) => {
      dispatch(registerBusiness());
    });

export const updateBusiness = (businessId, businessDetails) => dispatch =>
  axios.put(`/api/v1/businesses/${businessId}`, businessDetails)
    .then((response) => {
      dispatch(updatesBusiness());
    });

export const deleteBusiness = businessId => dispatch =>
  axios.delete(`api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch(deletesBusiness());
    });

export const fetchBusiness = businessId => dispatch =>
  axios.get(`/api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch(setBusinessProfile(response.data.business));
    })
    .catch(error => Promise.reject(error.response.data.message));

export const searchBusiness = (searchBy, value, pageNumber) => dispatch =>
  axios.get(`api/v1/businesses?${searchBy}=${value}&pageNumber=${pageNumber}`)
    .then((response) => {
      dispatch(searchesBusiness(response.data.businesses, response.data.businessesCount));
    })
    .catch((error) => {
      dispatch(searchesBusinessFailed());
    });

