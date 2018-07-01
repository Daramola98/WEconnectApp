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
  rating: {
    trim: true,
    notEmpty: true,
    isFloat: {
      errorMessage: 'Rating should be a number'
    },
    errorMessage: 'Rating is required'
  },
};

export default reviewValidation;
