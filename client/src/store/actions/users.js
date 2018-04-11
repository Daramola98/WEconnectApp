import axios from 'axios';
import { REGISTER_USER } from './actionTypes';


export const registerUser = user => ({
  type: REGISTER_USER,
  user
});

export const registerUserFailed = error => ({
  type: REGISTER_USER,
  error
});

export const sendUserDetails = userDetails => dispatch =>
  axios.post('api/v1/auth/signUp', userDetails)
    .then((response) => {
      dispatch(registerUser(response.data.createdUser));
    })
    .catch((response) => {
      dispatch(registerUserFailed(response.data))
    })

