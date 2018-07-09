import axios from 'axios';

/**
   * Set Default authorization header for axios
   * @param {string} token - The reviews for the business
   * @return {null} set or delete axios default authorization header
   * @memberof UtilHelper
   */
export default (token = null) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
