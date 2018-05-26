import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
  axios.post('/api/v1/auth/login', credentials)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('weConnectToken', token);
      setAuthorizationHeader(token);
      const user = jwtDecode(token);
      dispatch(userLoggedIn(user));
    });

export const logout = () => (dispatch) => {
  localStorage.removeItem('weConnectToken');
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

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
