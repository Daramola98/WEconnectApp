import { reviewresponse } from '../models';

const reviewResponseValidation = {
  message: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Message should be a valid string'
    },
    errorMessage: 'message is required'
  },
};

export default reviewResponseValidation;
