import db from '../models/index';
import checkWhiteSpace from '../helpers/genericHelper';

const { User } = db;

export default {
  userEmailValidation(req, res, next) {
    checkWhiteSpace(req);
    return User
      .find({
        where: {
          email: req.body.email.replace(/ /g, '')
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
    checkWhiteSpace(req);
    return User
      .find({
        where: {
          firstname: {
            ilike: req.body.firstname.replace(/ /g, '')
          },
          lastname: {
            ilike: req.body.lastname.replace(/ /g, '')
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
    checkWhiteSpace(req);
    const userNameErrorMessage = 'Please provide a name with atleast 5 and not more than 50 characters';
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
      res.status(400)
        .json(validationErrors);
    } else {
      return next();
    }
  },

  userUpdateProfileInputCheck(req, res, next) {
    checkWhiteSpace(req);
    const userNameErrorMessage = 'Please provide a name with atleast 5 and not more than 50 characters';
    req.checkBody({
      firstname: {
        notEmpty: true,
        optional: true,
        isLength: {
          options: [{ min: 5, max: 50 }],
          errorMessage: userNameErrorMessage
        },
        errorMessage: 'Your firstname is required'
      },
      lastname: {
        notEmpty: true,
        optional: true,
        isLength: {
          options: [{ min: 5, max: 500 }],
          errorMessage: 'lastname should be more than 5 and not greater than 500'
        },
        errorMessage: 'Your lastname is required'
      },
      email: {
        notEmpty: true,
        optional: true,
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
        optional: true,
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
      res.status(400)
        .json(validationErrors);
    } else {
      return next();
    }
  },

  userLoginInputCheck(req, res, next) {
    checkWhiteSpace(req);
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
      res.status(400)
        .json(validationErrors);
    } else {
      return next();
    }
  },

  formatUserInput(req, res) {
    req.body.firstname = req.body.firstname.replace(/ /g, '');
    req.body.lastname = req.body.lastname.replace(/ /g, '');
    req.body.password = req.body.password.replace(/ /g, '');
    req.body.email = req.body.email.replace(/ /g, '');
  },

  formatUserUpdateInput(req, res) {
    const reqBody = Object.keys(req.body);
    for (let i = 0; i < reqBody.length; i += 1) {
      const field = reqBody[i];
      req.body[reqBody[i]] = req.body[field].replace(/ /g, '');
    }
  }
};
