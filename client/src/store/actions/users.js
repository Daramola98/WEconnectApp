import axios from 'axios';
import { REGISTER_USER, REGISTER_USER_FAILED, FETCH_USER_BUSINESSES, UPDATE_USER } from './actionTypes';
import { userLoggedIn } from './auth';


export const registerUser = user => ({
  type: REGISTER_USER,
  user
});

export const updatesUser = user => ({
  type: UPDATE_USER,
  user
});

export const fetchUserBusinesses = businesses => ({
  type: FETCH_USER_BUSINESSES,
  businesses
});

export const signUp = userDetails => dispatch =>
  axios.post('api/v1/auth/signUp', userDetails)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('weConnectToken', token);
      dispatch(userLoggedIn(response.data.createdUser));
    });

export const updateUser = userDetails => dispatch =>
  axios.put('api/v1/auth/user', userDetails)
    .then((response) => {
      dispatch(updatesUser(response.data.updatedUserDetails));
    });

export const getUserBusinesses = () => dispatch =>
  axios.get('api/v1/businesses/user')
    .then((response) => {
      dispatch(fetchUserBusinesses(response.data));
    })
    .catch(error => error.response);

