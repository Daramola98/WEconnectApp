import { BusinessReview } from '../models';

const reviewValidation = {
  review: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Review should be a valid string'
    },
    errorMessage: 'Review is required'
  },
};

export default reviewValidation;
