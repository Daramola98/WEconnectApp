import axios from 'axios';
import { REGISTER_USER, REGISTER_USER_FAILED, POST_CONTACTUS, FETCH_USER_BUSINESSES, FETCH_USER_BUSINESSES_FAILED, UPDATE_USER } from './actionTypes';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';
import { userLoggedIn } from './auth';

/**
   * Creates registerUser action
   * @param {object} user - The user object
   * @return {object} action - The registerUser action object
   * @memberof userActions
   */
export const registerUser = user => ({
  type: REGISTER_USER,
  user
});

/**
   * Creates postContactUs action
   * @return {object} action - The postContactUs action object
   * @memberof userActions
   */
export const postsContactUs = () => ({
  type: POST_CONTACTUS
});

/**
   * Creates updateUser action
   * @param {object} user - The user object
   * @return {object} action - The updateUser action object
   * @memberof userActions
   */
export const updatesUser = user => ({
  type: UPDATE_USER,
  user
});

/**
   * Creates fetchUserBusinesses action
   * @param {array} businesses - The user object
   * @param {number} businessesCount - The user object
   * @return {object} action - The fetchUserBusinesses action object
   * @memberof userActions
   */
export const fetchUserBusinesses = (businesses, businessesCount) => ({
  type: FETCH_USER_BUSINESSES,
  businesses,
  businessesCount
});

/**
   * Creates fetchUserBusinessesFailed action
   * @return {object} action - The fetchUserBusinessesFailed action object
   * @memberof userActions
   */
export const fetchUserBusinessesFailed = () => ({
  type: FETCH_USER_BUSINESSES_FAILED,
});

/**
   * Action creator for postContactUs action
   * @param {object} contactInfo - The contact information
   * @return {object} dispatches the postContactUs action
   * @memberof userActions
   */
export const postContactUs = contactInfo => dispatch =>
  axios.post('/api/v1/admin/contactUs', contactInfo)
    .then((response) => {
      dispatch(postsContactUs());
    });

/**
   * Action creator for registerUser action
   * @param {object} userDetails - The users information
   * @return {object} dispatches the registeruser action
   * @memberof userActions
   */
export const signUp = userDetails => dispatch =>
  axios.post('/api/v1/auth/signUp', userDetails)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('weConnectToken', token);
      setAuthorizationHeader(token);
      dispatch(userLoggedIn(response.data.createdUser));
    });

/**
   * Action creator for updateUser action
   * @param {object} userDetails - The users information
   * @return {object} dispatches the updateUser action
   * @memberof userActions
   */
export const updateUser = userDetails => dispatch =>
  axios.put('/api/v1/auth/user', userDetails)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('weConnectToken', token);
      setAuthorizationHeader(token);
      dispatch(updatesUser(response.data.updatedUserDetails));
    });

/**
   * Action creator for fetchUserBusinesses action
   * @param {number} pageNumber - The contact information
   * @return {object} dispatches the fetchUserBusinesses action
   * @memberof userActions
   */
export const getUserBusinesses = pageNumber => dispatch =>
  axios.get(`/api/v1/businesses/user?pageNumber=${pageNumber}`)
    .then((response) => {
      dispatch(fetchUserBusinesses(response.data.businesses, response.data.businessesCount));
    })
    .catch(() => dispatch(fetchUserBusinessesFailed()));

