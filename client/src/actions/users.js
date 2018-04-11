import axios from 'axios';

export const registerUser = userDetails => ({
  type: 'REGISTER_USER',
  payload: axios.post('/api/v1/auth/signUp', userDetails)
});

export const registerBusiness = () => ({
  type: 'REGISTER_BUSINESS',
  payload: 'toBeContinued'
});
