// import businesses from '../models/businesses';

export default {
  businessRegisterInputCheck(req, res, next) {
    const businessNameErrorMessage = 'Please provide a business name with atleast 5 and not more than 50 characters .';
    req.checkBody({
      name: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5, max: 50 }],
          errorMessage: businessNameErrorMessage
        },
        errorMessage: 'Your Business name is required'
      },
      description: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5, max: 500 }],
          errorMessage: 'Business description should be more than 5 and not greater than 500'
        },
        errorMessage: 'Provide a desciption of your business not more than 500 characters'
      },
      location: {
        notEmpty: true,
        errorMessage: 'Business Location is required',
        isLength: {
          options: [{ min: 3, max: 100 }],
          errorMessage: 'Business location should be more than 5 and not greater than 100 characters'
        }
      },
      category: {
        notEmpty: true,
        isLength: {
          options: [{ min: 4, max: 50 }],
          errorMessage: 'Business Category should be more than 5 and not greater than 100 characters'
        },
        errorMessage: 'Business Category is required'
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Enter a valid Email Address'
        },
        isLength: {
          options: [{ min: 4, max: 50 }],
          errorMessage: 'Email should be more than 5 and not greater than 100 characters'
        },
        errorMessage: 'Email is required'
      },
      telephoneNumber: {
        notEmpty: true,
        isInt: {
          errorMessage: 'Enter a valid Telephone Number'
        },
        isLength: {
          options: [{ min: 11, max: 11 }],
          errorMessage: 'Telephone Number should be more than 1 and not greater than 11 characters'
        },
        errorMessage: 'Telephone Number is required'
      },
      officeNumber: {
        notEmpty: false,
        optional: true,
        isInt: {
          errorMessage: 'Enter a valid Office Number'
        },
        isLength: {
          options: [{ min: 11, max: 11 }],
          errorMessage: 'Office should be more than 1 and not greater than 11 characters'
        },
        errorMessage: 'Office Number is required'
      },
      address: {
        notEmpty: true,
        isInt: false,
        isLength: {
          options: [{ min: 3, max: 50 }],
          errorMessage: 'Business Address should be more than 3 and not greater than 50 characters'
        },
        errorMessage: 'Business Address is required'
      },
    });
    const errors = req.validationErrors();
    if (errors) {
      const validationErrors = [];
      errors.forEach((error) => {
        validationErrors.push({
          error: error.msg
        });
      });
      res.status(409)
        .json(validationErrors);
    } else {
      return next();
    }
  },
  businessUpdateInputCheck(req, res, next) {
    const businessNameErrorMessage = 'Please provide a business name with atleast 5 characters and max 50 characters.';
    req.checkBody({
      name: {
        notEmpty: false,
        optional: true,
        isLength: {
          options: [{ min: 5, max: 50 }],
          errorMessage: businessNameErrorMessage
        },
        errorMessage: 'Your Business name is required'
      },
      description: {
        notEmpty: false,
        optional: true,
        isLength: {
          options: [{ min: 20, max: 500 }],
          errorMessage: 'Business description should be more than 5 and not greater than 500'
        },
        errorMessage: 'Provide a desciption of your business not more than 500 characters'
      },
      location: {
        notEmpty: false,
        optional: true,
        errorMessage: 'Business Location is required',
        isLength: {
          options: [{ min: 3, max: 100 }],
          errorMessage: 'Business location should be more than 5 and not greater than 100 characters'
        }
      },
      category: {
        notEmpty: false,
        optional: true,
        isLength: {
          options: [{ min: 4, max: 50 }],
          errorMessage: 'Business Category should be more than 5 and not greater than 50 characters'
        },
        errorMessage: 'Business Category is required'
      },
      email: {
        notEmpty: false,
        optional: true,
        isEmail: {
          errorMessage: 'Enter a valid Email Address'
        },
        isLength: {
          options: [{ min: 4, max: 50 }],
          errorMessage: 'Email should be more than 3 and not greater than 50 characters'
        },
        errorMessage: 'Email is required'
      },
      telephoneNumber: {
        notEmpty: true,
        optional: true,
        isInt: {
          errorMessage: 'Enter a valid Telephone Number'
        },
        isLength: {
          options: [{ min: 11, max: 11 }],
          errorMessage: 'Telephone Number should be more than 1 and not greater than 11 characters'
        },
        errorMessage: 'Telephone Number is required'
      },
      officeNumber: {
        notEmpty: false,
        optional: true,
        isInt: {
          errorMessage: 'Enter a valid Office Number'
        },
        isLength: {
          options: [{ min: 11, max: 11 }],
          errorMessage: 'Office should be more than 1 and not greater than 11 characters'
        },
        errorMessage: 'Office Number is required'
      },
      address: {
        notEmpty: true,
        optional: true,
        isInt: false,
        isLength: {
          options: [{ min: 3, max: 50 }],
          errorMessage: 'Business Address should be more than 3 and not greater than 50 characters'
        },
        errorMessage: 'Business Address is required'
      },
    });
    const errors = req.validationErrors();
    if (errors) {
      const validationErrors = [];
      errors.forEach((error) => {
        validationErrors.push({
          error: error.msg
        });
      });
      res.status(409)
        .json(validationErrors);
    } else {
      return next();
    }
  },
  businessIdCheck(req, res, next) {
    req.checkParams({
      businessId: {
        isInt: true,
        errorMessage: 'Your Business id should be a uuid'
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
      res.status(409)
        .json(validationErrors);
    } else {
      return next();
    }
  },
  businessQueryCheck(req, res, next) {
    req.checkQuery({
      location: {
        optional: true,
        isInt: false,
        isLength: {
          options: [{ min: 3, max: 100 }],
          errorMessage: 'Location should be more than 2 and not greater than 100 characters'
        },
        errorMessage: 'Business location should be a string'
      },
      category: {
        optional: true,
        isInt: false,
        isLength: {
          options: [{ min: 3 }, { max: 50 }],
          errorMessage: 'Category should be more than 2 and not greater than 50 characters'
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
      res.status(409)
        .json(validationErrors);
    } else {
      return next();
    }
  },
  businessReviewInputCheck(req, res, next) {
    req.checkBody({
      review: {
        notEmpty: true,
        isInt: false,
        isLength: {
          options: [{ min: 3, max: 500 }],
          errorMessage: 'Business Review should be more than 2 and not greater than 500 characters'
        },
        errorMessage: 'Business review should be a string'
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
      res.status(409)
        .json(validationErrors);
    } else {
      return next();
    }
  }
};

