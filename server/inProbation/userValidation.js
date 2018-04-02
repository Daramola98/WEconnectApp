import { User } from '../models';
import { handleInputFormat, checkForWhiteSpace } from '../helpers/genericHelper';

/**
   * Filter businesses in the database by the provided location
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof userMiddleware
   */
export const userEmailValidation = (req, res, next) => {
  handleInputFormat(req);
  return User
    .find({
      where: {
        email: {
          ilike: req.body.email
        }
      }
    })
    .then((user) => {
      if (user) {
        res.status(409).json({ message: 'Email already exists' });
      } else {
        next();
      }
    });
};

/**
   * Checks if business Query is valid i.e a string
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof validationHelper
   */
export const user = (req, res, next) => {
  req.checkQuery({
    location: {
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
    category: {
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
    }
  });
};
