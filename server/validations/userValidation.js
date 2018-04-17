import { User } from '../models';
import { handleInputFormat, checkForWhiteSpace } from '../helpers/genericHelper';

export const userValidation = {
  firstname: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Firstname should be a valid string'
    },
    errorMessage: 'Firstname is required'
  },
  lastname: {
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Lastname should be a valid string'
    },
    errorMessage: 'Lastname is required',
  },
  password: {
    trim: true,
    isString: {
      errorMessage: 'Password should be a valid string'
    },
    notEmpty: true,
    errorMessage: 'Password is required',
  },
  confirmPassword: {
    trim: true,
    isString: {
      errorMessage: 'Confirm Password should be a valid string'
    },
    // custom: {
    //   options: (value, { req }) => {
    //     const result = value === req.body.password;
    //     if (result === false) {
    //       throw new Error('Passwords dont match');
    //     }
    //   }
    // },
    notEmpty: {
      errorMessage: 'Confirm Password is required'
    }
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isString: {
      errorMessage: 'Email should be a valid string'
    },
    isEmail: {
      errorMessage: 'Enter a Valid Email Address'
    },
  },
  telephoneNumber: {
    trim: true,
    notEmpty: true,
    isEqualString: {
      errorMessage: 'Telephone Number should be number but in string format e.g "07040110450"'
    },
    errorMessage: 'Telephone Number is required',
  },
  homeNumber: {
    trim: true,
    isEqualString: {
      errorMessage: 'Home Number should be number but in string format e.g "07040110450"'
    },
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required',
  },
};

export const userUpdateValidation = {
  firstname: {
    optional: true,
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Firstname should be a valid string'
    },
    errorMessage: 'Firstname is required'
  },
  lastname: {
    optional: true,
    trim: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Lastname should be a valid string'
    },
    errorMessage: 'Lastname name is required',
  },
  password: {
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Password should be a valid string'
    },
    notEmpty: true,
    errorMessage: 'Password is required',
  },
  confirmPassword: {
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Confirm Password should be a valid string'
    },
    // custom: {
    //   options: (value, { req }) => {
    //     const result = value === req.body.password;
    //     if (result === false) {
    //       throw new Error('Passwords dont match');
    //     }
    //   }
    // },
    notEmpty: {
      errorMessage: 'Confirm Password is required'
    }
  },
  email: {
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isString: {
      errorMessage: 'Email should be a valid string'
    },
    isEmail: {
      errorMessage: 'Enter a Valid Email Address'
    },
  },
  telephoneNumber: {
    optional: true,
    trim: true,
    notEmpty: true,
    isEqualString: {
      errorMessage: 'Telephone Number should be number but in string format e.g "07040110450"'
    },
    errorMessage: 'Telephone Number is required',
  },
  homeNumber: {
    trim: true,
    isEqualString: {
      errorMessage: 'Home Number should be number but in string format e.g "07040110450"'
    },
    notEmpty: false,
    optional: true,
    errorMessage: 'Home Number is required',
  },
};

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

