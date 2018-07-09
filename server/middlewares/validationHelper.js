import { checkForWhiteSpace } from '../helpers/genericHelper';

/**
   * Checks if business id is valid i.e a uuid
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof validationHelper
   */
export const businessIdCheck = (req, res, next) => {
  checkForWhiteSpace(req.params.businessId);
  req.checkParams({
    businessId: {
      trim: true,
      notEmpty: {
        errorMessage: 'Business Id is required'
      },
      isUUID: {
        errorMessage: 'Business id should be a uuid'
      }
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    const validationErrors = [];
    errors.forEach((error) => {
      validationErrors.push(error.msg);
    });
    return res.status(400)
      .json({
        message: 'Cannot Complete Request, Errors Found ',
        validationErrors
      });
  }
  return next();
};

/**
   * Checks if review id is valid i.e a uuid
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof validationHelper
   */
export const reviewIdCheck = (req, res, next) => {
  checkForWhiteSpace(req.params.reviewId);
  req.checkParams({
    reviewId: {
      trim: true,
      notEmpty: {
        errorMessage: 'Review Id is required'
      },
      isUUID: {
        errorMessage: 'Review id should be a uuid'
      }
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    const validationErrors = [];
    errors.forEach((error) => {
      validationErrors.push(error.msg);
    });
    return res.status(400)
      .json({
        message: 'Cannot Complete Request, Errors Found ',
        validationErrors
      });
  }
  return next();
};

/**
   * Checks if user id is valid i.e a uuid
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof validationHelper
   */
export const userIdCheck = (req, res, next) => {
  checkForWhiteSpace(req.params.businessId);
  req.checkParams({
    userId: {
      trim: true,
      notEmpty: {
        errorMessage: 'User Id is required'
      },
      isUUID: {
        errorMessage: 'User id should be a uuid'
      }
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    const validationErrors = [];
    errors.forEach((error) => {
      validationErrors.push(error.msg);
    });
    return res.status(400)
      .json({
        message: 'Cannot Complete Request, Errors Found ',
        validationErrors
      });
  }
  return next();
};

/**
   * Checks if business Query is valid i.e a string
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof validationHelper
   */
export const businessQueryCheck = (req, res, next) => {
  checkForWhiteSpace(req.query.location);
  checkForWhiteSpace(req.query.category);
  req.checkQuery({
    location: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: 'Location is required'
      },
      isInt: false,
      isLength: {
        options: [{ min: 1, max: 100 }],
        errorMessage: 'Location should be more than 0 and not greater than 100 characters'
      },
      errorMessage: 'Business location should be a string'
    },
    pageNumber: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: 'Page Number is required'
      },
      isInt: {
        errorMessage: 'Page Number should be a number'
      },
    },
    category: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: 'Category is required'
      },
      isInt: false,
      isLength: {
        options: [{ min: 1 }, { max: 50 }],
        errorMessage: 'Category should be more than 0 and not greater than 50 characters'
      },
      errorMessage: 'Business category should be a string'
    },
    name: {
      trim: true,
      optional: true,
      notEmpty: {
        errorMessage: 'Business Name is required'
      },
      isLength: {
        options: [{ min: 1 }, { max: 50 }],
        errorMessage: 'Business Name should be more than 0 and not greater than 50 characters'
      }
    }
  });

  const errors = req.validationErrors();
  if (errors) {
    const validationErrors = [];

    errors.forEach((error) => {
      validationErrors.push(error.msg);
    });
    res.status(400)
      .json({
        message: 'Cannot Complete Request, Errors Found ',
        validationErrors
      });
  } else {
    return next();
  }
};

