import { Business } from '../models';
import businessMessages from '../messages/businessMessages';
import serverErrorMessage from '../messages/serverMessage';
import { handleInputFormat } from '../helpers/genericHelper';

export const businessValidation = {
  name: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Business name is required',
    isString: {
      errorMessage: 'Business Name should be a valid string'
    },
  },
  description: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Description should be a valid string'
    },
    errorMessage: 'Business description is required'
  },
  location: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Location should be a valid string'
    },
    errorMessage: 'Business Location is required',
  },
  category: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Category should be a valid string'
    },
    errorMessage: 'Business Category is required'
  },
  email: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Email should be a valid string'
    },
    errorMessage: 'Email is required',
  },
  telephoneNumber: {
    trim: true,
    notEmpty: true,
    isEqualString: {
      errorMessage: 'Telephone Number should be number but in string format e.g "07040110450"'
    },
    errorMessage: 'Telephone Number is required'
  },
  homeNumber: {
    trim: true,
    notEmpty: false,
    optional: true,
    isEqualString: {
      errorMessage: 'Home Number should be number but in string format e.g "07040110450"'
    },
    errorMessage: 'Home Number is required'
  },
  address: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Address should be a valid string'
    },
    errorMessage: 'Address is required'
  }
};
export const businessUpdateValidation = {
  name: {
    trim: true,
    optional: true,
    notEmpty: true,
    errorMessage: 'Business name is required',
    isString: {
      errorMessage: 'Business Name should be a valid string'
    },
  },
  description: {
    trim: true,
    optional: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Description should be a valid string'
    },
    errorMessage: 'Business description is required'
  },
  location: {
    trim: true,
    optional: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Location should be a valid string'
    },
    errorMessage: 'Business Location is required',
  },
  category: {
    trim: true,
    optional: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Category should be a valid string'
    },
    errorMessage: 'Business Category is required'
  },
  email: {
    trim: true,
    optional: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Email should be a valid string'
    },
    errorMessage: 'Email is required',
  },
  telephoneNumber: {
    trim: true,
    optional: true,
    notEmpty: true,
    isEqualString: {
      errorMessage: 'Telephone Number should be number but in string format e.g "07040110450"'
    },
    errorMessage: 'Telephone Number is required'
  },
  homeNumber: {
    trim: true,
    notEmpty: false,
    optional: true,
    isEqualString: {
      errorMessage: 'Enter a valid string'
    },
    errorMessage: 'Home Number should be number but in string format e.g "07040110450"'
  },
  address: {
    trim: true,
    optional: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Business Email should be a valid string'
    },
    errorMessage: 'Address is required'
  }
};

/**
   * Filter businesses in the database by the provided location
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof userMiddleware
   */
export const businessExists = (req, res, next) => {
  handleInputFormat(req);
  if (req.body.name) {
    return Business
      .find({
        where: {
          name: {
            ilike: req.body.name
          }
        }
      })
      .then((business) => {
        if (business) {
          res.status(409).json({ message: 'Business Name already exists' });
        } else {
          next();
        }
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }
  if (req.body.email) {
    return Business
      .find({
        where: {
          email: {
            ilike: req.body.email
          }
        }
      })
      .then((business) => {
        if (business) {
          res.status(409).json({ message: 'Email already exists' });
        } else {
          next();
        }
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }
  next();
};

