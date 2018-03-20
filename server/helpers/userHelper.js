import db from '../models/index';

const { User } = db;

export default {
  userValidation(req, res, next) {
    return User
      .find({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (user) {
          res.status(409).json({ message: 'Email already exists' });
        } else {
          next();
        }
      });
  },
  userNameValidation(req, res, next) {
    return User
      .find({
        where: {
          firstname: {
            ilike: req.body.firstname
          },
          lastname: {
            ilike: req.body.lastname
          },
        }
      })
      .then((user) => {
        if (user) {
          res.status(409).json({ message: 'User with first name and lastname already exists' });
        } else {
          next();
        }
      });
  },
  userSignUpInputCheck(req, res, next) {
    const userNameErrorMessage = 'Please provide a name with atleast 5 and not more than 50 characters .';
    req.checkBody({
      firstname: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5, max: 50 }],
          errorMessage: userNameErrorMessage
        },
        errorMessage: 'Your firstname is required'
      },
      lastname: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5, max: 500 }],
          errorMessage: 'lastname should be more than 5 and not greater than 500'
        },
        errorMessage: 'Your lastname is required'
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
      homeNumber: {
        notEmpty: false,
        optional: true,
        isInt: {
          errorMessage: 'Enter a valid home Number'
        },
        isLength: {
          options: [{ min: 11, max: 11 }],
          errorMessage: 'Home number should be more than 1 and not greater than 11 characters'
        },
        errorMessage: 'Home Number is required'
      },
      password: {
        notEmpty: true,
        isInt: false,
        isLength: {
          options: [{ min: 6, max: 16 }],
          errorMessage: 'password should be more than 5 and not greater than 16 characters'
        },
        errorMessage: 'Your password is required'
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
  userLoginInputCheck(req, res, next) {
    const userNameErrorMessage = 'Please provide a name with atleast 5 and not more than 50 characters .';
    req.checkBody({
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
      password: {
        notEmpty: true,
        isInt: false,
        isLength: {
          options: [{ min: 6, max: 16 }],
          errorMessage: 'password should be more than 5 and not greater than 16 characters'
        },
        errorMessage: 'Your password is required'
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
  }
};
