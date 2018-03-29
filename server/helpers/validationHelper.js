// import businesses from '../models/businesses';
import checkWhiteSpace from '../helpers/genericHelper';

const validationHelper = {
  /**
   * Checks if business id is valid i.e an integer
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof validationHelper
   */
  businessIdCheck(req, res, next) {
    checkWhiteSpace(req);
    req.checkParams({
      businessId: {
        isInt: true,
        errorMessage: 'Your Business id should be an integer'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const validationErrors = [];
      errors.forEach((error) => {
        validationErrors.push({
          error: error.msg
        });
      });
      res.status(400)
        .json(validationErrors);
    } else {
      return next();
    }
  },

  /**
   * Checks if business Query is valid i.e a string
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof validationHelper
   */
  businessQueryCheck(req, res, next) {
    checkWhiteSpace(req);
    req.checkQuery({
      location: {
        optional: true,
        isInt: false,
        isLength: {
          options: [{ min: 1, max: 100 }],
          errorMessage: 'Location should be more than 0 and not greater than 100 characters'
        },
        errorMessage: 'Business location should be a string'
      },
      category: {
        optional: true,
        isInt: false,
        isLength: {
          options: [{ min: 1 }, { max: 50 }],
          errorMessage: 'Category should be more than 0 and not greater than 50 characters'
        },
        errorMessage: 'Business category should be a string'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const validationErrors = [];
      errors.forEach((error) => {
        validationErrors.push({
          error: error.msg
        });
      });
      res.status(400)
        .json(validationErrors);
    } else {
      return next();
    }
  },
  handleValidationErrors(errors, res) {
    const validationErrors = [];
    if (!errors || errors.length < 1) {
      return;
    }
    for (let i = 0; i < errors.length; i += 1) {
      validationErrors.push(errors[i].message);
    }
    return res.status(400).json({ message: 'The following validation errors were found', validationErrors });
  }
};

export default validationHelper;
