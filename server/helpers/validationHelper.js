// import businesses from '../models/businesses';
import checkWhiteSpace from '../helpers/genericHelper';

export default {
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
};

