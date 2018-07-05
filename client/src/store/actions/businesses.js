import axios from 'axios';
import { FETCH_BUSINESSES, FETCH_BUSINESS_FAILED, FETCH_CATEGORIES, FETCH_BUSINESS, SET_BUSINESS_PROFILE, REGISTER_BUSINESS, UPDATE_BUSINESS, SEARCH_BUSINESS, SEARCH_BUSINESS_FAILED, FETCH_BUSINESSES_FAILED, DELETE_BUSINESS } from './actionTypes';

/**
   * Creates registerBusiness action
   * @return {object} action - The registerbusiness action object
   * @memberof businessActions
   */
export const registerBusiness = () => ({
  type: REGISTER_BUSINESS
});

/**
   * Creates updateBusiness action
   * @return {object} action - The updatebusiness action object
   * @memberof businessActions
   */
export const updatesBusiness = () => ({
  type: UPDATE_BUSINESS
});

/**
   * Creates searchBusiness action
   * @param {Array} result - The result of the search operation
   * @param {number} businessesCount - The number of businesses found
   * @return {object} action - The searchbusiness action object
   * @memberof businessActions
   */
export const searchesBusiness = (result, businessesCount) => ({
  type: SEARCH_BUSINESS,
  result,
  businessesCount
});

/**
   * Creates fetchcategory Business action
   * @param {Array} categories - The business categories
   * @return {object} action - The fetchcategories action object
   * @memberof businessActions
   */
export const fetchesCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories
});

/**
   * Creates searchbusinessfailed action
   * @return {object} action - The searchbusinessfailed action object
   * @memberof businessActions
   */
export const searchesBusinessFailed = () => ({
  type: SEARCH_BUSINESS_FAILED
});

/**
   * Creates deleteBusiness action
   * @return {object} action - The deletebusiness action object
   * @memberof businessActions
   */
export const deletesBusiness = () => ({
  type: DELETE_BUSINESS
});

/**
   * Creates setBusinessProfile action
   * @param {object} business - The current business
   * @return {object} action - The setbusinessprofile action object
   * @memberof businessActions
   */
export const setBusinessProfile = business => ({
  type: SET_BUSINESS_PROFILE,
  business
});

/**
   * Creates fetchBusinessesfailed action
   * @return {object} action - The fetchbusinessesfailed action object
   * @memberof businessActions
   */
export const fetchBusinessesFailed = () => ({
  type: FETCH_BUSINESSES_FAILED
});

/**
   * Creates fetchBusinessfailed action
   * @return {object} action - The fetchbusinessfailed action object
   * @memberof businessActions
   */
export const fetchBusinessFailed = () => ({
  type: FETCH_BUSINESS_FAILED
});

/**
   * Action creator for fetchBusinesses action
   * @param {number} pageNumber - The page Number to fetch
   * @return {object} dispatches the fetchBusinesses action
   * @memberof businessActions
   */
export const fetchBusinesses = (pageNumber = 0) => dispatch =>
  axios.get(`/api/v1/businesses?pageNumber=${pageNumber}`)
    .then((response) => {
      dispatch({
        type: FETCH_BUSINESSES,
        businessList: response.data.businesses,
        businessesCount: response.data.businessesCount
      });
    })
    .catch(error => dispatch(fetchBusinessesFailed));

/**
   * Action creator for fetchCategories action
   * @return {object} dispatches the fetchCategories action
   * @memberof businessActions
   */
export const fetchCategories = () => dispatch =>
  axios.get('/api/v1/admin/businessCategory')
    .then((response) => {
      dispatch(fetchesCategories(response.data));
    });

/**
   * Action creator for registerBusiness action
   * @param {object} businessDetails - The business details
   * @return {object} dispatches the registerBusiness action
   * @memberof businessActions
   */
export const createBusiness = businessDetails => dispatch =>
  axios.post('/api/v1/businesses', businessDetails)
    .then((response) => {
      dispatch(registerBusiness());
    });

/**
   * Action creator for updateBusiness action
   * @param {string} businessId - The businessId to update
   * @param {object} businessDetails - The new businessDetails
   * @return {object} dispatches the updateBusiness action
   * @memberof businessActions
   */
export const updateBusiness = (businessId, businessDetails) => dispatch =>
  axios.put(`/api/v1/businesses/${businessId}`, businessDetails)
    .then((response) => {
      dispatch(updatesBusiness());
    });

/**
   * Action creator for deleteBusiness action
   * @param {string} businessId - The businessId to delete
   * @return {object} dispatches the deleteBusiness action
   * @memberof businessActions
   */
export const deleteBusiness = businessId => dispatch =>
  axios.delete(`/api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch(deletesBusiness());
    });

/**
   * Action creator for fetchBusiness action
   * @param {string} businessId - The businessId to fetch
   * @return {object} dispatches the fetchBusiness action
   * @memberof businessActions
   */
export const fetchBusiness = businessId => dispatch =>
  axios.get(`/api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch(setBusinessProfile(response.data.business));
    })
    .catch((error) => {
      dispatch(fetchBusinessFailed());
      window.location.replace('/notFound');
    });

/**
   * Action creator for searchBusiness action
   * @param {string} searchBy - The parameter to search with
   * @param {string} value - The search value
   * @param {number} pageNumber - The page Number to fetch
   * @return {object} dispatches the searchBusiness action
   * @memberof businessActions
   */
export const searchBusiness = (searchBy, value, pageNumber) => dispatch =>
  axios.get(`/api/v1/businesses?${searchBy}=${value}&pageNumber=${pageNumber}`)
    .then((response) => {
      dispatch(searchesBusiness(response.data.businesses, response.data.businessesCount));
    })
    .catch((error) => {
      dispatch(searchesBusinessFailed());
    });

