import axios from 'axios';
import { REGISTER_USER, REGISTER_USER_FAILED, POST_CONTACTUS, FETCH_USER_BUSINESSES, FETCH_USER_BUSINESSES_FAILED, UPDATE_USER } from './actionTypes';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';
import { userLoggedIn } from './auth';


export const registerUser = user => ({
  type: REGISTER_USER,
  user
});

export const postsContactUs = () => ({
  type: POST_CONTACTUS
});

export const updatesUser = user => ({
  type: UPDATE_USER,
  user
});

export const fetchUserBusinesses = (businesses, businessesCount) => ({
  type: FETCH_USER_BUSINESSES,
  businesses,
  businessesCount
});

export const fetchUserBusinessesFailed = () => ({
  type: FETCH_USER_BUSINESSES_FAILED,
});

export const postContactUs = contactInfo => dispatch =>
  axios.post('api/v1/admin/contactUs', contactInfo)
    .then((response) => {
      dispatch(postsContactUs());
    });

export const signUp = userDetails => dispatch =>
  axios.post('api/v1/auth/signUp', userDetails)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('weConnectToken', token);
      setAuthorizationHeader(token);
      dispatch(userLoggedIn(response.data.createdUser));
    });

export const updateUser = userDetails => dispatch =>
  axios.put('api/v1/auth/user', userDetails)
    .then((response) => {
      dispatch(updatesUser(response.data.updatedUserDetails));
    });

export const getUserBusinesses = pageNumber => dispatch =>
  axios.get(`api/v1/businesses/user?pageNumber=${pageNumber}`)
    .then((response) => {
      dispatch(fetchUserBusinesses(response.data.businesses, response.data.businessesCount));
    });

