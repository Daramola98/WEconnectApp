import axios from 'axios';
import { REGISTER_USER, REGISTER_USER_FAILED } from './actionTypes';
import { userLoggedIn } from './auth';


export const registerUser = user => ({
  type: REGISTER_USER,
  user
});

export const registerUserFailed = error => ({
  type: REGISTER_USER_FAILED,
  error
});

export const signUp = userDetails => dispatch =>
  axios.post('api/v1/auth/signUp', userDetails)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('weConnectToken', token);
      dispatch(userLoggedIn(response.data.createdUser));
    });

