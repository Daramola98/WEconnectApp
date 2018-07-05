import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes';

/**
   * Creates user_logged_in action
   * @param {object} user - The current user
   * @return {object} action - The userloggedin action object
   * @memberof authActions
   */
export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

/**
   * Creates user_logged_out action
   * @return {object} action - The userloggedout action object
   * @memberof authActions
   */
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

/**
   * Action creator for user_logged_in action
   * @param {object} credentials - The user credentials object
   * @return {object} dispatches the userloggedin action
   * @memberof authActions
   */
export const login = credentials => dispatch =>
  axios.post('/api/v1/auth/login', credentials)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('weConnectToken', token);
      setAuthorizationHeader(token);
      const user = jwtDecode(token);
      dispatch(userLoggedIn(user));
    });

/**
   * Action creator for user_logged_out action
   * @return {object} dispatches the userloggedout action
   * @memberof authActions
   */
export const logout = () => (dispatch) => {
  localStorage.removeItem('weConnectToken');
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

/**
   * Action creator for user_logged_in action (checks if a user is logged in)
   * @param {string} token - The user credentials object
   * @return {object} dispatches the userloggedin action
   * @memberof authActions
   */
export const isLoggedIn = token => (dispatch) => {
  let user;
  try {
    user = jwtDecode(token);
  } catch (error) {
    return error;
  }
  setAuthorizationHeader(token);
  dispatch(userLoggedIn(user));
};
